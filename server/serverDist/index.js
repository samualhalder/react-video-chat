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
const emailToSocketId = new Map();
const socketIdToEmail = new Map();
io.on("connection", (socket) => {
    console.log("connection done");
    socket.on("join-room", ({ roomId, email }) => {
        emailToSocketId.set(email, socket.id);
        socketIdToEmail.set(socket.id, email);
        io.to(roomId).emit("joined-room", { email, socketId: socket.id });
        socket.join(roomId);
        io.to(socket.id).emit("join-room", { email, roomId });
    });
});
app.listen(8080, () => {
    console.log("server listing to port 8080");
});
io.listen(8081);
