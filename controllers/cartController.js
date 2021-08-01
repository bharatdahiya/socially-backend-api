
const Cart = require('../models/cart');
const HttpError = require("../models/http-error");

//const { validationResult } = require('express-validator');
const getCartByUser = async (req, res, next) => {
    let cart;
    const userId = req.params.userId

    try {
        cart = await Cart.find({user: userId},{Cart: "1"});
    } catch (error) {
        return next(new HttpError('Fetching cart failed, please try agian.', 500))
    }


    res.status(200).json({ cart: (cart || []).map(u => u.toObject({ getters: true })) });
};

const createCart = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new httpError('Invalid inputs passed. Please check. ', 422));
    }
    const { cart } = req.body;

    try {
        const existingCart = await Category.findOne({ user : userId },{cart : '1'});
        if (existingCart) {
            return next(new HttpError('Cart already exists. !', 400))
        }
        const newCart = new Category({
                cart
                });
        await newCart.save();
        res.status(201).json({ message: "New Cart Created", category: newUser.toObject({ getters: true }) });
    } catch (error) {
        return next(new HttpError('Cart failed, please try again later.' + error.message, 422))
    }
}
exports.getCartByUser = getCartByUser;