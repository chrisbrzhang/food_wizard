const express = require('express');
const router = express.Router();
const con = require('../connection');
const q = require('../constants/database');
const dbFunc = require('../helpers/database');

const ROOT = '/';
const ID = '/:id';
const ID2 = '/:id2';
const SAVED_RECIPES = '/recipes';
const SUGGESTED = '/suggested';
const INGREDIENTS = '/ingredients';
const MAX_SUGGESTED = 10;

const titleCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, word => {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  });
};

const lowerCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, word => {
    return word.toLowerCase();
  });
};

router.get(ROOT, (_, res) => {
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

router.get(ID + SUGGESTED, (req, res) => {
  // key of recipeId, value is set of attached ingredient ids
  let suggested = {};

  // Get all of the user's saved, on-hand ingredients
  let getUserIngredientsQuery = `SELECT Name FROM UserIngredient WHERE UserId = ${req.params.id};`;
  con.promise(getUserIngredientsQuery)
    .then(result => {
      // Get an array of the names of a user's ingredients
      let userIngredients = result.map(i => i.Name);
      // Store unique matching ingredients by ingredient id
      let ingredientMatches = {};
      const p = new Promise(resolve => {
        userIngredients.forEach((ingredient, index) => {
          // Check if the title case or lower case or original version of the ingredient matches
          let matchingIngredientsQuery = [
            `SELECT * FROM RecipeIngredient`,
            `WHERE Name LIKE '%${titleCase(ingredient)}%'`,
            `OR Name LIKE '%${lowerCase(ingredient)}%'`,
            `OR Name LIKE '%${ingredient}%';`
          ].join(' ');
          con.promise(matchingIngredientsQuery)
            .then(result => {
              result.forEach(i => {
                ingredientMatches[i.Id] = i;
              });
              if (index === userIngredients.length - 1) resolve(ingredientMatches);
            })
            .catch(error => {
              res.send({ "success": false, "message": error.message });
            });
        });
      })
      return p;
    })
    .then(result => {

      // Each entry is a RecipeIngredient that matched on one of the user's ingredients.
      // Here we reorganize this data and store it in the object 'suggested' which
      // has keys of unique RecipeId's and values of an array of RecipeIngredient Id's
      // which matched with the user's ingredients.
      Object.entries(result).forEach(entry => {
        const [RIID, RIO] = entry;
        if (!suggested[RIO.RecipeId]) {
          suggested[RIO.RecipeId] = [];
        }
        if (!(RIID in suggested[RIO.RecipeId])) {
          suggested[RIO.RecipeId].push(RIID);
        }
      });

      // Here, we convert 'suggested' into an array of arrays like so [[RID, RIID[]], [RID, RIID[]]]
      // instead of the current structure of { RID: RIID[], RID: RIID[] } so that we can sort it
      // so that recipes that matched on more ingredients come first in the new 'sorted' array.
      let sorted = Object.entries(suggested).sort((first, second) => {
        return second[1].length - first[1].length;
      });

      // Now we get all the data related to any recipes that had ingredients 
      // that matched with the user's ingredients, and store it in
      // 'outputSuggestions', an array of recipe suggestion objects.
      //
      // The promise 'p' promises to get all this data to fill 'outputSuggestions'.
      // It resolves with a copy of outputSuggestions once it has been filled with the necessary data.
      let outputSuggestions = [];
      const p = new Promise(resolve => {
        sorted.forEach((entry, index) => {
          const [RID, matchingIIDs] = entry;
          // Get data for this recipe
          let getRecipeQuery = `SELECT * FROM Recipe WHERE Id = ${RID};`;
          con.promise(getRecipeQuery)
            .then(result => {
              if (result.length > 0) {
                let recipe = {
                  ...result[0]
                };

                // Get all ingredients that matched on this recipe
                let p1 = new Promise(resolve => {
                  let idsString = '(' + matchingIIDs.toString() + ')';
                  let getMatchingIngredientsQuery = `SELECT * FROM RecipeIngredient WHERE Id IN ${idsString};`;
                  con.promise(getMatchingIngredientsQuery)
                    .then(result => {
                      resolve(result);
                    })
                    .catch(error => {
                      res.send({ "success": false, "message": error.message });
                    });
                });

                // Get all ingredients for this recipe
                let p2 = new Promise(resolve => {
                  let getAllIngredientsQuery = `SELECT * FROM RecipeIngredient WHERE RecipeId = ${RID};`;
                  con.promise(getAllIngredientsQuery)
                    .then(result => {
                      resolve(result);
                    })
                    .catch(error => {
                      res.send({ "success": false, "message": error.message });
                    });
                });

                // Get all instructions for this recipe
                let p3 = new Promise(resolve => {
                  let getAllInstructionsQuery = `SELECT * FROM Instruction WHERE RecipeId = ${entry[0]};`;
                  con.promise(getAllInstructionsQuery)
                    .then(result => {
                      resolve(result);
                    })
                    .catch(error => {
                      res.send({ "success": false, "message": error.message });
                    });
                });

                Promise.all([p1, p2, p3]).then(values => {
                  const [matching, allIngredients, allInstructions] = values;
                  recipe.matching = matching;
                  recipe.ingredients = allIngredients;
                  recipe.instructions = allInstructions;
                  outputSuggestions.push(recipe);
                  // ###########################################################
                  // # This is where all remaining promises are being resolved
                  // # with our completed outputSuggestions as our result.
                  // ###########################################################
                  if (index === MAX_SUGGESTED - 1 || index === sorted.length - 1) resolve(outputSuggestions);
                });
              }
            })
            .catch(error => {
              res.send({ "success": false, "message": error.message });
            });
        });
      })
      // Now that 'outputSuggestions' has been filled with all the necessary data
      // we send it to the client.
      p.then((result) => res.send(result));
    })
    .catch(error => {
      res.send({ "success": false, "message": error.message });
    });
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