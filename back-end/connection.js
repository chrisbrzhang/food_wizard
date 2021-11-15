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

const createUserTableQuery = [
    'CREATE TABLE IF NOT EXISTS User',
    '(Username VARCHAR(50) NOT NULL PRIMARY KEY,',
    'Password VARCHAR(100) NOT NULL);'
].join(' ');

con.query(createUserTableQuery, (err, result) => {
    if (err) console.log(err.message);
    console.log('User table created.');
});

const createSavedRecipeTableQuery = [
    'CREATE TABLE IF NOT EXISTS SavedRecipe',
    '(Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,',
    'RecipeId INT NOT NULL,',
    'Username VARCHAR(50) NOT NULL,',
    'FOREIGN KEY (Username) REFERENCES User(Username));'
].join(' ');

con.query(createSavedRecipeTableQuery, (err, result) => {
    if (err) console.log(err.message);
    console.log('SavedRecipe table created.');
});

const createUserIngredientTableQuery = [
    'CREATE TABLE IF NOT EXISTS UserIngredient',
    '(Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,',
    'IngredientId INT NOT NULL,',
    'Username VARCHAR(50) NOT NULL,',
    'FOREIGN KEY (Username) REFERENCES User(Username));'
].join(' ');

con.query(createUserIngredientTableQuery, (err, result) => {
    if (err) console.log(err.message);
    console.log('UserIngredient table created.');
});

const createRecipeTableQuery = [
    'CREATE TABLE IF NOT EXISTS Recipe',
    '(Id INT NOT NULL PRIMARY KEY,',
    'Title VARCHAR(100) NOT NULL,',
    'ImageUrl VARCHAR(300) NOT NULL);'
].join(' ');

con.query(createRecipeTableQuery, (err, result) => {
    if (err) console.log(err.message);
    console.log('Recipe table created.');
});

const createIngredientTableQuery = [
    'CREATE TABLE IF NOT EXISTS Ingredient',
    '(Id INT NOT NULL PRIMARY KEY,',
    'Amount NUMERIC(5,2),',
    'Unit VARCHAR(20),',
    'UnitLong VARCHAR(50),',
    'UnitShort VARCHAR(10),',
    'Aisle VARCHAR(50),',
    'Name VARCHAR(50),',
    'Original VARCHAR(100),',
    'OriginalString VARCHAR(100),',
    'OriginalName VARCHAR(100));'
].join(' ');

con.query(createIngredientTableQuery, (err, result) => {
    if (err) console.log(err.message);
    console.log('Ingredient table created.');
});



module.exports = con;