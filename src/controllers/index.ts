import { config } from "dotenv"
import { NextFunction, query, Request, Response } from "express"
import { User, Movie, Review, connectDB } from "@schema/mongoose";
import mongoose, { connect, connection, mongo } from "mongoose"
import { validationResult } from "express-validator";
import { ObjectType } from "typescript";
import bcrypt from "bcrypt"
import { ApiValidationError } from "@error/customErrors";
config();

const DB_URI = (String)(process.env.DB_URL || "DB URI not found") // Assuming that the DB URI is in fact there

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
    let date = new Date().toISOString().replace("/T/", " ").replace(/\..+/, "")

    if (users[0]) {
        user_id += users[0].user_id
    }

    const user = new User({
        _id: doc_id,
        name: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        date_joined: date,
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

// MOVIE

export async function addMovie(req: Request, res: Response, next: NextFunction) {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError();
    }

    await connect(DB_URI);

    const movie = new Movie({
        name: req.body.name,
        genre: req.body.genre,
        maker: req.body.maker,
        cover: req.body.cover,
        date: req.body.date,
        description: req.body.description,
    })

    await movie.save()

    res.status(200).send("Movie created")
}

export async function getMovies(req: Request, res: Response, next: NextFunction) {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError();
    }

    await connect(DB_URI);

    Movie.find({}).then(movies => {
        res.status(200).send(JSON.stringify(movies));
    }).catch(error => {
        res.status(400).send(error)
    })
}

// REVIEW

export async function addReview(req: Request, res: Response, next: NextFunction) {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError();
    }

    await connect(DB_URI);

    let user = await User.findOne({ user_id: Number.parseInt(req.params.id) })
    let movie = await Movie.findOne({ name: req.query.movie })
    console.log(movie)
    if (user && movie) {
        let date = new Date().toISOString().replace("/T/", " ").replace(/\..+/, "")

        const review = new Review({
            body: req.body.body,
            title: req.body.title,
            rating: req.body.rating,
            date: date,
            movie: movie._id,
            user: user._id,
        })

        await review.save()

        res.status(201).send(JSON.stringify(user._id) + JSON.stringify(movie))
    } else {
        res.status(400).send("user could not be found")
    }
}

export async function getReviews(req: Request, res: Response) {
    let result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ApiValidationError();
    }

    await connect(DB_URI);
    let id = Number.parseInt(req.params.id)
    let user = await User.findOne({ user_id: id })
    
    if (user) {
        let reviews = await Review.find({ user: user._id })
        console.log(user)
        res.status(200).send(JSON.stringify(reviews));
    } else {
        res.status(400).send("Could not find user")
    }
}