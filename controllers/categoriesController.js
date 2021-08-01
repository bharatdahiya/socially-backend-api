
const Category = require('../models/category');
const HttpError = require("../models/http-error");

const { validationResult } = require('express-validator');
const getCategories = async (req, res, next) => {
    let categories;
    try {
        categories = await Category.find();
    } catch (error) {
        return next(new HttpError('Fetching categories failed, please try agian.', 500))
    }


    res.status(200).json({ categories: (categories || []).map(u => u.toObject({ getters: true })) });
};


// const createCategory = async (req, res, next) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//         return next(new httpError('Invalid inputs passed. Please check. ', 422));
//     }
//     const { name } = req.body;

//     try {
//         const existingUser = await Category.findOne({ name: name });
//         if (existingUser) {
//             return next(new HttpError('User already exists. !', 400))
//         }
//         const newUser = new Category({
//             name
//         });
//         await newUser.save();
//         res.status(201).json({ message: "New User added", category: newUser.toObject({ getters: true }) });
//     } catch (error) {
//         return next(new HttpError('category is failed, please try again later.' + error.message, 422))
//     }
// }

exports.getCategories = getCategories;
// exports.createCategory = createCategory;