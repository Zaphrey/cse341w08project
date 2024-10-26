import { config } from "dotenv"
import { NextFunction, Request, Response } from "express"
import { User, connectDB } from "@schema/mongoose";
import mongoose, { connect, connection, mongo } from "mongoose"
import { validationResult } from "express-validator";
import { ObjectType } from "typescript";
import bcrypt from "bcrypt"
import { ApiValidationError } from "@error/customErrors";
config();

const DB_URI = (String)(process.env.DB_URL || "") // Assuming that the DB URI is in fact there

//Create 

type IUserData = {
    name: string | undefined,
    password: string | undefined,
    email: string | undefined,
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
    // Assume all parameters exist, then check
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError(`${JSON.stringify(result, null, 4)}`)
    }

    await connect(DB_URI);

    let doc_id = new mongo.ObjectId().toString();
    let user_id = 1;

    let users = await User.find({}).sort({ "user_id": -1 });
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (users[0]) {
        user_id += users[0].user_id
    }

    const user = new User({
        _id: doc_id,
        name: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        date_joined: new Date().toISOString().replace("/T/", " ").replace(/\..+/, ""),
        user_id: user_id,
    })

    await user.save();
    connection.close();

    res.setHeader("Content-Type", "text/html");
    res.status(201).send(`Created user ${user_id}, ${doc_id}`);
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
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError(`${JSON.stringify(result, null, 4)}`)
    }

    await connect(DB_URI);

    User.findOne({ user_id: Number.parseInt(req.params.id) })
        .then(user => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(user));
        })
        .catch(error => {
            res.status(422).send(error);
        })
}

// Update

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError(`${JSON.stringify(result, null, 4)}`)
    }

    let query = req.query;
    let filter = { user_id: Number.parseInt(req.params.id) };
    // let userData = await User.findOne(filter);
    let password = query.password?.toString()

    if (password) {
        password = await bcrypt.hash(password, 10)
    }

    let update: IUserData = {
        name: query.username?.toString(),
        password: password,
        email: query.email?.toString()
    };

    User.findOneAndUpdate(filter, update)
        .then(() => {
            res.status(201).send("Successfully updated user")
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

// Delete 

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError(`${JSON.stringify(result, null, 4)}`)
    }

    let id = Number.parseInt(req.params.id);
    let filter = { user_id: id };

    await connect(DB_URI);

    User.findOneAndDelete(filter)
        .then(() => {
            res.status(204).send();
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

export async function deleteAllUsers(req: Request, res: Response, next: NextFunction) {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError(`${JSON.stringify(result, null, 4)}`)
    }

    await connect(DB_URI);

    User.deleteMany({ user_id: { $gt: 0 } })
        .then(query => {
            res.status(204).send();
        })
        .catch(error => {
            res.status(422).send()
        })
}