import express from "express";
import { Server } from "socket.io";
import { socketData } from "./types/socket";

const app = express();
app.use(express.json());
const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const emailToSocketId = new Map<string, string>();
const socketIdToEmail = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("connection done");
  socket.on(
    "join-room",
    ({ roomId, email }: { roomId: string; email: string }) => {
      console.log(email, roomId);
      emailToSocketId.set(email, socket.id);
      socketIdToEmail.set(socket.id, email);
      io.to(roomId).emit("joined-room", { email, socketId: socket.id });
      socket.join(roomId);
      io.to(socket.id).emit("join-room", { email, roomId });
    }
  );
});

app.listen(8080, () => {
  console.log("server listing to port 8080");
});
io.listen(8081);
