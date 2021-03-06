const express = require("express");
const router = express.Router();
const Chat = require("../../models/Chat");
const Message = require("../../models/Message");
const validateMessageInput = require("../../validation/chat");
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

    const { errors, isValid } = validateMessageInput(req.body);
    const participants = req.body.participants;

    if (!isValid) {
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
              .save(function(err) {
                Message.populate(newMessage, {path: "sender", select: "username email first_name last_name"}, 
                function(err, message) {
                  if (err) return res.status(422).json(err);
                  res.json({message, chat})
              })})
          })
          .catch(err => res.status(422).json(err));
      }
    });
  }
);

router.patch(
  "/:chatId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.findOneAndUpdate(
      {_id: req.params.chatId},
      { $pull: { participants: req.body.userId } },
      { new: true },
      (err, chat) => {
        if (err) {
          return res.json({ nochatfound: "No Chat Found" });
        }
        if (chat.participants.length === 0) {
          chat.remove().then(() => {
            Message.deleteMany({ chatId: chat._id })
              .then(() => res.json({ message: "All messages deleted" }))
              .catch(() => res.json({ nomessagesfound: "No Messages Found" }));
          });
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
      }
    )
      .then(chats => {
        res.json(chats)
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
        select: "username email first_name last_name"
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
        Message.findOne(message._id)
          .select("message sender date chatId")
          .sort({ date: 1 })
          .populate({
            path: "sender",
            select: "username email first_name last_name"
          })
          .then(messageWithDetails => {
            res.json(messageWithDetails);
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.status(422).json(err))
  }
);


module.exports = router;

