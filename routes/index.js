const express = require('express');
const router = express.Router();


//Require controller
const controller = require('../controllers/nhaTroController');

/* GET home page. */
router.get('/', controller.home);

module.exports = router;
