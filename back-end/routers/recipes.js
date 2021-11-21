const express = require('express');
const router = express.Router();
const con = require('../connection');
const v = require('../helpers/validate');

const ROOT = '/';
const ID = '/:id';
let query_get_recipe = 0;
let query_post_recipe = 0;

router.get(ROOT, (_, res) => {
    let query = 'SELECT * FROM Recipe;';
    
    con.query(query, (err, result) => {
        if (err) {
            console.log(err.message);
            let output = {
                "success": false,
                "message": "Unable to retrieve recipes."
            }
            res.send(output);
        } else {
            let output = {
                "success": true,
                "recipes": result
            }
            res.send(output);
        }
        
    });
});

router.get(ID, (req, res) => {
    let query = `SELECT * FROM Recipe WHERE Id = ${req.params.id};`;
    query_get_recipe += 1;
    
    con.query(query, (err, result) => {
        if (err) {
            console.log(err.message);
            let output = {
                "success": false,
                "message": "Unable to retrieve recipe."
            }
            res.send(output);
        }
        if (result.length === 0) {
            let output = {
                "success": false,
                "message": "There is no recipe by that id."
            }
            res.send(output);
        } else {
            let output = {
                "success": true,
                "message": "Success.",
                "recipe": result[0]
            }
            res.send(output);
        }
    });
});


router.post(ROOT, (req, res) => {
    let body = "";
    query_post_recipe += 1;

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