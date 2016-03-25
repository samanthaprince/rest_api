'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


let chefSchema = new mongoose.Schema({
  name:         {type: String, required: true, unique: true},
  password:     {type: String, required: true},
  funFact:      String,
  recipes:      [{type: Schema.Types.ObjectId, ref: 'Recipes'}]
});

chefSchema.methods.hashPassword = function(password) {
  var hash = this.password = bcrypt.hashSync(password, 10);
  return hash;
};

chefSchema.methods.compareHash = function(password) {
  console.log('password is:' + password);
  console.log('this.password is: ' + this.password);
  return bcrypt.compareSync(password, this.password);
};

chefSchema.methods.generateToken = function() {
  console.log('this.id inside gen token' + this._id);
  return jwt.sign({id: this._id}, 'CHANGEME');
};

module.exports = mongoose.model('Chefs', chefSchema);
