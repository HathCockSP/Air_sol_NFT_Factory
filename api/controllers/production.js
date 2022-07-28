const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const https = require('https');
const Axios = require('axios');
const { exec, execSync } = require('child_process');
const productionModel = require('../mongodb_scheme/production');

router.get('/get_batch_list', async (req, res) => {
  https
    .get(
      'https://air-client-portal-dev.make-project.fun/filters',
      function (res1) {
        let data = '',
          json_data;
        res1.on('data', function (stream) {
          data += stream;
        });
        res1.on('end', function () {
          json_data = JSON.parse(data);
          res.send({ batch_list: json_data.batch });
        });
      },
    )
    .on('error', function (e) {
      console.log(e.message);
    });
});

router.post('/get_batch_data', async (req, res) => {
  https
    .get(
      `https://air-client-portal-dev.make-project.fun/buildings?batch=${
        req.body.batch_num + 1
      }`,
      function (res1) {
        let data = '',
          json_data;
        res1.on('data', function (stream) {
          data += stream;
        });
        res1.on('end', function () {
          json_data = JSON.parse(data);
          res.send({ batch_data: json_data });
        });
      },
    )
    .on('error', function (e) {
      console.log(e.message);
    });
});

router.post('/download_batch', async (req, res) => {
  if (!fs.existsSync(`./config_metadata/batch_data/${req.body.batch_name}`)) {
    fs.mkdirSync(`./config_metadata/batch_data/${req.body.batch_name}`, {
      recursive: true,
    });
  }
  for (var i = 0; i < req.body.batch_list_data.length; i++) {
    if (
      !fs.existsSync(
        `./config_metadata/batch_data/${req.body.batch_list_data[i].id}/${req.body.batch_list_data[i].id}`,
      )
    ) {
      fs.mkdirSync(
        `./config_metadata/batch_data/${req.body.batch_name}/${req.body.batch_list_data[i].id}`,
        { recursive: true },
      );
    }
    let temp = req.body.batch_list_data[i].id;
    let config_url = `https://air-client-portal-dev.make-project.fun/building/config/${req.body.batch_list_data[i].id}`;
    Axios({
      url: config_url,
      method: 'GET',
      responseType: 'stream',
    }).then(response => {
      response.data.pipe(
        fs.createWriteStream(
          `./config_metadata/batch_data/${req.body.batch_name}/${temp}/config.json`,
        ),
      );
    });

    let meta_url = `https://air-client-portal-dev.make-project.fun/building/meta/${req.body.batch_list_data[i].id}`;
    Axios({
      url: meta_url,
      method: 'GET',
      responseType: 'stream',
    }).then(response => {
      response.data.pipe(
        fs.createWriteStream(
          `./config_metadata/batch_data/${req.body.batch_name}/${temp}/meta.json`,
        ),
      );
    });

    let temp1 = req.body.batch_list_data[i].image;
    let image_url = `${req.body.batch_list_data[i].image}`;
    if (req.body.batch_list_data[i].image !== '') {
      Axios({
        url: image_url,
        method: 'GET',
        responseType: 'stream',
      }).then(response => {
        response.data.pipe(
          fs.createWriteStream(
            `./config_metadata/batch_data/${
              req.body.batch_name
            }/${temp}/${temp}.${temp1.slice(-3)}`,
          ),
        );
      });
    }
  
    // let config_url = `https://air-client-portal-dev.make-project.fun/building/config/${req.body.batch_list_data[i].id}`;
    // const config_response = await Axios({
    //   url: config_url,
    //   method: 'GET',
    //   responseType: 'stream',
    // });
    // config_response.data.pipe(
    //   fs.createWriteStream(
    //     `./batch_data/${req.body.batch_name}/${temp}/config.json`,
    //   ),
    // );

    // let meta_url = `https://air-client-portal-dev.make-project.fun/building/meta/${req.body.batch_list_data[i].id}`;
    // const meta_response = await Axios({
    //   url: meta_url,
    //   method: 'GET',
    //   responseType: 'stream',
    // });
    // meta_response.data.pipe(
    //   fs.createWriteStream(
    //     `./batch_data/${req.body.batch_name}/${temp}/meta.json`,
    //   ),
    // );

    // let temp1 = req.body.batch_list_data[i].image;
    // let image_url = `${req.body.batch_list_data[i].image}`;
    // if (req.body.batch_list_data[i].image !== '') {
    //   const img_response = await Axios({
    //     url: image_url,
    //     method: 'GET',
    //     responseType: 'stream',
    //   });
    //   img_response.data.pipe(
    //     fs.createWriteStream(
    //       `./batch_data/${req.body.batch_name}/${temp}/${temp}.${temp1.slice(
    //         -3,
    //       )}`,
    //     ),
    //   );
    // }

    // let res1 = await https.get(
    //   `https://air-client-portal-dev.make-project.fun/building/config/${req.body.batch_list_data[i].id}`,
    // );
    // let data = '',
    //   json_data;
    // res1.on('data', function (stream) {
    //   data += stream;
    // });
    // res1.on('end', function () {
    //   json_data = JSON.parse(data);
    //   fs.writeFile(
    //     `./batch_data/${req.body.batch_name}/${temp}/config.json`,
    //     JSON.stringify(json_data, null, 2),
    //     function (err) {
    //       if (err) throw err;
    //       console.log('config.json is created successfully.');
    //     },
    //   );
    // });
    // res1.on('error', function (e) {
    //   console.log(e.message);
    //   return res.send({ flag_success: 'error' });
    // });
    // const res2 = await https.get(
    //   `https://air-client-portal-dev.make-project.fun/building/meta/${req.body.batch_list_data[i].id}`,
    // );

    // let data1 = '',
    //   json_data1;
    // res2.on('data', function (stream) {
    //   data1 += stream;
    // });
    // res2.on('end', function () {
    //   json_data1 = JSON.parse(data1);
    //   fs.writeFile(
    //     `./batch_data/${req.body.batch_name}/${temp}/meta.json`,
    //     JSON.stringify(json_data1, null, 2),
    //     function (err) {
    //       if (err) throw err;
    //       console.log('meta.json is created successfully.');
    //     },
    //   );
    // });

    // res2.on('error', function (e) {
    //   console.log(e.message);
    //   return res.send({ flag_success: 'error' });
    // });
    // let temp1 = req.body.batch_list_data[i].image;
    // if (req.body.batch_list_data[i].image !== '') {
    //   https.get(`${req.body.batch_list_data[i].image}`, res => {
    //     res.pipe(
    //       fs.createWriteStream(
    //         `./batch_data/${req.body.batch_name}/${temp}/${temp}.${temp1.slice(
    //           -3,
    //         )}`,
    //       ),
    //     );
    //   });
    // }
  }

  const newProduction = new productionModel({
    username: req.body.username,
    wallet_address: '',
    production_name: req.body.production_name,
    batch_name: req.body.batch_name,
    created_date: new Date().toLocaleString()
  });
  newProduction.save(function (err, added) {
    if (err) console.log(err);
    else{
      res.send({ flag_success: 'success', id: added._id });
      console.log('******** saved in mongo database successfully *********');
    }
  });
  console.log('******** download batch successfully *********');


});

