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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
const dotenv_1 = require("dotenv");
const mongoose_1 = require("../schema/mongoose");
const mongoose_2 = require("mongoose");
(0, dotenv_1.config)();
(0, mongoose_1.connectDB)();
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Assume all parameters exist, then check
        let username = req.query.username;
        let password = req.query.password;
        let email = req.query.email;
        if (username && password && email && process.env.DB_URL) {
            let user_id = 1;
            let users = yield mongoose_1.User.find({}).sort({ "user_id": -1 });
            if (users[0]) {
                user_id += users[0].user_id;
            }
            const user = new mongoose_1.User({
                name: username,
                password: password,
                email: email,
                date_joined: new Date().getDate(),
                user_id: user_id,
            });
            yield user.save();
            mongoose_2.connection.close();
            res.status(201).send(`Created user: ${user_id}`);
        }
        else {
            res.status(400).send("Uh oh!");
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.DB_URL) {
            let users = yield (mongoose_1.User.find().limit(10));
            res.status(200).send(JSON.stringify(users));
        }
        else {
            res.status(400).send();
        }
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        console.log(id);
        if (id && process.env.DB_URL) {
            let user = yield mongoose_1.User.find({ "user_id": id });
            if (user[0]) {
                res.status(200).send(JSON.stringify(user[0]));
            }
            else {
                res.status(400).send("Could not find user.");
            }
        }
        else {
            res.status(400).send("No user id provided.");
        }
    });
}
