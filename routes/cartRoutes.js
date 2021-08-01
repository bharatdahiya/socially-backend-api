const express = require('express');

const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/:user', cartController.getCartByUser);
router.post('/:user', cartController.createCart);

module.exports = router;