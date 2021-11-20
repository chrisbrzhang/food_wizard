const express = require('express');
const router = express.Router();
const con = require('../connection');
const v = require('../helpers/validate');

const ROOT = '/';
const ID = '/:id';

router.get(ROOT, (_, res) => {
    let query = 'SELECT * FROM Recipe;';
    
    con.query(query, (err, result) => {
        if (err) console.log(err.message);
        res.send(result);
    });
});

router.get(ID, (req, res) => {
    let query = `SELECT * FROM Recipe WHERE Id = ${req.params.id};`;
    
    con.query(query, (err, result) => {
        if (err) console.log(err.message);
        if (result.length === 0) {
            res.send("There is no recipe by that id.");
        } else {
            res.send(result[0]);
        }
    });

});

router.post(ROOT, (req, res) => {
    let body = "";
    req.on('data', (chunk) => {
        if (chunk !== null) {
            body += chunk;
        }
    });

    req.on('end', () => {
        let json = JSON.parse(body);
        
        let isValid = v.isValidRecipe(json);
        if (!isValid[0]) {
          let output = {
            "success": false,
            "message": isValid[1]
          }
          res.send(output);
        } else {        
            const queryAddRecipe = [
                'INSERT INTO Recipe (Title, Description)',
                `VALUES ('${json.title}', '${json.description}');`,
            ].join(' ');
            
            con.query(queryAddRecipe, (err, result) => {
                if (err) console.log(err.message);
                let output = {
                    "success": true,
                    "entry": {
                        "id": result.insertId,
                        "title": json.title,
                        "description": json.description,
                    }
                }
                res.send(output);
            });
        }
    });
});

module.exports = router;