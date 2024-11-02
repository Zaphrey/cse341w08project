import { config } from "dotenv";
import mongoose, { Schema, model, connect, Types } from "mongoose";
import { schema } from "./graphql";

config();

const dbUrl: string | null = process.env.DB_URL || null

export type IUser = {
    _id: Types.ObjectId,
    name: string,
    password: string,
    email: string,
    date_joined: string,
    user_id: number,
    reviews: Types.ObjectId,
}

export type IReview = {
    body: string,
    title: string
    rating: number,
    date: string,
    movie: Types.ObjectId,
    user: Types.ObjectId,
}

export type IMovie = {
    name: string,
    genre: string,
    maker: string,
    cover: string,
    description: string,
    date: string,
    reviews: Types.ObjectId,
}

const userSchema = new Schema<IUser>({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    date_joined: { type: String, required: true },
    user_id: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }]
});

// From here, we'll establish a One-to-Many database connection from
// the User collection with the Movie collection

const reviewSchema = new Schema<IReview>({
    body: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String, required: true },
    movie: { type: Schema.Types.ObjectId, ref: "movies", required: true },
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
})

const movieSchema = new Schema<IMovie>({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    maker: { type: String, required: true },
    cover: { type: String, required: true },
    date: { type: String, required: true},
    description: { type: String, required: false },
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }]
})

// userSchema.plugin(autoIncrement, { id: "user_id", inc_field: "id" })
export const User = model<IUser>("users", userSchema);
export const Movie = model<IMovie>("movies", movieSchema);
export const Review = model<IReview>("reviews", reviewSchema)

export async function connectDB() {
    if (dbUrl) {
        await connect(dbUrl);
    }
}