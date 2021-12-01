const express = require('express');
const router = express.Router();
const con = require('../connection');
const v = require('../helpers/validate');
const variables = require('./variables')

const ROOT = '/';
const ID = '/:id';

// gets all recipes
router.get(ROOT, (_, res) => {
    let query = 'SELECT * FROM Recipe;';
    variables['all_recipes_get'] += 1;

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

// gets one recipe by id
router.get(ID, (req, res) => {
    let query = `SELECT * FROM Recipe WHERE Id = ${req.params.id};`;
    variables.variables['one_recipe_get'][0] += 1;

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
    let json = req.body;
    variables.variables['recipe_post'][0] += 1

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

module.exports = router;