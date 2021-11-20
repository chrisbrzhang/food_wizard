const express = require('express');
const router = express.Router();
const con = require('../connection');
const bcrypt = require('bcrypt');
const dbFunc = require('../helpers/database')
const v = require('../helpers/validate');
const SALTS = 10;

const ROOT = '/';

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
          let output = { 
            "success": false,
            "message": "That username has already been taken. Please choose a different username."
          }
          res.send(output);
        } else {
          bcrypt.hash(json.password, SALTS, (err, hash) => {
            const sqlCreateNewUser = [
              'INSERT INTO User (Username, Password)',
              `VALUES ('${json.username}', '${hash}');`,
            ].join(' ');
  
            con.promise(sqlCreateNewUser)
            .then(result => {
              console.log(JSON.stringify(result, null, 1));
              let output = {
                "success": true,
                "message": `User "${json.username}" was successfully created.`
              }
              res.send(output);
            })
            .catch(error => {
              console.log(JSON.stringify(error, null, 1));
              let output = {
                "success": false,
                "message": `Unexpected error occurred while trying to create user "${json.username}".`
              }
              res.send(output);
            });
          });
        }
      }


  });
});



module.exports = router;