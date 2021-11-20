const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const dbFunc = require('../helpers/database');
const v = require('../helpers/validate');

const ROOT = '/';
const tokenDuration = '7d';

const getToken = (username) => {
  return jwt.sign({ sub: username }, config.secret, {expiresIn: tokenDuration});
}

function omitPassword(user) {
  const { Password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

router.post(ROOT, (req, res) => {
    let body = "";
    req.on('data', (chunk) => {
        if (chunk !== null) {
            body += chunk;
        }
    });

    req.on('end', async () => {
        let json = JSON.parse(body);
        
        let isValid = v.isValidAuthenticationRequest(json);
        if (!isValid[0]) {
          let output = {
            "success": false,
            "message": isValid[1]
          }
          
          res.send(output);
        } else {
          const user = await dbFunc.checkIfUserExists(json.username);

          if (user[0]) {
            bcrypt.compare(json.password, user[1].Password, (err, result) => {
              if (result) {
                let token = getToken(json.username);
                let output = {
                  "success": true,
                  "message": `You are now loggin in as ${json.username}`,
                  ...omitPassword(user[1]),
                  token
                }
                res.send(output);
              } else {
                let output = {
                  "success": false,
                  "message": "The username or password you entered is incorrect."
                }
                res.send(output);
              }
            });
          } else {
            let output = {
              "success": false,
              "message": `There is no user by the name "${json.username}".`
            }
            res.send(output);
          }
        }
    });
});



module.exports = router;