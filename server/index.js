const express = require("express");
const dotenv = require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");

const io = socketIO(server);
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(messageRouter);

const port = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("💻 Mondodb Connected");
    server.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => console.error(err));
