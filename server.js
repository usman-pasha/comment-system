const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const dbConnect = require("./db");
dbConnect.openDBConnection();
const commentModel = require("./models/comment");
app.use(express.static("public"));
app.use(express.json());

// Routes
app.post("/api/comments", (req, res) => {
  const comment = new commentModel({
    username: req.body.username,
    comment: req.body.comment,
  });
  comment.save().then((response) => {
    console.log(response);
    res.send(response);
  });
});

app.get("/api/comments", (req, res) => {
  commentModel.find().then(function (comments) {
    res.send(comments);
  });
});

const server = app.listen(port, () => {
  console.log(`App is Running on port ${port}\nOn ${app.get("env")} Server!`);
});

let io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);
  // Recieve event
  socket.on("comment", (data) => {
    data.time = Date();
    socket.broadcast.emit("comment", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
