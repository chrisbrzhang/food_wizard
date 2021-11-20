// const express = require('express');
// const router = express.Router();
// const con = require('../connection');

// const ROOT = '/';
// const ID = '/:id';

// router.get(ROOT, (_, res) => {
//     let query = 'SELECT * FROM Ingredient;';
    
//     con.query(query, (err, result) => {
//         if (err) console.log(err.message);
//         res.send(result);
//     });
// });

// router.get(ID, (req, res) => {
//     let query = `SELECT * FROM Ingredient WHERE Id = ${req.params.id};`;
    
//     con.query(query, (err, result) => {
//         if (err) console.log(err.message);
//         if (result.length === 0) {
//             res.send("There is no ingredient by that id.");
//         } else {
//             res.send(result[0]);
//         }
//     });
// });

// router.post(ROOT, (req, res) => {
//     let body = "";
//     req.on('data', (chunk) => {
//         if (chunk !== null) {
//             body += chunk;
//         }
//     });

//     req.on('end', () => {
//         let json = JSON.parse(body);   
        
//         const queryAddRecipe = [
//             'INSERT INTO Ingredient (Id, Amount, Unit, UnitLong, UnitShort, Aisle, Name, Original, OriginalString, OriginalName)',
//             `VALUES (${json.id}, ${json.amount}, '${json.unit}',`,
//             `'${json.unitLong}', '${json.unitShort}', '${json.aisle}',`,
//             `'${json.name}', '${json.original}', '${json.originalString}', '${json.originalName}');`,
//         ].join(' ');
        
//         con.query(queryAddRecipe, (err, _) => {
//             if (err) console.log(err.message);
//             let output = {
//                 "Success": true,
//                 "Entry": {
//                     "Id": json.id,
//                     "Name": json.name
//                 }
//             }
//             res.send(output);
//         });
//     });
// });

// module.exports = router;