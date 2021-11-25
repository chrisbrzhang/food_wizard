const con = require('../connection');

exports.checkIfUserExists = async (email) => {
  let query = `SELECT * FROM User WHERE Email = '${email}';`;
  let arr = [];
    
  await con.promise(query)
  .then((result) => {
    if (result.length === 0) {
      arr = [false, "There is no user with that email."];
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

exports.checkIfRecipeAlreadySaved = async (userId, recipeId) => {
  let query = `SELECT * FROM SavedRecipe WHERE UserId = '${userId}' AND RecipeId = ${recipeId};`;
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

exports.checkIfIngredientAlreadySaved = async (userId, ingredientId) => {
  let query = `SELECT * FROM UserIngredient WHERE UserId = '${userId}' AND IngredientId = ${ingredientId};`;
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
  let msg = [false, ""];
    
  await con.promise(query)
  .then((result) => {
    if (result.length > 0) {
      msg = [true, result[0]];
    }
  })
  .catch(error => {
    console.log(error.message);
  });
  return msg;
}

exports.updateUser = async (email, newpassword, table) => {
  let query = `UPDATE ${table} SET Password='${newpassword}' WHERE Email='${email}';`;
  console.log(query)
  let msg = [false, ""]
  await con.promise(query)
  .then((result) => {
    console.log(result)
    if (result.length > 0) {
      msg = [true, "New password saved"]
    }
  }).catch(err => {
    msg = [false, err]
  })
  return msg;
}