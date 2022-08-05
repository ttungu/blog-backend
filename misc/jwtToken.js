const jwt = require('jsonwebtoken');

// see if headers have jwt token (bearer) and assign token
exports.checkHeaderForToken = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }
}

//verify user's token
exports.verifyUserToken = function (token) {
    try {
        const authData = jwt.verify(token, process.env.JWT_SECRET);
        return authData;
    } catch (err) {
        return;
    }
}