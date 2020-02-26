const express = require("express");
const router = express.Router();
const User = require("../../models/User");
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

router.post(
    '/requestConnection', 
    passport.authenticate("jwt", { session: false }), 
    (req, res) => {
        User.findOneAndUpdate(
        { _id: req.body.userId },
        {
            $addToSet: {
            connections: {
                user: req.body.connectionId,
                status: 0
            }
            }
        }
        )
        .then(() => {
            User.findOneAndUpdate(
            { _id: req.body.connectionId },
            {
                $addToSet: {
                connections: {
                    user: req.body.userId,
                    status: 1
                }
                }
            }
            )
            .then(() => res.json({ message: "Connection Requested Sucessfully" }))
            .catch(err =>
                res
                .status(404)
                .json({ noconnectionsfound: "Cannot Complete Connection" })
            );
        })
        .catch(err =>
            res
            .status(404)
            .json({ noconnectionsfound: "Cannot Complete Connection" })
    );
});

router.post(
  "/acceptConnection",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.userId, "connections.user": req.body.connectionId },
      { 
        $set: { "connections.$.status": 2}
      }
    )
      .then(() => {
        User.findOneAndUpdate(
          { _id: req.body.connectionId, "connections.user": req.body.userId },
          { 
            $set: {"connections.$.status": 2}
          }
        )
          .then(() => res.json({ message: "Connection Accepted Sucessfully" }))
          .catch(err =>
            res
              .status(404)
              .json({ noconnectionsfound: "Cannot Accept connection" })
          );
      })
      .catch(err =>
        res.status(404).json({ noconnectionsfound: "Cannot Accept connection" })
    );
  }
);

router.post(
  "/removeConnection",
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        $pull: {
          connections: {
            user: req.body.connectionId
          }
        }
      }
    )
      .then(() => {
        User.findOneAndUpdate(
          { _id: req.body.connectionId },
          {
            $pull: {
              connections: {
                user: req.body.userId
              }
            }
          }
        )
          .then(() => res.json({ message: "Connection Removed Sucessfully" }))
          .catch(err =>
            res
              .status(404)
              .json({ noconnectionsfound: "Cannot Remove connection" })
          );
      })
      .catch(err =>
        res.status(404).json({ noconnectionsfound: "Cannot Remove connection" })
      );
  }
);

module.exports = router