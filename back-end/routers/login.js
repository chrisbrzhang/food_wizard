const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const dbFunc = require('../helpers/database');
const v = require('../helpers/validate');
const con = require('../connection');
let variables = require('./variables')

const ROOT = '/';
const tokenDuration = '7d';
const REQUEST = '/request'

const getToken = (email) => {
  return jwt.sign({ sub: email }, config.secret, { expiresIn: tokenDuration });
}

const omitPassword = (user)=> {
  const { Password, Token, ...userWithoutPassword } = user;
  return userWithoutPassword;
}


router.get(REQUEST, (_, res) => {
  let output = {
      "login_post": variables['login_post'],
  }
  res.send(output);
});

// post logs user in
router.post(ROOT, async (req, res) => {
  let json = req.body;
  variables.variables['login_post'] += 1

  let isValid = v.isValidAuthenticationRequest(json);
  if (!isValid[0]) {
    let output = {
      "success": false,
      "message": isValid[1]
    }
    res.send(output);
  } else {
    const user = await dbFunc.checkIfUserExists(json.email);

    if (user[0]) {
      bcrypt.compare(json.password, user[1].Password, (_, result) => {
        if (result) {
          let token = getToken(json.email);
          let output = {
            "success": true,
            "message": `You are now logged in as ${json.email}`,
            ...omitPassword(user[1]),
            token
          }
          let updateTokenSql = `UPDATE User SET Token = '${token}' WHERE Id = ${user[1].Id};`;
          con.promise(updateTokenSql)
          .finally(() => {
            res.send(output);
          });          
        } else {
          let output = {
            "success": false,
            "message": "The email or password you entered is incorrect."
          }
          res.send(output);
        }
      });
    } else {
      let output = {
        "success": false,
        "message": `There is no user with email "${json.email}".`
      }
      res.send(output);
    }
  }
});



module.exports = router;