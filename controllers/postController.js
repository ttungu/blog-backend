const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtToken = require('../misc/jwtToken');

const Post = require('../models/post');
const Comment = require('../models/comment')

//get all posts
//TODO - pagenation
exports.posts_get = [
    (req, res, next) => jwtToken.checkHeaderForToken(req,res,next),
    (req, res, next) => {
        const authData = jwtToken.verifyUserToken(req.token);
        console.log(authData.user._id)
        if (typeof authData === "undefined") {
            res.sendStatus(403);
        } else {
            Post.find().exec((err, posts) => {
                if (err) return next(err);
                res.json({
                    posts: posts
                })
            });
        }
    
    }
]


// get specific post
exports.post_get = [
    (req, res, next) => jwtToken.checkHeaderForToken(req,res,next),
    (req, res, next) => {
        const authData = jwtToken.verifyUserToken(req.token);
        if (typeof authData === "undefined") {
            res.sendStatus(403);
        } else {
            Post.find({ "_id": req.params.postid }).exec((err, found_post) => {
                if (err) return next(err);
                res.json({
                    post: found_post
                })
            })
        }
    }
] 

// post post
exports.post_post = [
    (req, res, next) => jwtToken.checkHeaderForToken(req,res,next),
    body("title")
        .trim()
        .escape()
        .isLength({ min: 1, max: 100 }).withMessage("Title must be filled and cant exceed 100 characters."),
    body("text")
        .trim()
        .escape()
        .isLength({ min: 1, max: 1000 }).withMessage("Title must be filled and cant exceed 1000 characters."),
    (req, res, next) => {
        // check jwt token validity
        const authData = jwtToken.verifyUserToken(req.token);
        if (typeof authData === "undefined") {
            res.sendStatus(403);
        } else {
            // input validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors.status = 400;
                res.json(errors)
            } else {
                const post = new Post({
                    author: authData.user._id,
                    title: req.body.title,
                    text: req.body.text,
                    isPublished: req.body.isPublished
                }).save((err, savedPost) => {
                    if (err) next(err);
                    res.redirect(`/api/posts/${savedPost._id}`);
                })
            }

        }

    }
]

// put post
exports.post_put = [
    (req, res, next) => jwtToken.checkHeaderForToken(req,res,next),
    body("title")
        .trim()
        .escape()
        .isLength({ min: 1, max: 100 }).withMessage("Title must be filled and cant exceed 100 characters."),
    body("text")
        .trim()
        .escape()
        .isLength({ min: 1, max: 1000 }).withMessage("Title must be filled and cant exceed 1000 characters."),
    (req, res, next) => {
        // verify JWT token
        const authData = jwtToken.verifyUserToken(req.token);
        if (typeof authData === "undefined") {
            res.sendStatus(403);
        } else {
            // input validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors.status = 400;
                res.json(errors)
            } else {
                const post = new Post({
                    _id: req.params.postid,
                    title: req.body.title,
                    text: req.body.text,
                    date_edited: Date.now(),
                    isPublished: req.body.isPublished
                });
                Post.findByIdAndUpdate(req.params.postid, post, { new: true }, (err, result) => {
                    if (err) return next(err);
                    if (result == null) {
                        return next(new Error("No post found"));
                    } else {
                        res.redirect(`/api/posts/${req.params.postid}`);
                    }
    
                })
            }
            
        }

    }
]


// delete post
exports.post_delete = [
    (req, res, next) => jwtToken.checkHeaderForToken(req,res,next),
    (req, res, next) => {
        const authData = jwtToken.verifyUserToken(req.token);
        if (typeof authData === "undefined") {
            res.sendStatus(403);
        } else {
            Comment.find({ "post": req.params.postid }, (err, found_comments) => {
                if (err) return next(err);
                if (found_comments.length < 1) {
                    Post.findByIdAndDelete(req.params.postid).exec((err) => {
                        if (err) return next(err);
                        res.redirect('/api')
                    })
                } else {
                    res.json({
                        message: "You must delete all the comments first",
                        comments: found_comments
                    })
                }
            });
        }   
    }
]