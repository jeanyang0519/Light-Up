const express = require("express");
const router = express.Router();
const validateSignupInput = require("../../validation/signup");
const validateProfileInput = require("../../validation/profile");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


router.get(
  "/",
  (req, res) => {
    User.find()
      .populate({
        path: "connections.user",
        select: "username first_name last_name"
      })
      .then(users => {
        
        const requested = users.map(user => {
          return {
            id: user._id,
            username: user.username,
            email: user.email,
            userType: user.userType,
            first_name: user.first_name,
            last_name: user.last_name,
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
  User.findOne({ _id: req.params.id })
    .populate({
      path: "connections.user",
      select: "username first_name last_name"
    })
    .then(user => {
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
        first_name: user.first_name,
        last_name: user.last_name,
        connections: user.connections,
        date: user.date,
        description: user.description,
        location: user.location,
        skills: user.skills,
        interests: user.interests
      });
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post('/signup', (req, res) => {
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
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            userType: req.body.userType,
            password: req.body.password,
            description: '',
            location: '',
            skills: '',
            interests: ''
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
                          first_name: user.first_name,
                          last_name: user.last_name,
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
                    .catch(err => res.json(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => { // create session
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .populate({
      path: "connections.user",
      select: "username first_name last_name"
    })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "Wrong Email/Password combo" });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
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


router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body) 
    
    if (!isValid) {
      return res.status(422).json(errors)
    }
    
    const updates = req.body
    User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true },
      (err, user) => {
        if (err) {
          return res.json({ message: "User doesn't exist" });
        }
        res.json({
          id: user._id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          userType: user.userType,
          connections: user.connections,
          date: user.date,
          description: user.description,
          location: user.location,
          skills: user.skills,
          interests: user.interests
        });
      }
    ).catch(err => res.json({ message: "User doesn't exist" }));
  }
);






module.exports = router;
