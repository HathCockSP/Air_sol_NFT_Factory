const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const keys = require('../config/key');
const user_model = require('../mongodb_scheme/users');

var SALT_WORK_FACTOR = 10;

router.post('/signup', (req, res) => {
  user_model.findOne({ username: req.body.username }).then(data => {
    if (data !== null) {
      return res.json({ success: 'same_user' });
    } else {
      user_model.findOne({ email: req.body.email }).then(data => {
        if (data !== null) {
          return res.json({ success: 'same_email' });
        } else {
          let hashpass = '';
          bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) {
              console.log(err);
              return;
            }
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              if (err) {
                console.log(err);
                return;
              } else {
                hashpass = hash;
                const newUser = new user_model({
                  id: "getNextSequence('user_id')",
                  username: req.body.username,
                  email: req.body.email,
                  password: hashpass,
                  signup_date: new Date().toLocaleString(),
                  permission: req.body.permission,
                });
                newUser.save(function (err, added) {
                  if (err) console.log(err);
                  else {
                    res.json({
                      success: 'success',
                    });
                  }
                });
              }
            });
          });
        }
      });
    }
  });
});

router.post('/signin', (req, res) => {
  user_model.findOne({ email: req.body.email }).then(data => {
    if (!data) return res.json({ success: 'no_user' });
    else {
      if (!data.permission) {
        return res.json({ success: 'no_permission' });
      } else {
        bcrypt.compare(req.body.password, data.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              _id: data._id,
              user_id: data.user_id,
              email: data.email,
              username: data.username,
              password: req.body.password,
              signup_date: data.signup_date,
              last_signin_date: new Date().toLocaleString(),
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              (err, token) => {
                return res.json({
                  success: 'success',
                  jwtToken: token,
                });
              },  
            );
          } else {
            return res.json({ success: 'wrong_pass' });
          }
        });
      }
    }
  });
});

module.exports = router;
