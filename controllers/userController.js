const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_index = (req, res) => {
    res.json({
        message: "Works."
    });
}

exports.user_singup_post = ((req, res, next) => {
    // TODO sanitize, validate input
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
})

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
                    jwt.sign({user: found_user}, process.env.JWT_SECRET, (err, token) => {
                        if(err) return next(err);
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

// testing endpoint (token)
exports.user_test_get =  (req, res, next) => {
    const authData = verifyUserToken(req.token);
    console.log(req.token)
    if(typeof authData === "undefined") {
        res.sendStatus(403);
    } else {
        res.json({
            message: "Token exists.",
            authData
        })
    }
}

// verifying users token
function verifyUserToken(token){
    try {
        const authData = jwt.verify(token, process.env.JWT_SECRET);
        return authData;
    } catch (err) {
        return;
    }
}