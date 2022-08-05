const bcrypt = require('bcryptjs');
const { body, check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const User = require('../models/user');
const jwtToken = require('../misc/jwtToken');

exports.user_index = (req, res) => {
    res.json({
        message: "Works."
    });
}

exports.user_singup_post = [
    body('username').trim().escape().isLength({ min: 1 }).withMessage("Username can't be empty."),
    body('password').trim().escape().isLength({ min: 3 }).withMessage("Password must be at least 3 chars long."),
    check('password').exists(),
    check('confirmPassword', 'password must be the same').exists().custom((value, { req }) => value === req.body.password),
    ((req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            res.sendStatus(400);
        } else {
            console.log(req.body.username)
            User.findOne({ "username": req.body.username }).exec((err, found_user) => {
                if (err) return next(err);
                if (found_user) {
                    res.json({
                        message: `User ${req.body.username} already exists.`
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                        const user = new User({
                            username: req.body.username,
                            password: hashedPassword
                        }).save(err => {
                            if (err) return next(err);
                            res.redirect('/');
                        })
                    })
                }
            })
        }
    })
]

exports.user_login_post = ((req, res, next) => {
    //TODO sanitize, validate input
    User.findOne({ "username": req.body.username }, (err, found_user) => {
        if (err) return next(err);
        if (!found_user) {
            res.json({
                message: `User ${req.body.username} not found.`
            })
        } else {
            // compare sent pwd with user pwd
            bcrypt.compare(req.body.password, found_user.password, (err, response) => {
                if (err) return next(err);
                if (response) {
                    // TODO sign user and send token
                    jwt.sign({ user: found_user }, process.env.JWT_SECRET, (err, token) => {
                        if (err) return next(err);
                        console.log(token);
                        res.json({
                            message: `User logged in.`,
                            token: token
                        })
                    })
                } else {
                    res.json({
                        message: `Wrong password.`
                    })
                }
            })
        }

    })
})


// store file

// delete file 

// testing endpoint (token)
exports.user_test_get = [
    (req, res, next) => jwtToken.checkHeaderForToken(req, res, next),
    (req, res, next) => {
        const authData = jwtToken.verifyUserToken(req.token);
        console.log(req.token)
        if (typeof authData === "undefined") {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Token exists.",
                authData
            })
        }
    }
]
