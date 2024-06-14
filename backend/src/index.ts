import { Socket } from "socket.io";
import http from "http";

import express from 'express';
import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManger";
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser("randomName", socket);
  io.emit("userCount", { currUserCount: io.engine.clientsCount });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("userCount", { currUserCount: io.engine.clientsCount });
    userManager.removeUser(socket.id);
  })
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});