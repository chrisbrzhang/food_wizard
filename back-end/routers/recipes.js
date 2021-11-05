const express = require('express');
const router = express.Router();
const con = require('../connection');

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
        
        const queryAddRecipe = [
            'INSERT INTO Recipe (Id, Title, ImageUrl)',
            `VALUES (${json.id}, '${json.title}', '${json.image}');`,
        ].join(' ');
        
        con.query(queryAddRecipe, (err, _) => {
            if (err) console.log(err.message);
            let output = {
                "Success": true,
                "Entry": {
                    "Id": json.id,
                    "Title": json.title,
                    "ImageUrl": json.image
                }
            }
            res.send(output);
        });
    });
});

module.exports = router;