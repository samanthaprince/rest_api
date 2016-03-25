'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = module.exports = express();
var mongoose = require('mongoose');
// var Recipes = require(__dirname + '/models/recipe_model.js');
// var Chefs = require(__dirname + '/models/chef_model.js');

var DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

let authRouter = require(__dirname + '/routes/auth_routes.js');
let chefRouter = require(__dirname + '/routes/chef_route.js');
let recipeRouter = require(__dirname + '/routes/recipe_routes.js');

app.use(bodyParser.json());
app.use('/', authRouter);
app.use('/', chefRouter);
app.use('/', recipeRouter);

app.listen(3000, () => {
  console.log('server is up on 3000');
});
