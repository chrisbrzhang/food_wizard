const mysql = require('mysql');

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
const createUserTableQuery = [
    'CREATE TABLE IF NOT EXISTS User',
    '(Username VARCHAR(50) NOT NULL PRIMARY KEY,',
    'Password VARCHAR(100) NOT NULL);'
].join(' ');

con.query(createUserTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('User table created.');
});

//####################################################################
// Create UserIngredient table.
//####################################################################
const createUserIngredientTableQuery = [
    'CREATE TABLE IF NOT EXISTS UserIngredient',
    '(Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,',
    'Name VARCHAR(50) NOT NULL,',
    'Username VARCHAR(50) NOT NULL,',
    'FOREIGN KEY (Username) REFERENCES User(Username));'
].join(' ');

con.query(createUserIngredientTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('UserIngredient table created.');
});

//####################################################################
// Create Recipe table.
//####################################################################
const createRecipeTableQuery = [
    'CREATE TABLE IF NOT EXISTS Recipe',
    '(Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,',
    'Title VARCHAR(100) NOT NULL,',
    'Description VARCHAR(300) NULL DEFAULT "");'
].join(' ');

con.query(createRecipeTableQuery, (err, _) => {
    if (err) console.log(err.message);
    console.log('Recipe table created.');
});

//####################################################################
// Create RecipeIngredient table.
//####################################################################
const createRecipeIngredientTableQuery = [
    'CREATE TABLE IF NOT EXISTS RecipeIngredient',
    '(Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,',
    'Name VARCHAR(50),',
    'Amount NUMERIC(5,2),',
    'Unit VARCHAR(20),',
    'Description VARCHAR(100) NULL DEFAULT "",',
    'RecipeId INT NOT NULL,',
    'FOREIGN KEY (RecipeId) REFERENCES Recipe(Id));'
].join(' ');

con.query(createRecipeIngredientTableQuery, (err, result) => {
    if (err) console.log(err.message);
    console.log('RecipeIngredient table created.');
});

//####################################################################
// Create Instruction table.
//####################################################################
const createInstructionTableQuery = [
    'CREATE TABLE IF NOT EXISTS Instruction',
    '(Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,',
    'Step INT NOT NULL,',
    'Details VARCHAR(200) NOT NULL,',
    'RecipeId INT NOT NULL,',
    'FOREIGN KEY (RecipeId) REFERENCES Recipe(Id));'
].join(' ');

con.query(createInstructionTableQuery, (err, result) => {
    if (err) console.log(err.message);
    console.log('Instruction table created.');
});

//####################################################################
// Create SavedRecipe table. 
//####################################################################
const createSavedRecipeTableQuery = [
    'CREATE TABLE IF NOT EXISTS SavedRecipe',
    '(Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,',
    'RecipeId INT NOT NULL,',
    'Username VARCHAR(50) NOT NULL,',
    'FOREIGN KEY (RecipeId) REFERENCES Recipe(Id),',
    'FOREIGN KEY (Username) REFERENCES User(Username));'
].join(' ');

con.query(createSavedRecipeTableQuery, (err, result) => {
    if (err) console.log(err.message);
    console.log('SavedRecipe table created.');
});






module.exports = con;