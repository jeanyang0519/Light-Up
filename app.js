const express = require("express");
const app = express();
const users = require("./routes/api/users");
const connections = require("./routes/api/connections");
const chats = require("./routes/api/chats")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
const passport = require("passport");
const io = require("socket.io").listen(server)

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=> console.log("Connected to MongoDB successfully"))
    .catch( err => console.log(err))

app.get("/", (req, res) => {
    res.send("hello from lightp")
})
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users)
app.use("/api/connections", connections);
app.use("/api/chats", chats);

// socket.io framework
io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('enter chat', chat => {
        socket.join(chat)
    });

    socket.on("leave chat", chat => {
      socket.leave(chat);
      console.log(`joined ${chat}`);
    });

    socket.on("new message", chat => {
      io.sockets.in(chat).emit('refresh messages', chat);
      console.log(`left ${chat}`);
    });

    socket.on("disconnect", () => {
      console.log('User disconnected');
    });
});

