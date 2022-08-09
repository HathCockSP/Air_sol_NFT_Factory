const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const https = require("https");
const Axios = require("axios");
const { exec } = require("child_process");
const productionModel = require("../mongodb_scheme/production");
const errorModel = require("../mongodb_scheme/error_log");

router.get("/get_batch_list", async (req, res) => {
  https
    .get(
      "https://air-client-portal-dev.make-project.fun/filters",
      function (res1) {
        let data = "",
          json_data;
        res1.on("data", function (stream) {
          data += stream;
        });
        res1.on("end", function () {
          try {
            json_data = JSON.parse(data);
          } catch (error) {
            console.log(error);
            return res.send({
              flag_success: "failed",
              error_msg: `Can't get batch list from cms!`,
            });
          }
          return res.send({
            flag_success: "success",
            batch_list: json_data.batch,
          });
        });
      }
    )
    .on("error", function (e) {
      console.log(e.message);
    });
});

router.post("/get_batch_data", async (req, res) => {
  https
    .get(
      `https://air-client-portal-dev.make-project.fun/buildings?batch=${
        req.body.batch_num + 1
      }`,
      function (res1) {
        let data = "",
          json_data;
        res1.on("data", function (stream) {
          data += stream;
        });
        res1.on("end", function () {
          try {
            json_data = JSON.parse(data);
          } catch (error) {
            console.log(error);
            return res.send({
              flag_success: "failed",
              error_msg: `Can't get batch data from cms!`,
            });
          }
          return res.send({ flag_success: "success", batch_data: json_data });
        });
      }
    )
    .on("error", function (e) {
      console.log(e.message);
    });
});

router.post("/download_batch", async (req, res) => {
  if (!fs.existsSync(`./config_metadata`)) {
    fs.mkdirSync(`./config_metadata`, {
      recursive: true,
    });
  }
  if (!fs.existsSync(`./config_metadata/batch_data`)) {
    fs.mkdirSync(`./config_metadata/batch_data`, {
      recursive: true,
    });
  }
  if (!fs.existsSync(`./config_metadata/batch_data/${req.body.batch_name}`)) {
    fs.mkdirSync(`./config_metadata/batch_data/${req.body.batch_name}`, {
      recursive: true,
    });
  }
  for (var i = 0; i < req.body.batch_list_data.length; i++) {
    if (
      !fs.existsSync(
        `./config_metadata/batch_data/${req.body.batch_list_data[i].id}/${req.body.batch_list_data[i].id}`
      )
    ) {
      fs.mkdirSync(
        `./config_metadata/batch_data/${req.body.batch_name}/${req.body.batch_list_data[i].id}`,
        { recursive: true }
      );
    }
    let temp = req.body.batch_list_data[i].id;
    let config_url = `https://air-client-portal-dev.make-project.fun/building/config/${req.body.batch_list_data[i].id}`;
    let tempResponse;
    try{
      tempResponse = await Axios({
        url: config_url,
        method: "GET",
        responseType: "stream",
      });
    }
    catch(error)
    {
      console.log(error);
    }
    console.log(tempResponse.data);
    console.log(JSON.parse(tempResponse.data));
    // Axios({
    //   url: config_url,
    //   method: "GET",
    //   responseType: "stream",
    // }).then((response) => {
    //   response.data.pipe(
    //     fs.createWriteStream(
    //       `./config_metadata/batch_data/${req.body.batch_name}/${temp}/config.json`
    //     )
    //   );
    // });

    let meta_url = `https://air-client-portal-dev.make-project.fun/building/meta/${req.body.batch_list_data[i].id}`;
    Axios({
      url: meta_url,
      method: "GET",
      responseType: "stream",
    }).then((response) => {
      response.data.pipe(
        fs.createWriteStream(
          `./config_metadata/batch_data/${req.body.batch_name}/${temp}/meta.json`
        )
      );
    });

    let temp1 = req.body.batch_list_data[i].image;
    let image_url = `${req.body.batch_list_data[i].image}`;
    if (req.body.batch_list_data[i].image !== "") {
      Axios({
        url: image_url,
        method: "GET",
        responseType: "stream",
      }).then((response) => {
        response.data.pipe(
          fs.createWriteStream(
            `./config_metadata/batch_data/${
              req.body.batch_name
            }/${temp}/${temp}.${temp1.slice(-3)}`
          )
        );
      });
    }
  }

  const tempProductoin = await productionModel.find();
  let production_id;
  if (tempProductoin.length === 0) {
    production_id = 0;
  } else {
    production_id = tempProductoin[tempProductoin.length - 1].production_id + 1;
  }

  const newProduction = new productionModel({
    username: req.body.username,
    wallet_address: req.body.wallet_address,
    production_name: req.body.production_name,
    batch_name: req.body.batch_name,
    created_date: new Date().toLocaleString(),
    production_id: production_id,
  });
  newProduction.save(function (err, added) {
    if (err) {
      res.send({ flag_success: "failed", error: err });
      console.log(err);
    } else {
      res.send({ flag_success: "success", id: added.production_id });
      console.log("******** saved in mongo database successfully *********");
    }
  });
  console.log("******** download batch successfully *********");
});

