const express = require('express');
const router = express.Router();

//Require controller
const controller = require('../../controllers/nhaTro/bangGiaController');

//Read all
router.get('/', controller.findAll);

//Update
router.put('/:id', controller.update);


module.exports = router;