const express = require('express');
const multer = require('multer');
const router = express.Router();

const fs = require('fs');
const fs_extra = require('fs-extra');
const { exec } = require('child_process');
// const path = require('path');

router.post('/generate_config', (req, res) => {
  console.log('generating config file...');
  fs.writeFile(
    '../public/config_metadata/config.json',
    JSON.stringify(req.body, null, 2),
    function (err) {
      if (err) throw err;
      console.log('config.json is created successfully.');
    },
  );
  fs_extra.emptyDirSync('../public/config_metadata/metadata_assets/');
});

router.post('/generate_metadata', (req, res) => {
  console.log('generating metadata file...');
  for (var i = 0; i < Object.keys(req.body).length; i++) {
    fs.writeFile(
      `../public/config_metadata/metadata_assets/${i + '.json'}`,
      JSON.stringify(req.body[i], null, 2),
      function (err) {
        if (err) throw err;
        console.log(`json file is created successfully.`);
      },
    );
  }
});

router.post('/upload_nft', (req, res) => {
  console.log('uploading nft...');
  exec(
    'ts-node ../../cli/src/candy-machine-v2-cli.ts upload -e devnet -k ~/.config/solana/devnet.json -nc -cp ../public/config_metadata/config.json -c example ../public/config_metadata/metadata_assets/',
    error => {
      if (error) {
        console.log(`error: ${error.message}`);
        return res.json({ success: false });
      }
      console.log('Success uploaded NFT.');
      return res.json({ success: true });
    },
  );
});

router.post('/verify_nft', (req, res) => {
  console.log('verifying nft...');
  exec(
    'ts-node ../../cli/src/candy-machine-v2-cli.ts verify_upload -e devnet -k ~/.config/solana/devnet.json -c example',
    error => {
      if (error) {
        console.log(`error: ${error.message}`);
        return res.json({ success: false });
      }
      console.log('Success verified NFT.');
      return res.json({ success: true });
    },
  );
});

router.post('/mint_nft', (req, res) => {
  console.log('minting nft...');
  exec(
    `ts-node ../../cli/src/candy-machine-v2-cli.ts mint_multiple_tokens -e devnet -k ~/.config/solana/devnet.json -c example --number ${req.body.count}`,
    error => {
      if (error) {
        console.log(`error: ${error.message}`);
        return res.json({ success: false });
      }
      console.log('Success minted NFT.');
      return res.json({ success: true });
    },
  );
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/config_metadata/metadata_assets/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  '/upload_images',
  upload.array('upload_images'),
  function (req, res, next) {
    // console.log(req.files);
    // fs.rename(
    //   req.files.path,
    //   '../public/config_metadata/metadata_assets/' + req.files.originalname,
    //   function (err) {
    //     if (err) {
    //       res.send('problème durant le déplacement');
    //     } else {
    //       res.send('Fichier uploadé avec succès');
    //     }
    //   }
    // );
  },
);

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/config_metadata/metadata_assets/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload1 = multer({ storage: storage1 });

router.post(
  '/choose_assets',
  upload1.array('choose_assets'),
  function (req, res, next) {
    // console.log(req.files);
    // fs.rename(
    //   req.files.path,
    //   '../public/config_metadata/metadata_assets/' + req.files.originalname,
    //   function (err) {
    //     if (err) {
    //       res.send('problème durant le déplacement');
    //     } else {
    //       res.send('Fichier uploadé avec succès');
    //     }
    //   }
    // );
  },
);

module.exports = router;

// webpack server
// module.exports = {
//   devServer: {
//     watchOptions: {
//       ignored: [
//         path.resolve(__dirname, 'public/config_metadata'),
//       ],
//     },
//   },
//   router
// };
