var express = require('express');
var router = express.Router();
var path = require('path');
var drs_controller = require('../controllers/drsController');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/drs.html'));
});

module.exports = router;