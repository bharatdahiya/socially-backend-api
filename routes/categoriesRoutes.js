const express = require('express');

const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.get('/', categoriesController.getCategories);
// router.post('/', categoriesController.createCategory);

// router.get('/:categoryName', categoriesController.getBycategoryName);

module.exports = router;