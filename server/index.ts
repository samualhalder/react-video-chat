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

const userToRoomIdMap = new Map();

io.on("connection", (socket) => {
  console.log("connection done");
  socket.on(
    "join-room",
    ({ roomId, email }: { roomId: string; email: string }) => {
      console.log(email, roomId);

      userToRoomIdMap.set(email, roomId);
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("new user join", { email });
    }
  );
});

app.listen(8080, () => {
  console.log("server listing to port 8080");
});
io.listen(8081);
