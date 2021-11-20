const con = require('../connection');

exports.checkIfUserExists = async (username) => {
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

exports.checkIfRecipeAlreadySaved = async (username, recipeId) => {
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

exports.checkIfIngredientAlreadySaved = async (username, ingredientId) => {
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

exports.checkIfIdExistsInTable = async (id, table) => {
  console.log(table);

  let query = `SELECT * FROM ${table} WHERE Id = ${id};`;
  let exists = false;
    
  await con.promise(query)
  .then((result) => {
    if (result.length === 0) {
      exists = true;
    }
  })
  .catch(error => {
    console.log(error.message);
  });
  return exists;
}