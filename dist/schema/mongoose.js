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
exports.Review = exports.Movie = exports.User = void 0;
exports.connectDB = connectDB;
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
(0, dotenv_1.config)();
const dbUrl = process.env.DB_URL || null;
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date_joined: { type: String, required: true },
    googleId: { type: String, requred: true },
});
// From here, we'll establish a One-to-Many database connection from
// the User collection with the Movie collection
const reviewSchema = new mongoose_1.Schema({
    body: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String, required: true },
    movie: { type: mongoose_1.Schema.Types.ObjectId, ref: "movies", required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: true },
});
const movieSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    maker: { type: String, required: true },
    cover: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: false },
    rating: { type: String, required: true },
});
// userSchema.plugin(autoIncrement, { id: "user_id", inc_field: "id" })
exports.User = (0, mongoose_1.model)("users", userSchema);
exports.Movie = (0, mongoose_1.model)("movies", movieSchema);
exports.Review = (0, mongoose_1.model)("reviews", reviewSchema);
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dbUrl) {
            yield (0, mongoose_1.connect)(dbUrl);
        }
    });
}
