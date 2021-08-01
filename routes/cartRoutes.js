const express = require('express');

const productsController = require('../controllers/cartController');

const router = express.Router();

router.get('/:userId', productsController.getCartByUser);

module.exports = router;