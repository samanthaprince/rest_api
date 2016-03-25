'use strict';

let express = require('express');
let Chef = require(__dirname + '/../models/chef_model');
// let bodyParser = require('body-parser').json();
let auth = require(__dirname + '/../lib/auth');

var authRouter = module.exports = express.Router();

authRouter.post('/signup', auth, function (req, res) {
  var newChef = new Chef();
  console.log('new chef below');
  console.log(req.body.name);
  newChef.name = req.body.name;
  newChef.hashPassword(req.body.password);
  newChef.save((err, chef) => {
    if (err) {
      console.error(err);
    }
    console.log('chef saved');
    res.status(200).json({token: chef.generateToken()});
  });
});

authRouter.get('/signin', auth, (req, res) => {
  Chef.findOne({name: req.body.name}, (err, chef) => {
    let valid = chef.compareHash(req.body.password);
    if(!valid) {
      return res.json({status: 'failure'});
    }
    var myToken = chef.generateToken();
    res.json({token: myToken});
    console.log('token ' + myToken);
  });
});
