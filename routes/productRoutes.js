const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/:Category', productsController.getProductsByCat);

module.exports = router;