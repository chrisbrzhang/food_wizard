const express = require('express');
const router = express.Router();
const con = require('../connection');
const q = require('../constants/database');
const dbFunc = require('../helpers/database');

const ROOT = '/';

router.put(ROOT, async (req, res) => {
  let json = req.body;
  console.log(json, q.tables.USER)
  const msg = await dbFunc.updateUser(json.email, json.password, q.tables.USER);
  let output;
  if (msg[0]) {
    output = {
      "success": true,
      "msg": msg[1]
    }
  } else {
    output = {
      "success": false,
      "msg": msg[1]
    }
  }
  res.send(msg);
});

module.exports = router;