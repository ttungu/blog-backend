const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

const jwtToken = require("../misc/jwtToken");

// get all comments (with the same post _id)
exports.comments_get = [
  (req, res, next) => jwtToken.checkHeaderForToken(req, res, next),
  (req, res, next) => {
    const authData = jwtToken.verifyUserToken(req.token);
    if (typeof authData == "undefined") {
      res.sendStatus(403);
    } else {
      Comment.find({ post: req.params.postid })
        .sort({ date_created: 1 })
        .exec((err, found_comments) => {
          if (err) return next(err);
          res.json(found_comments);
        });
    }
  },
];

// comment get
exports.comment_get = [
  (req, res, next) => jwtToken.checkHeaderForToken(req, res, next),
  (req, res, next) => {
    const authData = jwtToken.verifyUserToken(req.token);
    if (typeof authData == "undefined") {
      res.sendStatus(403);
    } else {
      Comment.findById(req.params.commentid, (err, found_comment) => {
        if (err) return next(err);
        res.json(found_comment);
      });
    }
  },
];

//coment post
exports.comment_post = [
  (req, res, next) => jwtToken.checkHeaderForToken(req, res, next),
  body("author", "Author must be filled")
    .escape()
    .trim()
    .isLength({ min: 1, max: 100 }),
  body("text", "Text must be filled")
    .escape()
    .trim()
    .isLength({ min: 1, max: 500 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.sendStatus(400);
    } else {
      // verify token
      const authData = jwtToken.verifyUserToken(req.token);
      if (typeof authData == "undefined") {
        res.sendStatus(403);
      } else {
        //input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          errors.status = 404;
          res.json(errors);
        } else {
          const { author, text } = req.body;
          const { postid } = req.params;
          const comment = new Comment({
            author,
            text,
            post: req.params.postid,
          }).save((err, saved_comment) => {
            if (err) return next(err);
            res.redirect(`/api/posts/${postid}/comments/${saved_comment._id}`);
          });
        }
      }
    }
  },
];

//comment put
exports.comment_put = [
  (req, res, next) => jwtToken.checkHeaderForToken(req, res, next),
  body("text", "Text must be filled.").isLength({ min: 1, max: 1000 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.sendStatus(400);
    } else {
      const authData = jwtToken.verifyUserToken(req.token);
      if (typeof authData == "undefined") {
        res.sendStatus(403);
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          errors.status = 404;
          res.json(errors);
        } else {
          const { text } = req.body;
          const { postid, commentid } = req.params;
          const comment = new Comment({
            text,
            date_edited: Date.now(),
            _id: commentid,
          });

          Comment.findByIdAndUpdate(commentid, comment, (err, result) => {
            if (err) return next(err);
            if (result == null) {
              return next(new Error("No comments found."));
            } else {
              res.redirect(`/api/posts/${postid}/comments/${commentid}`);
            }
          });
        }
      }
    }
  },
];

//comment delete
exports.comment_delete = [
  (req, res, next) => jwtToken.checkHeaderForToken(req, res, next),
  (req, res, next) => {
    const authData = jwtToken.verifyUserToken(req.token);
    if (typeof authData == "undefined") {
      res.sendStatus(403);
    } else {
      Comment.findByIdAndDelete(req.params.commentid, (err) => {
        if (err) return next(err);
        res.redirect("/api");
      });
    }
  },
];
