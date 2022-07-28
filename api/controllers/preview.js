const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function fromDir(startPath, filter) {
  const files = fs.readdirSync(startPath);

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

router.get('/get_assets', (req, res) => {
  const dir = './config_metadata/metadata_assets/';
  // let files_img = fromDir(dir, '.jpg');
  let files_json = fromDir(dir, '.json');
  let files = [];

  for (var i = 0; i < files_json.length; i++) {
    let temp = fs.readFileSync('./' + files_json[i], 'utf8');
    files.push(JSON.parse(temp));
  }
  return res.json({ success: true, files: files, count: files_json.length });
});

router.post('/check_assets', (req, res) => {
  const dir = '../public/config_metadata/metadata_assets/';
  let files_json = fromDir(dir, '.json');
  let files_img = fromDir(dir, `.${req.body.image_type}`);
  console.log(files_json.length);
  console.log(files_json.img);

  if (files_img.length < files_json.length) {
    res.json({ success: true, flag: 'less' });
    return;
  }
  if (files_img > files_json) {
    res.json({ success: true, flag:'greater' });
    return;
  }
  if (files_img === files_json) {
    res.json({ success: true, flag:'same' });
    return;
  }
  // let files = [];

  // for (var i = 0; i < files_json.length; i++) {
  //   let temp = fs.readFileSync('./'+files_json[i], 'utf8');
  //   files.push(JSON.parse(temp));
  // }
  // return res.json({ success: true, files: files, count: files_json.length });
});

module.exports = router;
