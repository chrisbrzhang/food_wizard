const mysql = require('mysql');
const q = require('./constants/database');

// These are the credentials used to connect to the MySQL database on our a2hosting account
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "jakoband_super",
//     password: "jakobandjonny2021",
//     database: "jakoband_TermProject"
// });

// Change these to be whatever credentials on your local MySQL db while testing (with XAMPP or Docker container)
const con = mysql.createConnection({
    host: "localhost",
    user: "jakoband_super",
    password: "jakobandjonny2021",
    database: "jakoband_TermProject"
});

con.connect((err) => {
    if (err) console.log(err.message);
    console.log("Connected!");
});

con.promise = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) { reject(new Error()); }
            else { resolve(result); }
        });
    });
}

//####################################################################
// Create User table.
//####################################################################
con.query(q.createUserTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('User table created.');
});

//####################################################################
// Create UserIngredient table.
//####################################################################
con.query(q.createUserIngredientTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('UserIngredient table created.');
});

//####################################################################
// Create Recipe table.
//####################################################################
con.query(q.createRecipeTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('Recipe table created.');
});

//####################################################################
// Create RecipeIngredient table.
//####################################################################
con.query(q.createRecipeIngredientTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('RecipeIngredient table created.');
});

//####################################################################
// Create Instruction table.
//####################################################################
con.query(q.createInstructionTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('Instruction table created.');
});

//####################################################################
// Create SavedRecipe table. 
//####################################################################
con.query(q.createSavedRecipeTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('SavedRecipe table created.');
});







module.exports = con;