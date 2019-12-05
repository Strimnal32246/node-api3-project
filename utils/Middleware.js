const express = require("express");
const postDB = require("../posts/postDb");
const userDB = require("../users/userDb");

const logger = (req, res, next) => {
  console.log(`the request:${req.method} made to:${req.originalUrl}`);
  next();
};
function validateUserId(req, res, next) {
  const userId = req.params.id || req.body.user_id;
  Users.getById(userId)
    .then(user => {
      if (user) {
        req.user = user;
        return next();
      } else {
        res.status(400, "that is not a valid id", res);
      }
    })
    .catch(() => {
      res.status(500, "cant find that user in our data", res);
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400, "cant find user data", res);
  } else if (!req.body.name) {
   res.status(400, "Need to insert name", res);
  } else {
    return next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
   res.status(400, "cant find post data", res);
  } else if (!req.body.text) {
    res.status(400, "You need to insert text", res);
  } else {
    req.body.user_id = req.user.id;
    next();
  }
}
