"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.userRegister = void 0;
const index_1 = require("../index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        const user = yield index_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
        res.json({
            user,
        });
    }
    catch (error) {
        if (error.code === "P2002") {
            res.send({
                code: "P2002",
                message: "User e-mail Already Exist...",
            });
        }
        res.send(error);
    }
});
exports.userRegister = userRegister;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield index_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            if (user.password == password) {
                const token = jsonwebtoken_1.default.sign({ name: user.id }, `${process.env.JWT_SECRET}`, {
                    expiresIn: "1d",
                });
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                });
                res.json({
                    succeded: true,
                    message: "Login Succesfully",
                });
            }
        }
        else {
            res.status(401).json({
                succeded: false,
                error: "There is no such user",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
});
exports.LoginUser = LoginUser;
