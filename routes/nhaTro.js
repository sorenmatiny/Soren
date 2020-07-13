const express = require('express');
const router = express.Router();

//Require controller
const controller = require('../controllers/nhaTroController');

//Create
router.post('/', controller.create);

//Read all
router.get('/', controller.findAll);

//Read one
router.get('/:id', controller.findOne);

//Update
router.put('/:id', controller.update);

//Delete
router.delete('/:id', controller.delete);

module.exports = router;