

const { body } = require('express-validator');
const Post = require('../models/post');
//get all posts
//TODO - pagenation
exports.posts_get = ((req, res, next) => {
    res.json({
        message: "should work"
    })
})

// get 1 post
exports.post_get = (req, res, next) => {
    res.json({
        message: "should work1"
    })
}

// post post
exports.post_post = (req, res, next) => {
    //TODO input sanitation, validation
    const post = new Post({
        author: "62de944910d564394e6d0b98",
        title: req.body.title,
        text: req.body.text,
        date: Date.now(),
        published: req.body.published
    }).save((err, savedPost) => {
        if(err) next(err);
        res.redirect(`/api/posts/${ savedPost._id }`);
    })
    
}

// put post
exports.post_put = (req, res, next) => {
    res.json({
        message: "should work"
    })
}

// delete post
exports.post_delete = (req, res, next) => {
    res.json({
        message: "should work"
    })
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