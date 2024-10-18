import { config } from "dotenv"
import { Request, Response } from "express"
import { User, connectDB } from "@schema/mongoose";

config();
connectDB();

export async function addUser(req: Request, res: Response) {
    // Assume all parameters exist, then check
    let username = req.query.username
    let password = req.query.password
    let email = req.query.email

    if (username && password && email && process.env.DB_URL) {
        let user_id = 1
        let users = await User.find({}).sort({ "user_id": -1 })

        if (users[0]) {
            user_id += users[0].user_id
        }

        const user = new User({
            name: username,
            password: password,
            email: email,
            date_joined: new Date(),
            user_id: user_id,
        })

        res.setHeader("Content-Type", "application/json");
        res.status(201).send(`Created user: ${user_id}`);
    } else {
        res.status(400).send("Uh oh!")
    }
}

export async function getUsers(req: Request, res: Response) {
    if (process.env.DB_URL) {
        let users = await (User.find().limit(10));

        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(users))
    } else {
        res.status(400).send()
    }
}

export async function getUser(req: Request, res: Response) {
    let id = req.params.id
    console.log(id)
    if (id && process.env.DB_URL) {
        let user = await User.find({ "user_id": id })

        if (user[0]) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(user[0]));
        } else {
            res.status(400).send("Could not find user.");
        }
    } else {
        res.status(400).send("No user id provided.");
    }
}