router.post("/uploadLocal", async (req, res) => {
  console.log("******** starting upload on local *********");
  if (!fs.existsSync(`./config_metadata`)) {
    fs.mkdirSync(`./config_metadata`, {
      recursive: true,
    });
  }
  if (!fs.existsSync(`./config_metadata/uploaded_batch_data`)) {
    fs.mkdirSync(`./config_metadata/uploaded_batch_data`, {
      recursive: true,
    });
  }
  if (!fs.existsSync(`./config_metadata/uploaded_batch_data/${req.body.id}`)) {
    fs.mkdirSync(`./config_metadata/uploaded_batch_data/${req.body.id}`, {
      recursive: true,
    });
  }
  if (
    !fs.existsSync(
      `./config_metadata/uploaded_batch_data/${req.body.id}/assets`
    )
  ) {
    fs.mkdirSync(
      `./config_metadata/uploaded_batch_data/${req.body.id}/assets`,
      {
        recursive: true,
      }
    );
  }
  for (var i = 0; i < req.body.batch_list_data.length; i++) {
    if (
      fs.existsSync(
        `./config_metadata/batch_data/${req.body.sBatchName}/${req.body.batch_list_data[i].id}/config.json`
      )
    ) {
      let readFile = fs.readFileSync(
        `./config_metadata/batch_data/${req.body.sBatchName}/${req.body.batch_list_data[i].id}/config.json`,
        "utf8"
      );
      let jsonDate;
      try {
        jsonDate = JSON.parse(readFile);
      } catch (e) {
        const newError = new errorModel({
          production_id: req.body.id,
          event_step: "upload_batch",
          description: `${req.body.batch_list_data[i].id}'s config is a invalid json!`,
          event_date: new Date(),
        });
        await newError.save();
        return res.send({
          flag_success: "failed",
          error_msg: `${req.body.batch_list_data[i].id}'s config is a invalid json! Check and try it again!`,
        });
      }
      jsonDate["image"] = i + jsonDate["image"].slice(-4);

      for (
        let j = 0;
        j < Object.keys(jsonDate["properties"]["files"]).length;
        j++
      ) {
        jsonDate["properties"]["files"][j]["uri"] =
          i + jsonDate["properties"]["files"][j]["uri"].slice(-4);
        jsonDate["properties"]["files"][j]["type"] =
          jsonDate["properties"]["files"][j]["type"].slice(0, 6) +
          req.body.batch_list_data[i].image.slice(-3);
      }
      fs.writeFileSync(
        `./config_metadata/uploaded_batch_data/${req.body.id}/assets/${i}.json`,
        JSON.stringify(jsonDate, null, 2)
      );
    }
    if (
      fs.existsSync(
        `./config_metadata/batch_data/${req.body.sBatchName}/${
          req.body.batch_list_data[i].id
        }/${req.body.batch_list_data[i].id}.${req.body.batch_list_data[
          i
        ].image.slice(-3)}`
      )
    ) {
      fs.copyFileSync(
        `./config_metadata/batch_data/${req.body.sBatchName}/${
          req.body.batch_list_data[i].id
        }/${req.body.batch_list_data[i].id}.${req.body.batch_list_data[
          i
        ].image.slice(-3)}`,
        `./config_metadata/uploaded_batch_data/${
          req.body.id
        }/assets/${i}.${req.body.batch_list_data[i].image.slice(-3)}`
      );
    }
  }

  // const updateProduction = new productionModel({
  //   selected_ids: req.body.batch_list_data,
  // });
  productionModel.findOneAndUpdate(
    { production_id: req.body.id },
    { selected_ids: req.body.batch_list_data },
    function (err, added) {
      if (err) console.log(err);
      else {
        res.send({ flag_success: "success", id: added.production_id });
        console.log(
          "******** updated in mongo database successfully *********"
        );
      }
    }
  );
  console.log("******** upload on local successfully *********");
});

