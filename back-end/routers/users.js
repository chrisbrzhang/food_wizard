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
const BATCH = '/batch';


router.put(ID, async (req, res) => {
  let valid = await dbFunc.checkUserToken(req.params.id, req.headers.authorization.split(' ')[1]);

  if (valid[0]) {
    let json = req.body;
    console.log(json, q.tables.USER)
    const msg = await dbFunc.updateUser(req.params.id, json.Password, q.tables.USER);
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
    res.send("Not a valid token");
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

router.post(ID + BATCH, async (req, res) => {
  const id = req.params.id;
  const list = req.body.list;

  if (list === undefined) {
    res.send("Must specify 'list'");
  } else if (!Array.isArray(list) || !list.every(i => (typeof i === "string"))) {
    res.send("'list' must be an array of strings");
  } else {
    const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);

    console.log(userExists);
  
    if (userExists[0]) {
      list.forEach((i, index) => {
        let sqlAddIngredient = [
          'INSERT INTO UserIngredient (Name, UserId)',
          `VALUES ("${i}", ${id});`,
        ].join(' ');
        con.promise(sqlAddIngredient)
          .then(result => {
            if (index === list.length - 1) res.send("Ingredients successfully added");
          })
          .catch(error => {
            console.log(error.message);
            res.send(error.message);
          });
      })

    } else {
      res.send("Error occured adding ingredient.");
    }
  }
});

router.delete(ID + INGREDIENTS + ID2, async (req, res) => {
  let id = req.params.id;
  let id2 = req.params.id2;

  const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);
  const valid = await dbFunc.checkUserToken(id, req.headers.authorization.split(' ')[1]);
  const saved = await dbFunc.checkIfIdExistsInTable(id2, q.tables.USER_INGREDIENT);

  if (!valid[0]) {
    res.send('Invalid token.');
  } else if (!userExists[0]) {
    res.send('User does not exist.');
  } else if (!saved[0]) {
    res.send('That ingredient does not exist');
  } else {
    const sqlDeleteSavedRecipe = `DELETE FROM UserIngredient WHERE Id = ${id2}`;
    con.promise(sqlDeleteSavedRecipe)
    .then(result => {
      res.send("Ingredient deleted.");
    })
    .catch(error => {
      console.log(error.message);
      res.send(error.message);
    });
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

router.delete(ID + SAVED_RECIPES + ID2, async (req, res) => {
  let id = req.params.id;
  let id2 = req.params.id2;

  const userExists = await dbFunc.checkIfIdExistsInTable(id, q.tables.USER);
  const valid = await dbFunc.checkUserToken(id, req.headers.authorization.split(' ')[1]);
  const saved = await dbFunc.checkIfIdExistsInTable(id2, q.tables.SAVED_RECIPE);

  if (!valid[0]) {
    res.send('Invalid token.');
  } else if (!userExists[0]) {
    res.send('User does not exist.');
  } else if (!saved[0]) {
    res.send('That recipe is not saved');
  } else {
    const sqlDeleteSavedRecipe = `DELETE FROM SavedRecipe WHERE Id = ${id2}`;
    con.promise(sqlDeleteSavedRecipe)
    .then(result => {
      res.send("Recipe deleted.");
    })
    .catch(error => {
      console.log(error.message);
      res.send(error.message);
    });
  }
});

module.exports = router;