import express from "express";
import { Server } from "socket.io";
import { socketData } from "./types/socket";

const app = express();
app.use(express.json());
const io = new Server({
  cors: {
    origin: "*", // Allow all origins, you can specify your frontend origin here
    methods: ["GET", "POST"],
  },
});

const userToRoomIdMap = new Map();

io.on("connection", (socket) => {
  console.log("connection done");
  socket.on("join-room", ({ data }: { data: socketData }) => {
    console.log(data);

    const { roomId, email } = data;

    userToRoomIdMap.set(email, roomId);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("new user join", { email });
  });
});

app.listen(8080, () => {
  console.log("server listing to port 8080");
});
io.listen(8081);