router.post('/uploadLocal', async (req, res) => {
  console.log('******** starting upload on local *********');
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
  if (!fs.existsSync(`./config_metadata/uploaded_batch_data/${req.body.id}/assets`)) {
    fs.mkdirSync(`./config_metadata/uploaded_batch_data/${req.body.id}/assets`, {
      recursive: true,
    });
  }
  for (var i = 0; i < req.body.batch_list_data.length; i++) {
    if (
      fs.existsSync(
        `./config_metadata/batch_data/${req.body.sBatchName}/${req.body.batch_list_data[i].id}/config.json`,
      )
    ) {
      let readFile = fs.readFileSync(
        `./config_metadata/batch_data/${req.body.sBatchName}/${req.body.batch_list_data[i].id}/config.json`,
        'utf8',
      );
      let jsonDate = JSON.parse(readFile);
      jsonDate['image'] = i + jsonDate['image'].slice(-4);

      for (
        let j = 0;
        j < Object.keys(jsonDate['properties']['files']).length;
        j++
      ) {
        jsonDate['properties']['files'][j]['uri'] =
          i + jsonDate['properties']['files'][j]['uri'].slice(-4);
        jsonDate['properties']['files'][j]['type'] =
          jsonDate['properties']['files'][j]['type'].slice(0, 6) +
          req.body.batch_list_data[i].image.slice(-3);
      }
      fs.writeFileSync(
        `./config_metadata/uploaded_batch_data/${req.body.id}/assets/${i}.json`,
        JSON.stringify(jsonDate, null, 2),
      );
    }
    if (
      fs.existsSync(
        `./config_metadata/batch_data/${req.body.sBatchName}/${
          req.body.batch_list_data[i].id
        }/${req.body.batch_list_data[i].id}.${req.body.batch_list_data[
          i
        ].image.slice(-3)}`,
      )
    ) {
      fs.copyFileSync(
        `./config_metadata/batch_data/${req.body.sBatchName}/${
          req.body.batch_list_data[i].id
        }/${req.body.batch_list_data[i].id}.${req.body.batch_list_data[
          i
        ].image.slice(-3)}`,
        `./config_metadata/uploaded_batch_data/${req.body.id}/assets/${i}.${req.body.batch_list_data[
          i
        ].image.slice(-3)}`,
      );
    }
  }

  // const updateProduction = new productionModel({
  //   selected_ids: req.body.batch_list_data,
  // });
  productionModel.findOneAndUpdate({_id:req.body.id}, {selected_ids: req.body.batch_list_data},function (err, added) {
    if (err) console.log(err);
    else{
      res.send({ flag_success: 'success', id: added._id });
      console.log('******** updated in mongo database successfully *********');
    }
  });
  console.log('******** upload on local successfully *********');
  // res.send({ flag_success: 'success' });
});

