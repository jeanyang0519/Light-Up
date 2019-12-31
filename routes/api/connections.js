const express = require("express");
const router = express.Router();
// const validateSignupInput = require("../../validation/signup");
// const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


router.get('/', (req, res) => {
    User.findOne({ _id: req.body.userId })
      .then(user => res.json(user))
      .catch(err =>
        res
          .status(404)
          .json({ noconnectionsfound: "No conections found" })
    );
})

router.post('/addConnection', (req, res) => {
    // User.findOneAndUpdate({ _id: req.params.user_id }, {$push: {collections: req.body.user_id}})
    User.findOneAndUpdate({ _id: req.body.userId }, { $push: {connections: { user: req.body.connectionId }}})
      .then(user => res.json(user))
      .catch(err =>
        res.status(404).json({ noconnectionsfound: "Cannot Add connection" })
      );
});

module.exports = router

// {
//     "id": "5e0a252b9e7505ba125f17ef",
//     "username": "john1",
//     "email": "john1@gmail.com",
//     "userType": "Mentor"
// }