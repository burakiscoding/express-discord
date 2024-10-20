// src/server.ts
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { dirname, join } from "node:path";

const app = express();
const server = createServer(app);
const io = new Server(server);
const publicPath = join(__dirname, "../../public");

app.get("/", (req, res) => {
  res.sendFile(join(publicPath, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });
  socket.on("audio", (data) => {
    socket.emit("audio", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
