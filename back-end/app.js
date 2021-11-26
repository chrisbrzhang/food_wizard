const express = require('express');
const jwt = require('./jwt/jwt');
const PORT = 8888;
const app = express();
const RECIPES = '/recipes';
const INGREDIENTS = '/ingredients';
const USER = '/users';
const LOGIN = '/login';
const REGISTER = '/register';
const recipeRouter = require('./routers/recipes');
const ingredientsRouter = require('./routers/ingredients');
const userRouter = require('./routers/users');
const loginRouter = require('./routers/login');
const registerRouter = require('./routers/register');

// ##################################################################
// # Set this to the root of your node js application on a2hosting. #
// ##################################################################
// const ROOT = '/COMP4537/TermProject';
const ROOT = '';

var cors = require('cors')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json');
    next();
});

app.use(cors())

app.use(jwt());

app.use(express.json());

app.use(ROOT + LOGIN, loginRouter);

app.use(ROOT + REGISTER, registerRouter);

app.use(ROOT + RECIPES, recipeRouter);

// app.use(ROOT + INGREDIENTS, ingredientsRouter);

app.use(ROOT + USER, userRouter);

app.get(ROOT + "*", (_, res) => {
    res.send("Server up and running.");
});


// ########################################################################
// # Comment this out and just put app.listen() when hosting on a server. #
// # Otherwise, leave it as is for testing on localhost.                  #
// ########################################################################
app.listen(PORT, (err) => {
    if (err) console.log(err.message);
    console.log("Listening to port", PORT);
});

app.listen();