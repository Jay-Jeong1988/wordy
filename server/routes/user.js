var express = require('express');
var router = express.Router();
var User = require('../db/models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return console.error(err);
    res.status(200).json(users);
  })
});

router.post('/login', function(req, res) {
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) return console.error(err);
    if (user.password === req.body.password) {
      res.status(200).json({
        result: {
          msg: "successfully logged in",
          user: user
        }
      })
    } else {
      res.status(401).json({
        result: {
          msg: "invalid password"
        }
      })
    }
  })
})

router.post('/create', (req, res) => {
  const user = new User(req.body.user);
  if (!user.userName) user.userName = "temporary";
  if(user.password === req.body.passwordConfirmation) {
    user.save().then( user => {
      console.log('successfully created a new user: \n' + user);
      res.status(200).json({
        msg: "successfully created a new user: " + user.userName,
        user: user
      })
    }).catch(error => {
      res.status(500).json({
        msg: error.message
      })
      console.log(error);
    })
  }else {
    res.status(422).json({
      msg: "passwords do not match"
    })
  }
});

router.get('/:userName', (req, res) => {
  User.findOne({userName: req.params.userName}, (err, user) => {
    if(err) return console.error(err)
    if (user !== null) {
      console.log("username exists already")
      res.status(500).json({status: "NA", msg: "Username exists already"})
    }else {
      console.log("valid username")
      res.status(200).json({status: "OK"})
    }
  })
})

router.post('/update', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if(err) return console.error(err);
    user.userName = req.body.userName;
    user.save().then(instance => {
      console.log("user has been updated");
      res.status(200).json({
          status: "OK",
          msg: "user has been updated",
          user: instance
      });
    }).catch(error => {
      console.log("cannot update user")
      res.status(500).json({
          status: "NA",
          msg: error.message
      })
    })
  })
})

module.exports = router;
