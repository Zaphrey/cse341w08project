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
// export type IMovie = {
//     movie_name: string,
//     movie_maker: string,
//     movie_cover: string,
//     movie_description: string,
//     user_ratings: Types.ObjectId,
//     user_star_rating: Number,
//     user_review: string,
// }
const userSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    date_joined: { type: String, required: true },
    user_id: { type: Number, required: true },
});
// From here, we'll establish a One-to-Many database connection from
// the User collection with the Movie collection
// const movieSchema = new Schema<IMovie>({
//     movie_name: { type: String, required: true },
//     movie_maker: { type: String, required: true },
//     movie_cover: { type: String, required: true },
//     movie_description: { type: String, required: false },
//     user_ratings: { type: Schema.Types.ObjectId, ref: "ratings", required: true },
//     user_star_rating: { type: Number, required: true },
//     user_review: { type: String, required: true },
// })
// userSchema.plugin(autoIncrement, { id: "user_id", inc_field: "id" })
exports.User = (0, mongoose_1.model)("users", userSchema);
// export const Movie = model<IMovie>("movies", movieSchema);
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dbUrl) {
            yield (0, mongoose_1.connect)(dbUrl);
        }
    });
}
