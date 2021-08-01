
const Product = require('../models/product');
const HttpError = require("../models/http-error");

//const { validationResult } = require('express-validator');
const getProductsByCat = async (req, res, next) => {
    let products;
    const category = req.params.Category;
    try {
        products = await Product.find({ label: category });
    } catch (error) {
        return next(new HttpError('Fetching products failed, please try agian.', 500))
    }


    res.status(200).json({ products: (products || []).map(u => u.toObject({ getters: true })) });
};
exports.getProductsByCat = getProductsByCat;