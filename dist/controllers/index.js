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
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.deleteAllUsers = deleteAllUsers;
const dotenv_1 = require("dotenv");
const mongoose_1 = require("../schema/mongoose");
const mongoose_2 = require("mongoose");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const customErrors_1 = require("../errors/customErrors");
(0, dotenv_1.config)();
const DB_URI = (String)(process.env.DB_URL || ""); // Assuming that the DB URI is in fact there
function addUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Assume all parameters exist, then check
        let result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            throw new customErrors_1.ApiValidationError(`${JSON.stringify(result, null, 4)}`);
        }
        yield (0, mongoose_2.connect)(DB_URI);
        let doc_id = new mongoose_2.mongo.ObjectId().toString();
        let user_id = 1;
        let users = yield mongoose_1.User.find({}).sort({ "user_id": -1 });
        let hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        if (users[0]) {
            user_id += users[0].user_id;
        }
        const user = new mongoose_1.User({
            _id: doc_id,
            name: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            date_joined: new Date().toISOString().replace("/T/", " ").replace(/\..+/, ""),
            user_id: user_id,
        });
        yield user.save();
        mongoose_2.connection.close();
        res.setHeader("Content-Type", "text/html");
        res.status(201).send(`Created user ${user_id}, ${doc_id}`);
    });
}
// Get
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_2.connect)(DB_URI);
        let users = yield (mongoose_1.User.find());
        mongoose_2.connection.close();
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(users);
    });
}
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            throw new customErrors_1.ApiValidationError(`${JSON.stringify(result, null, 4)}`);
        }
        yield (0, mongoose_2.connect)(DB_URI);
        mongoose_1.User.findOne({ user_id: Number.parseInt(req.params.id) })
            .then(user => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(user));
        })
            .catch(error => {
            res.status(422).send(error);
        });
    });
}
// Update
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        let result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            throw new customErrors_1.ApiValidationError(`${JSON.stringify(result, null, 4)}`);
        }
        let query = req.query;
        let filter = { user_id: Number.parseInt(req.params.id) };
        // let userData = await User.findOne(filter);
        let password = (_a = query.password) === null || _a === void 0 ? void 0 : _a.toString();
        if (password) {
            password = yield bcrypt_1.default.hash(password, 10);
        }
        let update = {
            name: (_b = query.username) === null || _b === void 0 ? void 0 : _b.toString(),
            password: password,
            email: (_c = query.email) === null || _c === void 0 ? void 0 : _c.toString()
        };
        mongoose_1.User.findOneAndUpdate(filter, update)
            .then(() => {
            res.status(201).send("Successfully updated user");
        })
            .catch(error => {
            res.status(400).send(error);
        });
    });
}
// Delete 
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            throw new customErrors_1.ApiValidationError(`${JSON.stringify(result, null, 4)}`);
        }
        let id = Number.parseInt(req.params.id);
        let filter = { user_id: id };
        yield (0, mongoose_2.connect)(DB_URI);
        mongoose_1.User.findOneAndDelete(filter)
            .then(() => {
            res.status(204).send();
        })
            .catch(error => {
            res.status(400).send(error);
        });
    });
}
function deleteAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            throw new customErrors_1.ApiValidationError(`${JSON.stringify(result, null, 4)}`);
        }
        yield (0, mongoose_2.connect)(DB_URI);
        mongoose_1.User.deleteMany({ user_id: { $gt: 0 } })
            .then(query => {
            res.status(204).send();
        })
            .catch(error => {
            res.status(422).send();
        });
    });
}
