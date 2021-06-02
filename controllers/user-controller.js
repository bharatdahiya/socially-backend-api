const { validationResult } = require('express-validator');

const User = require('../models/user');
const HttpError = require("../models/http-error");

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password'); // 'email name' other approach
    } catch (error) {
        return next(new HttpError('Fetching users failed, please try agian.', 500))
    }


    res.status(200).json({ users: users.map(u => u.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new httpError('Invalid inputs passed. Please check. ', 422));
    }
    const { name, email, password, image } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return next(new HttpError('User already exists. !', 400))
        }
        const newUser = new User({
            name,
            email,
            password,
            image,
            places: []
        });
        await newUser.save();
        res.status(201).json({ message: "New User added", user: newUser.toObject({ getters: true }) });
    } catch (error) {
        return next(new HttpError('Signup is failed, please try again later.' + error.message, 422))
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Login failed, please try again later. Error : ' + error.message, 422));

    }

    if (!existingUser || existingUser.password !== password) {
        return next(new HttpError('Invalid credentials, please try again later.', 401));
    }

    res.status(200).json({ message: 'User logged in.' })
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;