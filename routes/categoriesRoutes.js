const express = require('express');
const { check } = require('express-validator')

const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.get('/', categoriesController.getCategories);
router.get('/:categoryName', categoriesController.getBycategoryName);

module.exports = router;