router.post('/generate_config', async (req, res) => {
  console.log('***** generating config file *****');
  fs.writeFile(
    './config_metadata/config.json',
    JSON.stringify(req.body, null, 2),
    function (err) {
      if (err) throw err;
      console.log('config.json is created successfully.');
    },
  );
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
    console.log('no dir ', startPath);
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

router.post('/get_assets', (req, res) => {
  let dir = `./config_metadata/uploaded_batch_data/${req.body.id}/assets/`;
  // let files_img = fromDir(dir, '.jpg');
  let files_json = fromDir(dir, '.json');
  let files = [];

  for (var i = 0; i < files_json.length; i++) {
    let temp = fs.readFileSync('./' + files_json[i], 'utf8');
    files.push(JSON.parse(temp));
  }
  return res.json({ success: true, files: files, count: files_json.length });
});

router.post('/upload_nft', async (req, res) => {
  const startTime = new Date();
  console.log('uploading nft...');
  exec(
    'ts-node ../../cli/src/candy-machine-v2-cli.ts upload -e devnet -k ~/.config/solana/devnet.json -nc -cp ./config_metadata/config.json -c example ./config_metadata/metadata_assets/',
    error => {
      const endTime = new Date();
      const exeTime = endTime - startTime;
      if (error) {
        console.log(error);
        // return res.json({ success: false });
        return res.json({ success: true, exeTime: exeTime });
      }
      console.log('Success uploaded NFT.');
      return res.json({ success: true, exeTime: exeTime });
    },
  );
});

router.post('/verify_nft', (req, res) => {
  const startTime = new Date();
  console.log('verifying nft...');
  exec(
    'ts-node ../../cli/src/candy-machine-v2-cli.ts verify_upload -e devnet -k ~/.config/solana/devnet.json -c example',
    error => {
      const endTime = new Date();
      const exeTime = endTime - startTime;
      if (error) {
        console.log(`error: ${error.message}`);
        return res.json({ success: false });
      }
      console.log('Success verified NFT.');
      return res.json({ success: true, exeTime: exeTime });
    },
  );
});

router.post('/mint_nft', (req, res) => {
  const startTime = new Date();
  console.log('minting nft...');
  exec(
    `ts-node ../../cli/src/candy-machine-v2-cli.ts mint_multiple_tokens -e devnet -k ~/.config/solana/devnet.json -c example --number ${req.body.count}`,
    error => {
      const endTime = new Date();
      const exeTime = endTime - startTime;
      if (error) {
        console.log(`error: ${error.message}`);
        return res.json({ success: false });
      }
      console.log('Success minted NFT.');
      return res.json({ success: true, exeTime: exeTime });
    },
  );
});

module.exports = router;
