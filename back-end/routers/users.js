const express = require('express');
const router = express.Router();
const con = require('../connection');
const q = require('../constants/database');
const dbFunc = require('../helpers/database');
const suggestedRouter = require('./suggested');

const ROOT = '/';
const ID = '/:id';
const ID2 = '/:id2';
const SAVED_RECIPES = '/recipes';
const SUGGESTED = '/suggested';
const INGREDIENTS = '/ingredients';


router.put(ID, async (req, res) => {
  let valid = await dbFunc.checkUserToken(req.params.id, req.headers.authorization.split(' ')[1]);

  if (valid[0]) {

    let json = req.body;
    console.log(json, q.tables.USER)
    const msg = await dbFunc.updateUser(req.params.id, json.password, q.tables.USER);
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

  } else {
    res.send("no");
  }
});

router.use(ID + SUGGESTED, suggestedRouter);

router.get(ROOT, (req, res) => {
  let query = 'SELECT * FROM User;';

  con.promise(query)
    .then((result) => {
      let output = result;
      output.forEach(user => {
        delete user.Password;
      })
      res.send({ "success": true, "users": output });
    })
    .catch((error) => {
      console.log(error.message);
      res.send({ "success": false, "message": error.message });
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

router.get(ID + INGREDIENTS, async (req, res) => {
  let id = req.params.id;
  const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);
  const table = q.tables.USER_INGREDIENT;
  if (userExists[0]) {
    let userIngredientsQuery = `SELECT * FROM ${table} WHERE UserId = ${id};`;
    con.promise(userIngredientsQuery)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.send(error.message);
    });
  }
});

router.get(ID + INGREDIENTS + ID2, async (req, res) => {
  let id = req.params.id;
  let id2 = req.params.id2;
  const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);
  const table = q.tables.USER_INGREDIENT;
  if (userExists[0]) {
    let userIngredientQuery = `SELECT * FROM ${table} WHERE UserId = ${id} AND Id = ${id2};`;
    con.promise(userIngredientQuery)
    .then(result => {
      if (result.length) {
        res.send(result[0]);
      } else {
        res.send("No such ingredient");
      }      
    })
    .catch(error => {
      res.send(error.message);
    });
  }
});

router.post(ID + INGREDIENTS, async (req, res) => {
  let id = req.params.id;

  if (req.body.name === undefined) {
    res.send("Must specify 'name'");
  } else {
    const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);

    console.log(userExists);
  
    if (userExists[0]) {
      const sqlAddIngredient = [
        'INSERT INTO UserIngredient (Name, UserId)',
        `VALUES ("${req.body.name}", ${id});`,
      ].join(' ');
      con.promise(sqlAddIngredient)
        .then(result => {
          res.send("Ingredient saved.");
        })
        .catch(error => {
          console.log(error.message);
          res.send(error.message);
        });
    } else {
      res.send("Error occured adding ingredient.");
    }
  }
});

router.get(ID + SAVED_RECIPES, async (req, res) => {
  let id = req.params.id;
  const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);
  const table = q.tables.SAVED_RECIPE;
  if (userExists[0]) {
    let userSavedRecipesQuery = `SELECT * FROM ${table} WHERE UserId = ${id};`;
    con.promise(userSavedRecipesQuery)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.send(error.message);
    });
  }
});

router.get(ID + SAVED_RECIPES + ID2, async (req, res) => {
  let id = req.params.id;
  let id2 = req.params.id2;
  const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);
  const table = q.tables.SAVED_RECIPE;
  if (userExists[0]) {
    let userSavedRecipeQuery = `SELECT * FROM ${table} WHERE UserId = ${id} AND Id = ${id2};`;
    con.promise(userSavedRecipeQuery)
    .then(result => {
      if (result.length) {
        res.send(result[0]);
      } else {
        res.send("No such saved recipe");
      }      
    })
    .catch(error => {
      res.send(error.message);
    });
  }
});

router.post(ID + SAVED_RECIPES, async (req, res) => {
  let id = req.params.id;
  let recipeId = req.body.recipeId
  if (req.body.recipeId === undefined) {
    res.send("Must specify 'recipeId'");
  } else {
    const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);
    const recipeExists = await dbFunc.checkIfIdExistsInTable(recipeId, q.tables.RECIPE);
    const saved = await dbFunc.checkIfRecipeAlreadySaved(id, recipeId);
  
    if (userExists[0] && recipeExists[0] && !saved[0]) {
      const sqlAddSavedRecipe = [
        'INSERT INTO SavedRecipe (RecipeId, UserId)',
        `VALUES ("${recipeId}", ${id});`,
      ].join(' ');
      con.promise(sqlAddSavedRecipe)
        .then(result => {
          res.send("Recipe saved.");
        })
        .catch(error => {
          console.log(error.message);
          res.send(error.message);
        });
    } else {
      res.send("Error occured adding recipe.");
    }
  }
});

module.exports = router;