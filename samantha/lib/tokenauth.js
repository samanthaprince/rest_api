'use strict';

let Chef = require(__dirname + '/../models/chef_model');
let jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'CHANGEME');
  } catch(e) {
    return res.status(401).json({msg: 'auth failed'});
  }
  Chef.findOne({_id: decoded.id}, (err, chef) => {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'auth failed'});
    }
    if (!chef) return res.status(401).json({msg: 'auth failed'});

    req.chef = chef;
    next();
  });
};
