var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile("./data/example.txt", 'utf8', (err, data) => {
    res.render('index', { title: 'Wordy', contents: data });
  })

});

module.exports = router;
