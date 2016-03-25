'use strict';

module.exports = function(req, res, next) {
  try {
    console.log(req.headers.authorization);
    let authArray = req.headers.authorization.split(' ');
    let method = authArray[0];
    let base64ed = authArray[1];
    let newAuthArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = newAuthArray[0];
    let password = newAuthArray[1];
    console.log(method);
    console.log(name);
    console.log(password);
    req.body.name = name;
    req.body.password = password;
    return next();
  } catch (err) {
    console.log(err);
  }
  res.status(400).json({msg: 'could not authenticate'});
};
