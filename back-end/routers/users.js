const express = require('express');
const router = express.Router();
const con = require('../connection');
const bcrypt = require('bcrypt');
const SALTS = 10;

const dbFunc = require('../helpers/database');

const ROOT = '/';
const USERNAME = '/:username';
const SAVED_RECIPES = '/savedrecipes';
const INGREDIENTS = '/ingredients';
const RECIPES = '/recipes';

router.get(ROOT, (_, res) => {
    let query = 'SELECT * FROM User;';

    con.promise(query)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
      res.send(error.message);
    });
    
});

router.get(USERNAME, async (req, res) => {
  const msg = await dbFunc.checkIfUserExists(req.params.username);
  res.send(msg[1]);
});

router.post(ROOT, (req, res) => {
    let body = "";
    req.on('data', (chunk) => {
        if (chunk !== null) {
            body += chunk;
        }
    });

    req.on('end', async () => {
        let json = JSON.parse(body);  

        const user = await dbFunc.checkIfUserExists(json.username);

        if (user[0]) {
          bcrypt.compare(json.password, user[1].Password, (err, result) => {
            if (result) {
              // TODO: JWT? - Actually log them in?
              res.send("You are logged in.");
            } else {
              res.send("Invalid password.");
            }
          });
        } else {
          bcrypt.hash(json.password, SALTS, (err, hash) => {
            const sqlCreateNewUser = [
              'INSERT INTO User (Username, Password)',
              `VALUES ('${json.username}', '${hash}');`,
            ].join(' ');
  
            con.promise(sqlCreateNewUser)
            .then((result) => {
              res.send("User created.");
            })
            .catch((error) => {
              res.send("Error creating user.");
            });
          });
        }
    });
});

router.get(USERNAME + SAVED_RECIPES, async (req, res) => {
  let u = req.params.username;
  const msg = await dbFunc.checkIfUserExists(u);
  if (msg[0]) {
    let savedRecipesQuery = `SELECT * FROM SavedRecipe WHERE Username = '${u}';`;
    con.promise(savedRecipesQuery)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.send(error.message);
    });
  }
});

router.post(USERNAME + SAVED_RECIPES, (req, res) => {
    let body = "";
    req.on('data', (chunk) => {
        if (chunk !== null) {
            body += chunk;
        }
    });

    req.on('end', async () => {
        let json = JSON.parse(body);  

        let u = req.params.username;

        const msg = await dbFunc.checkIfUserExists(u);
        const saved = await dbFunc.checkIfRecipeAlreadySaved(u, json.recipeId);

        const exists = await dbFunc.checkIfIdExistsInTable(json.recipeId, tables.RECIPE);
        
        if (msg[0] && !saved[0] && exists) {
          const sqlAddSavedRecipe = [
            'INSERT INTO SavedRecipe (RecipeId, Username)',
            `VALUES (${json.recipeId}, '${u}');`,
          ].join(' ');
          con.promise(sqlAddSavedRecipe)
          .then(result => {
            res.send("Recipe saved.");
          })
          .catch(error => {
            console.log(error.message);
          });
        } else {
          res.send("Error occured adding saved recipe.");
        }
    });
});

router.get(USERNAME + INGREDIENTS, async (req, res) => {
  let u = req.params.username;
  const msg = await dbFunc.checkIfUserExists(u);
  const table = tables.USER_INGREDIENT;
  if (msg[0]) {
    let savedRecipesQuery = `SELECT * FROM ${table} WHERE Username = '${u}';`;
    con.promise(savedRecipesQuery)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.send(error.message);
    });
  }
});

router.post(USERNAME + INGREDIENTS, (req, res) => {
  let body = "";
  req.on('data', (chunk) => {
      if (chunk !== null) {
          body += chunk;
      }
  });

  req.on('end', async () => {
      let json = JSON.parse(body);  

      let u = req.params.username;

      const msg = await dbFunc.checkIfUserExists(u);
      const saved = await dbFunc.checkIfIngredientAlreadySaved(u, json.ingredientId);

      const exists = await dbFunc.checkIfIdExistsInTable(json.ingredientId, tables.INGREDIENT);
      
      if (msg[0] && !saved[0] && exists) {
        const sqlAddIngredient = [
          'INSERT INTO UserIngredient (IngredientId, Username)',
          `VALUES (${json.ingredientId}, '${u}');`,
        ].join(' ');
        con.promise(sqlAddIngredient)
        .then(result => {
          res.send("Ingredient saved.");
        })
        .catch(error => {
          console.log(error.message);
        });
      } else {
        res.send("Error occured adding ingredient." + msg + saved + exists);
      }
  });
});

module.exports = router;