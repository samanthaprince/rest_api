'use strict';

var Recipes = require(__dirname + '/../models/recipe_model.js');
var express = require('express');
// let bodyParser = require('body-parser').json();

var recipeRouter = module.exports = express.Router();

recipeRouter.get('/recipes', (req, res) => {
  Recipes.find({}, (err, recipe) => {
    res.json({data: recipe});
  });
});

recipeRouter.get('/recipes/:id', (req, res) => {
  Recipes.findById(req.params.id, (err, recipe) => {
    res.json(recipe);
  });
});

recipeRouter.post('/recipes', (req, res) => {
  var newRecipe = new Recipes(req.body);
  newRecipe.save((err, recipe) => {
    res.json(recipe);
  });
});

recipeRouter.put('/recipes/:id', (req, res) => {
  Recipes.findByIdAndUpdate(req.params.id, req.body, (err, recipe) => {
    if (err) return res.send(err);
    res.json(recipe);
  });
});

recipeRouter.delete('/recipes/:id', (req, res) => {
  Recipes.findById(req.params.id, (err, recipe) => {
    recipe.remove(() => {
      res.json({message: 'recipe removed'});
    });
  });
});

recipeRouter.get('/search/', (req, res) => {
  // console.log(req.query.name);
  var ingredient = JSON.parse(req.query.ingredient);
  Recipes.find({'ingredients.item': ingredient}, (err, recipe) => {
    console.log(req.query.ingredient);
    res.json(recipe);
  });
});
