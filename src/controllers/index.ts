import { config } from "dotenv"
import { NextFunction, Request, Response } from "express"
import { User, Movie, Review, connectDB } from "@schema/mongoose";
import { connect, connection, mongo } from "mongoose"
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"
import { ApiValidationError } from "@error/customErrors";
import { verifyAPIData } from "@routes/validators";
config();

const DB_URI = (String)(process.env.DB_URL || "DB URI not found") // Assuming that the DB URI is in fact there

export async function addUser(req: Request, res: Response, next: NextFunction) {
    // Assume all parameters exist, then check
    verifyAPIData(req);

    await connect(DB_URI);
    
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let date = new Date().toISOString().replace("/T/", " ").replace(/\..+/, "")

    const user = new User({
        name: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        date_joined: date,
    })

    await user.save();
    connection.close();

    res.setHeader("Content-Type", "text/html");
    res.status(201).send(`Created user ${user._id}`);
}

// Get

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    await connect(DB_URI);

    let users = await (User.find());

    connection.close();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(users)
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);

    User.findOne({ _id: req.params.id })
        .then(user => {
            if (user) {
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(JSON.stringify(user));
            } else {
                res.status(400).send("Could not find user")
            }
        })
        .catch(error => {
            res.status(422).send(error);
        })
}

// Update

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    let password = req.query.password?.toString()

    if (password) {
        password = await bcrypt.hash(password, 10)
    }

    let update = {
        name: req.query.username?.toString(),
        password: password,
        email: req.query.email?.toString()
    };

    User.findByIdAndUpdate(req.params.id, update)
    .then(user => {
        if (user) {
            res.status(201).send(`Successfully updated user`)
        } else {
            res.status(400).send(`Could not update user`)
        }
    })
    .catch(error => {
        res.status(400).send(error)
    })
}

// Delete 

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);

    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (user) {
                res.status(204).send();
            } else {
                res.status(400).send("Could not find user");
            }
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

export async function deleteAllUsers(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);

    User.deleteMany({ user_id: { $gt: 0 } })
        .then(query => {
            res.status(204).send();
        })
        .catch(error => {
            res.status(422).send()
        })
}