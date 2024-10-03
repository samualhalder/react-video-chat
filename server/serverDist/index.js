"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const io = new socket_io_1.Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const userToRoomIdMap = new Map();
io.on("connection", (socket) => {
    console.log("connection done");
    socket.on("join-room", ({ roomId, email }) => {
        console.log(email, roomId);
        userToRoomIdMap.set(email, roomId);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("new user join", { email });
    });
});
app.listen(8080, () => {
    console.log("server listing to port 8080");
});
io.listen(8081);
