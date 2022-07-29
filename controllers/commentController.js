

// get all comments
exports.comments_get = (req, res, next) => {
    res.json({
        message: "should work"
    })
}

// comment get
exports.comment_get = (req, res, next) => {
    res.json({
        message: "should work"
    })
}

//coment post
exports.comment_post= (req, res, next) => {
    res.json({
        message: "should work"
    })
}

//comment put
exports.comment_put = (req, res, next) => {
    res.json({
        message: "should work"
    })
}

//comment delete
exports.comment_delete = (req, res, next) => {
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