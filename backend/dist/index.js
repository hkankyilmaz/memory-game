"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importStar(require("express"));
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
// listening the port
const server = app.listen(8080, () => {
    console.log("Hello Server");
});
// socket.io server
const io = new socket_io_1.Server(server);
// regular middleware
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, cookie_parser_1.default)());
// routes
app.use("/users", userRoutes_js_1.default);
// socket.io
// online-users
let users = [];
let rooms = [];
// socket.io funcs
io.on("connection", (socket) => {
    console.log("user connected...!");
    socket.on("Messages", (message) => {
        let _room = rooms.filter((item) => item == message.room);
        io.in(_room[0]).emit("amk");
        console.log(message);
    });
    socket.on("chatRoom", (user) => {
        let isUserExixst = users.find((item) => item.email === user.email);
        console.log(user);
        if (!isUserExixst) {
            if (users.length % 2 === 0) {
                let _user;
                _user = { email: user.email, name: user.name, id: socket.id };
                socket.join(user.email);
                users.push(_user);
                socket.emit("chatRoom", _user);
                socket.broadcast.emit("chatRoom", _user);
            }
            else {
                let _user;
                _user = { email: user.email, name: user.name, id: socket.id };
                users.push(_user);
                rooms.push(user.email);
                socket.join(users.slice(-2)[0].email);
                users.slice(-2).map((item) => {
                    io.sockets.connected[item.id].join(users.slice(-2)[0].email);
                });
                socket.emit("chatRoom", users.slice(-2)[1]);
                socket.broadcast.emit("chatRoom", users.slice(-2)[1]);
            }
        }
        console.log(users, rooms);
        console.log(io.sockets.adapter.rooms);
    });
    socket.on("disconnect", () => {
        let whoIsDisconnect = users.filter((item) => socket.id == item.id);
        let filteredUsers = users.filter((item) => socket.id !== item.id);
        users = filteredUsers;
        console.log("deneme", socket.id, whoIsDisconnect);
        // socket.emit(
        //   whoIsDisconnect[0].email,
        //   "The Game is Finished Because one player disconnect...!"
        // );
        console.log("User Disconnected");
    });
});
console.log(users);
