import { config } from "dotenv";
import mongoose, { Schema, model, connect } from "mongoose";

config();

const dbUrl: string | null = process.env.DB_URL || null

export type IUser = {
    name: string,
    password: string,
    email: string,
    date_joined: string,
    user_id: number,
};

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    date_joined: { type: String, required: true },
    user_id: { type: Number, required: true },
});

// userSchema.plugin(autoIncrement, { id: "user_id", inc_field: "id" })
export const User = model<IUser>("user", userSchema);

export async function connectDB() {
    if (dbUrl) {
        await connect(dbUrl);
    }
}