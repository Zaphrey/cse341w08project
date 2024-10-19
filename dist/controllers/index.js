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
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Assume all parameters exist, then check
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        if (username && password && email && process.env.DB_URL) {
            console.log("connecting");
            (0, mongoose_2.connect)(process.env.DB_URL);
            let user_id = 1;
            let users = yield mongoose_1.User.find({}).sort({ "user_id": -1 });
            if (users[0]) {
                user_id += users[0].user_id;
            }
            const user = new mongoose_1.User({
                name: username,
                password: password,
                email: email,
                date_joined: new Date(),
                user_id: user_id,
            });
            user.save();
            mongoose_2.connection.close();
            res.setHeader("Content-Type", "application/json");
            res.status(201).send(`Created user: ${user_id}`);
        }
        else {
            res.status(400).send("Uh oh!");
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getUsers");
        if (process.env.DB_URL) {
            console.log("connecting");
            console.log(process.env.DB_URL);
            (0, mongoose_2.connect)(process.env.DB_URL);
            let users = yield (mongoose_1.User.find().limit(10));
            mongoose_2.connection.close();
            res.setHeader("Content-Type", "application/json");
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
            (0, mongoose_2.connect)(process.env.DB_URL);
            let user = yield mongoose_1.User.find({ "user_id": id });
            mongoose_2.connection.close();
            if (user[0]) {
                res.setHeader("Content-Type", "application/json");
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
