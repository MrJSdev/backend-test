const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'I am note done yet, are you yet', the: fs });
});

module.exports = router;