router.post("/generate_config", async (req, res) => {
  console.log("***** generating config file *****");
  fs.writeFile(
    `./config_metadata/uploaded_batch_data/${req.body.id}/config.json`,
    JSON.stringify(req.body.data, null, 2),
    async function (error) {
      if (error) {
        const newError = new errorModel({
          production_id: req.body.id,
          event_step: "prepare_config",
          description: `${error}`,
          event_date: new Date(),
        });
        await newError.save();
        return res.send({
          flag_success: "failed",
          error_msg: `Can't save generated config file, please check it again.`,
        });
      }
      console.log("config.json is created successfully.");
    }
  );
  return res.send({
    flag_success: "success",
  });
});

function fromDir(startPath, filter) {
  const files = fs.readdirSync(startPath);
  files.sort(function (a, b) {
    return (
      fs.statSync(startPath + a).mtime.getTime() -
      fs.statSync(startPath + b).mtime.getTime()
    );
  });

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  let array = [];
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.endsWith(filter)) {
      array.push(filename);
      //   console.log('-- found: ', filename);
    }
  }
  return array;
}

router.post("/get_assets", async (req, res) => {
  let dir = `./config_metadata/uploaded_batch_data/${req.body.id}/assets/`;
  // let files_img = fromDir(dir, '.jpg');
  let files_json = fromDir(dir, ".json");
  let files = [];

  for (var i = 0; i < files_json.length; i++) {
    let temp = fs.readFileSync("./" + files_json[i], "utf8");
    let jsonDate;
    try {
      jsonDate = JSON.parse(temp);
    } catch (e) {
      const newError = new errorModel({
        production_id: req.body.id,
        event_step: "review_batch",
        description: `${files_json[i]} is invalid! Check it agagin!`,
        event_date: new Date(),
      });
      await newError.save();
      return res.send({
        flag_success: "failed",
        error_msg: `${files_json[i]}.json is invalid! Check it agagin!`,
      });
    }
    files.push(jsonDate);
  }
  return res.json({
    flag_success: "success",
    files: files,
    count: files_json.length,
  });
});

router.post("/upload_nft", async (req, res) => {
  const startTime = new Date();
  console.log("uploading nft...");
  exec(
    `ts-node ./cli/src/candy-machine-v2-cli.ts upload -e devnet -k ~/.config/solana/devnet.json -nc -cp ./config_metadata/uploaded_batch_data/${req.body.id}/config.json -c ${req.body.id} ./config_metadata/uploaded_batch_data/${req.body.id}/assets`,
    async (error) => {
      const endTime = new Date();
      const exeTime = endTime - startTime;
      if (error) {
        console.log(error);
        const newError = new errorModel({
          production_id: req.body.id,
          event_step: "upload_nft",
          description: error,
          event_date: new Date(),
        });
        await newError.save();
        return res.json({ success: false, error_msg: error });
        // return res.json({ success: true, exeTime: exeTime });
      }
      console.log("Success uploaded NFT.");
      return res.json({ success: true, exeTime: exeTime });
    }
  );
});

router.post("/verify_nft", (req, res) => {
  const startTime = new Date();
  console.log("verifying nft...");
  exec(
    `ts-node ./cli/src/candy-machine-v2-cli.ts verify_upload -e devnet -k ~/.config/solana/devnet.json -c ${req.body.id}`,
    async (error) => {
      const endTime = new Date();
      const exeTime = endTime - startTime;
      if (error) {
        console.log(error);
        const newError = new errorModel({
          production_id: req.body.id,
          event_step: "verify_nft",
          description: error,
          event_date: new Date(),
        });
        await newError.save();
        return res.json({ success: false, error_msg: error });
      }
      console.log("Success verified NFT.");
      return res.json({ success: true, exeTime: exeTime });
    }
  );
});

router.post("/mint_nft", (req, res) => {
  const startTime = new Date();
  console.log("minting nft...");
  exec(
    `ts-node ./cli/src/candy-machine-v2-cli.ts mint_multiple_tokens -e devnet -k ~/.config/solana/devnet.json -c ${req.body.id} --number ${req.body.count}`,
    async (error) => {
      const endTime = new Date();
      const exeTime = endTime - startTime;
      if (error) {
        console.log(error);
        const newError = new errorModel({
          production_id: req.body.id,
          event_step: "mint_nft",
          description: error,
          event_date: new Date(),
        });
        await newError.save();
        return res.json({ success: false, error_msg: error });
      }
      try {
        productionModel.findOneAndUpdate(
          { production_id: req.body.id },
          { completed: true, created_date: new Date().toLocaleString }
        );
      } catch (error) {
        console.log(error);
      }
      console.log("******** updated in mongo database successfully *********");
      console.log("Success minted NFT.");
      return res.json({ success: true, exeTime: exeTime });
    }
  );
});

module.exports = router;
