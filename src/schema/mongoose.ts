import { config } from "dotenv";
import mongoose, { Schema, model, connect, Types } from "mongoose";

config();

const dbUrl: string | null = process.env.DB_URL || null

export type IUser = {
    name: string,
    password: string,
    email: string,
    date_joined: string,
    user_id: number,
    ratings: Types.ObjectId,
};

// export type IMovie = {
//     movie_name: string,
//     movie_maker: string,
//     movie_cover: string,
//     movie_description: string,
//     user_ratings: Types.ObjectId,
//     user_star_rating: Number,
//     user_review: string,
// }

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    date_joined: { type: String, required: true },
    user_id: { type: Number, required: true },
    ratings: { type: Schema.Types.ObjectId, ref: "ratings" }
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
export const User = model<IUser>("users", userSchema);
// export const Movie = model<IMovie>("movies", movieSchema);

export async function connectDB() {
    if (dbUrl) {
        await connect(dbUrl);
    }
}