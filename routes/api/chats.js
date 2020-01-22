const express = require("express");
const router = express.Router();
// const validateSignupInput = require("../../validation/signup");
// const validateLoginInput = require("../../validation/login");
const Chat = require("../../models/Chat");
const Message = require("../../models/Message");
const User = require("../../models/User");
const validateMessageInput = require("../../validation/chat");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.find()
      .select("_id participants")
      .then(chats => res.json(chats))
      .catch(err => res.json(err));
  }
);


router.post(
  "/new/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //   Chat.collection.dropIndexes()

    const { errors, isValid } = validateMessageInput(req.body);
    const participants = req.body.participants;

    if (!isValid) {
      console.log(errors)
      console.log(!isValid)
      return res.status(422).json(errors);
    }

    let allParticipants = undefined;
    if (typeof participants === "string") {
      allParticipants = [req.params.userId, participants];
    } else {
      allParticipants = [req.params.userId, ...participants];
    }

    Chat.findOne({ participants: allParticipants }).then(chat => {
      if (chat) {
        res.status(422).json({ message: "Conversation already exists" });
      } else {
        const newChat = new Chat({
          participants: allParticipants
        });
        newChat
          .save()
          .then(chat => {
            const newMessage = new Message({
              chatId: chat._id,
              message: req.body.message,
              sender: req.params.userId
            });

            newMessage
              .save()
              .then(() => res.json({ message: "Conversation Started" }))
              .catch(err => res.status(422).json(err));
          })
          .catch(err => res.status(422).json(err));
      }
    });
  }
);

router.delete(
  "/:chatId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.findOneAndUpdate(
      req.params.chatId,
      { $pull: { participants: req.body.userId } },
      { new: true },
      (err, chat) => {
        if (err) {
          return res.json({ nochatfound: "No Chat Found" });
        }
        if (chat.participants.length === 0) {
          chat.remove()
            .then(() => {
                Message.deleteMany({ chatId: chat._id })
                    .then(() => res.json({ message: "All messages deleted" }))
                    .catch(() => res.json({ nomessagesfound: "No Messages Found" }))
            })
        }
        res.json({ message: "Chat removed" });
      }
    ).catch(err => res.status(404).json(err));
  }
);


router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.find(
      {
        participants: req.params.userId
      },
      "_id"
    )
      .then(chatIds => {
        const chats = [];
        chatIds.forEach(chat => {
          Message.find({ chatId: chat._id })
            .sort({ date: -1 })
            .limit(1)
            .populate({
              path: "sender",
              select: "username email"
            })
            .then(message => {
              chats.push(...message);
              if (chats.length === chatIds.length)
                return res.json(chats);
            });
        });
      })
      .catch(() => res.status(404).json({ nochats: "No Chats Found" }));
  }
);

router.get(
  "/:chatId/messages",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.find({ chatId: req.params.chatId })
      .select("message sender date chatId")
      .sort({ date: 1 })
      .populate({
        path: "sender",
        select: "username email"
      })
      .then(messages => {
        res.json(messages);
      })
      .catch(() => res.status(404).json({ nochats: "No Messages Found" }));
  }
);


router.post(
  "/messages/new/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMessage = new Message({
      chatId: req.body.chatId,
      message: req.body.message,
      sender: req.params.userId
    });

    newMessage
      .save()
      .then((message) => {
        Message
          .findOne(message._id)
          .select("message sender date chatId")
          .sort({ date: 1 })
          .populate({
            path: "sender",
            select: "username email"
          })
          .then(messageWithDetails => {
            res.json(messageWithDetails)
          })
          .catch((err) => res.json(err))
      })
      .catch(err => res.status(422).json(err))
  }
);


module.exports = router;

