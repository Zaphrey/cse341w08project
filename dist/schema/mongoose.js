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
exports.User = void 0;
exports.connectDB = connectDB;
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
(0, dotenv_1.config)();
const dbUrl = process.env.DB_URL || null;
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    date_joined: { type: String, required: true },
    user_id: { type: Number, required: true },
});
// userSchema.plugin(autoIncrement, { id: "user_id", inc_field: "id" })
exports.User = (0, mongoose_1.model)("user", userSchema);
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dbUrl) {
            (0, mongoose_1.connect)(dbUrl);
        }
    });
}
