const express = require("express");
const router = express.Router();
const validateSignupInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      userType: req.user.userType,
      connections: req.user.connections,
      date: req.user.date,
      description: req.user.description,
      location: req.user.location,
      skills: req.user.skills,
      interests: req.user.interests
    });
  }
);

router.get(
  "/",
  (req, res) => {
    User.find()
      
      .then(users => {
        
        const requested = users.map(user => {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            userType: user.userType,
            connections: user.connections,
            date: user.date,
            description: user.description,
            location: user.location,
            skills: user.skills,
            interests: user.interests
          };
        })
        
        res.json(requested)
      })
      .catch(err => {
        
        res.status(404).json({ message: "no users found"})
      })
  }
);

router.get("/:id", (req, res) => {
  User.findOne({_id: req.params.id})
    .then(user => {
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
        connections: user.connections,
        date: user.date,
        description: user.description,
        location: user.location,
        skills: user.skills,
        interests: user.interests
      })
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post('/signup', (req, res) => { // create User
    const { errors, isValid } = validateSignupInput(req.body)

    if (!isValid) {
        return res.status(422).json(errors)
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(422).json(errors);
        } else {
            const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            userType: req.body.userType,
            password: req.body.password
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => {
                        const payload = {
                          id: user._id,
                          username: user.username,
                          email: user.email,
                          userType: user.userType,
                          connections: user.connections,
                          date: user.date,
                          description: user.description,
                          location: user.location,
                          skills: user.skills,
                          interests: user.interests
                        };

                        jwt.sign(
                          payload,
                          keys.secretOrKey,
                          { expiresIn: 10800 },
                          (err, token) => {
                            res.json({
                              success: true,
                              token: `Bearer ${token}`
                            });
                          }
                        );
                    })
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => { // create session
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "Wrong Email/Password combo" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
        connections: user.connections,
        date: user.date,
        description: user.description,
        location: user.location,
        skills: user.skills,
        interests: user.interests
      }

        jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 10800 },
            (err, token) => {
                res.json({
                    sucess: true,
                    token: `Bearer ${token}`
                })
            }
        )
      } else {
        return res.status(422).json({ password: "Wrong Email/Password combo" });
      }
    });
  });
});






module.exports = router;
