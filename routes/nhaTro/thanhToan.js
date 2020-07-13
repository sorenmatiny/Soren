const express = require('express');
const router = express.Router();

//Require controller
const controller = require('../../controllers/nhaTroController');

// Thanh toan
router.put('/:id', controller.thanhToan);

module.exports = router;