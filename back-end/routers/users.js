const express = require('express');
const router = express.Router();
const con = require('../connection');
const q = require('../constants/database');
const dbFunc = require('../helpers/database');

const ROOT = '/';
const ID = '/:id';
const SAVED_RECIPES = '/savedrecipes';
const INGREDIENTS = '/ingredients';
const RECIPES = '/recipes';

router.get(ROOT, (_, res) => {
    let query = 'SELECT * FROM User;';

    con.promise(query)
    .then((result) => {
      let output = result;
      output.forEach(user => {
        delete user.Password;
      })
      res.send({"success": true, "users": output});
    })
    .catch((error) => {
      console.log(error.message);
      res.send({"success": false, "message": error.message});
    });
    
});

router.get(ID, async (req, res) => {
  console.log(req)
  const msg = await dbFunc.checkIfIdExistsInTable(req.params.id, q.tables.USER);
  let output;
  if (msg[0]) {
    let { Password, ...userWithoutPassword } = msg[1];
    output = {
      "success": true,
      "user": userWithoutPassword
    }
  } else {
    output = {
      "success": false,
      "message": "No user exists by that ID."
    }
  }
  res.send(output);
});

// router.get(ID + SAVED_RECIPES, async (req, res) => {
//   let u = req.params.username;
//   const msg = await dbFunc.checkIfUserExists(u);
//   if (msg[0]) {
//     let savedRecipesQuery = `SELECT * FROM SavedRecipe WHERE Username = '${u}';`;
//     con.promise(savedRecipesQuery)
//     .then(result => {
//       res.send(result);
//     })
//     .catch(error => {
//       res.send(error.message);
//     });
//   }
// });

// router.post(ID + SAVED_RECIPES, (req, res) => {
//     let body = "";
//     req.on('data', (chunk) => {
//         if (chunk !== null) {
//             body += chunk;
//         }
//     });

//     req.on('end', async () => {
//         let json = JSON.parse(body);  

//         let u = req.params.username;

//         const msg = await dbFunc.checkIfUserExists(u);
//         const saved = await dbFunc.checkIfRecipeAlreadySaved(u, json.recipeId);

//         const exists = await dbFunc.checkIfIdExistsInTable(json.recipeId, tables.RECIPE);
        
//         if (msg[0] && !saved[0] && exists) {
//           const sqlAddSavedRecipe = [
//             'INSERT INTO SavedRecipe (RecipeId, Username)',
//             `VALUES (${json.recipeId}, '${u}');`,
//           ].join(' ');
//           con.promise(sqlAddSavedRecipe)
//           .then(result => {
//             res.send("Recipe saved.");
//           })
//           .catch(error => {
//             console.log(error.message);
//           });
//         } else {
//           res.send("Error occured adding saved recipe.");
//         }
//     });
// });

// router.get(ID + INGREDIENTS, async (req, res) => {
//   let u = req.params.username;
//   const msg = await dbFunc.checkIfUserExists(u);
//   const table = tables.USER_INGREDIENT;
//   if (msg[0]) {
//     let savedRecipesQuery = `SELECT * FROM ${table} WHERE Username = '${u}';`;
//     con.promise(savedRecipesQuery)
//     .then(result => {
//       res.send(result);
//     })
//     .catch(error => {
//       res.send(error.message);
//     });
//   }
// });

// router.post(ID + INGREDIENTS, (req, res) => {
//   let body = "";
//   req.on('data', (chunk) => {
//       if (chunk !== null) {
//           body += chunk;
//       }
//   });

//   req.on('end', async () => {
//       let json = JSON.parse(body);  

//       let u = req.params.username;

//       const msg = await dbFunc.checkIfUserExists(u);
//       const saved = await dbFunc.checkIfIngredientAlreadySaved(u, json.ingredientId);

//       const exists = await dbFunc.checkIfIdExistsInTable(json.ingredientId, tables.INGREDIENT);
      
//       if (msg[0] && !saved[0] && exists) {
//         const sqlAddIngredient = [
//           'INSERT INTO UserIngredient (IngredientId, Username)',
//           `VALUES (${json.ingredientId}, '${u}');`,
//         ].join(' ');
//         con.promise(sqlAddIngredient)
//         .then(result => {
//           res.send("Ingredient saved.");
//         })
//         .catch(error => {
//           console.log(error.message);
//         });
//       } else {
//         res.send("Error occured adding ingredient." + msg + saved + exists);
//       }
//   });
// });

module.exports = router;