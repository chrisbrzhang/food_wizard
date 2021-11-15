const express = require('express');
const router = express.Router();
const con = require('../connection');
const bcrypt = require('bcrypt');
const axios = require('axios').default;
const SALTS = 10;

const ROOT = '/';
const USERNAME = '/:username';
const SAVED_RECIPES = '/savedrecipes';
const INGREDIENTS = '/ingredients';
const RECIPES = '/recipes';
const API_KEY = '?apiKey=c0c634289d2a4a2590b2eaa4abf5f6aa';
const MAX_RECIPE_INT = 999999999;

const SPOON_API_ENDPOINT_BASE = 'https://api.spoonacular.com';

con.promise = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) { reject(new Error()); }
      else { resolve(result); }
    });
  });
}

const checkIfUserExists = async (username) => {
  let query = `SELECT * FROM User WHERE Username = '${username}';`;
  let arr = [];
    
  await con.promise(query)
  .then((result) => {
    if (result.length === 0) {
      arr = [false, "There is no user with that username."];
    } else {
      arr = [true, result[0]];
    }
  })
  .catch((error) => {
    console.log(error.message);
    arr = [false, error.message];
  });
  return arr;
}

const checkIfRecipeAlreadySaved = async (username, recipeId) => {
  let query = `SELECT * FROM SavedRecipe WHERE Username = '${username}' AND RecipeId = ${recipeId};`;
  let arr = [true, ""];
    
  await con.promise(query)
  .then((result) => {
    if (result.length === 0) {
      arr = [false, "This recipe is not already saved."];
    } else {
      arr = [true, "This recipe has already been saved."];
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
  return arr;
}

const checkIfIngredientAlreadySaved = async (username, ingredientId) => {
  let query = `SELECT * FROM UserIngredient WHERE Username = '${username}' AND IngredientId = ${ingredientId};`;
  let arr = [true, ""];
    
  await con.promise(query)
  .then((result) => {
    if (result.length === 0) {
      arr = [false, "This ingredient is not already saved."];
    } else {
      arr = [true, "This ingredient has already been added to your list."];
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
  return arr;
}

const checkIfRecipeExists = async (id) => {
  let url = SPOON_API_ENDPOINT_BASE + `/recipes/${id}/information` + API_KEY;
  console.log(url);
  let exists = false;
  
  await axios.get(url).then(response => {
    exists = true;
  }).catch(error => {
    console.log(error.message);
    
  });

  return exists;
}

const checkIfIngredientExists = async (id) => {
  let url = SPOON_API_ENDPOINT_BASE + `/food/ingredients/${id}/information` + API_KEY;
  console.log(url);
  let exists = false;
  
  await axios.get(url).then(response => {
    exists = true;
  }).catch(error => {
    console.log(error.message);
  });

  return exists;
}

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
  const msg = await checkIfUserExists(req.params.username);
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

        const user = await checkIfUserExists(json.username);

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
  const msg = await checkIfUserExists(u);
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

        const msg = await checkIfUserExists(u);
        const saved = await checkIfRecipeAlreadySaved(u, json.recipeId);

        const exists = await checkIfRecipeExists(json.recipeId);
        
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
  const msg = await checkIfUserExists(u);
  if (msg[0]) {
    let savedRecipesQuery = `SELECT * FROM Ingredients WHERE Username = '${u}';`;
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

      const msg = await checkIfUserExists(u);
      const saved = await checkIfIngredientAlreadySaved(u, json.ingredientId);

      const exists = await checkIfIngredientExists(json.ingredientId);
      
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