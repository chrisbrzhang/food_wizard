const express = require('express');
const jwt = require('./jwt/jwt');
const PORT = 8888;
const app = express();
const ROOT = '/COMP4537/TermProject';
const RECIPES = '/recipes';
const INGREDIENTS = '/ingredients';
const USER = '/user';
const LOGIN = '/login';
const REGISTER = '/register';
const recipeRouter = require('./routers/recipes');
const ingredientsRouter = require('./routers/ingredients');
const userRouter = require('./routers/users');
const loginRouter = require('./routers/login');
const registerRouter = require('./routers/register');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Origin', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // res.header('Content-Type', 'application/json');
    next();
});

app.use(jwt());

app.use(ROOT + LOGIN, loginRouter);

app.use(ROOT + REGISTER, registerRouter);

app.use(ROOT + RECIPES, recipeRouter);

app.use(ROOT + INGREDIENTS, ingredientsRouter);

app.use(ROOT + USER, userRouter);

app.get(ROOT + "*", (_, res) => {
    res.send("Server up and running.");
});

app.listen(8888, (err) => {
    if (err) console.log(err.message);
    console.log("Listening to port", PORT);
});