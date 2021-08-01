
const Cart = require('../models/cart');
const HttpError = require("../models/http-error");

//const { validationResult } = require('express-validator');
const getCartByUser = async (req, res, next) => {
    let cart;
    const userId = req.params.userId;
    try {
        carts = await Cart.find({});
    } catch (error) {
        return next(new HttpError('Fetching cart failed, please try agian.', 500))
    }
    res.status(200).json({ cart: (carts || []).map(u => u.toObject({ getters: true })) });
};

const createCart = async (req, res, next) => {
    const { cart } = req.body;
    const userId = req.params.user;
    try {
        const existingCart = await Cart.findOne({ 'user' : userId },{cart : '1'});
        if (existingCart) {
            await Category.update({existingCart}, {cart:'0'})
        }
        const newCart = new Cart({cart});
        await newCart.save();
        res.status(201).json({ message: "New Cart Created", cart: newCart.toObject({ getters: true }) });
    } catch (error) {
        return next(new HttpError('Cart failed, please try again later.' + error.message, 422))
    }
}
exports.getCartByUser = getCartByUser;
exports.createCart = createCart;