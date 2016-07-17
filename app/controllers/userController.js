var User = require('../models/userModel.js');
var jwt = require('jsonwebtoken');
var superSecret = 'ilovefootballsooooomuchhhhh';

exports.createUser = function(req, res) {

  var user = new User();

  user.firstName = req.body.firstName;
  user.middleName = req.body.middleName;
  user.lastName = req.body.lastName;
  user.username = req.body.username;
  user.password = req.body.password;

  user.save(function(err) {

    if(err) {

      if(err.code == 11000) {
        return res.json({
          success: false,
          message: 'A user with that username already exists'
        });
      } else {
        return res.send(err);
      }
    }
    res.json({
      success: true,
      message: 'User created!'
    });
  });
};

exports.getUser = function(req, res) {

  User.find(function(err, users) {

    if(err)
      res.send(err);

    res.json(users);
  })
};

exports.getById = function(req, res) {

  User.findById(req.params.user_id, function(err, user) {

    if(err) return res.send(err);

    res.json(user);
  });
};

exports.updateUser = function(req, res) {

  User.findById(req.params.user_id, function(err, user) {

  	if(err) return res.send(err);
  	if(req.body.firstName) user.firstName = req.body.firstName;
  	if(req.body.username) user.username = req.body.username;
  	if(req.body.password) user.password = req.body.password;

  	user.save(function(err) {

  		if(err) res.send(err);

  		res.json({message: 'User updated!'})
  	});
  });
};

exports.deleteUser = function(req, res) {

  User.remove({
    _id: req.params.user_id
  }, function(err, user) {

    if(err) return res.send(err);

    res.json({message: 'User Deleted from DB!'});
  });
}

exports.authenticateUser = function(req, res) {

  User.findOne({
    username: req.body.username
  }).select('name username password').exec(function(err, user) {

    if(err) throw err;
    if(!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found'
      });
    } else if(user) {

      var validPassword = user.comparePassword(req.body.password);
      if(!validPassword) {
        res.json({
          success: false,
          message: 'Authentication failed. Invalid password'
        })
      } else {

        var token = jwt.sign({
          name: user.name,
          username: user.username
        }, superSecret, {
          expiresIn: '1h'
        });

        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    }
  });
};

exports.authenticateToken = function(req, res, next) {
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];
  if(token) {

    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
         return res.status(403).send({
           success: false,
           message: 'Failed to authenticate token.'
         });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {

    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
  console.log('Someone just came up to our app!');
};
