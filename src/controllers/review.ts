import { config } from "dotenv"
import { NextFunction, Request, Response } from "express"
import { User, Movie, Review, connectDB } from "@schema/mongoose";
import { connect } from "mongoose"
import { validationResult } from "express-validator";
import { ApiValidationError } from "@error/customErrors";
import { verifyAPIData } from "@routes/validators";
config();

const DB_URI = (String)(process.env.DB_URL || "DB URI not found") // Assuming that the DB URI is in fact there

export async function addReview(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);

    let user = await User.findById(req.params.id)
    let movie = await Movie.findById(req.query.movie_id)

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

        res.status(201).send(`Posted review. ( ID: ${review._id} )`)
    } else {
        res.status(400).send("user could not be found")
    }
}

export async function updateReview(req: Request, res: Response) {
    verifyAPIData(req);
    
    await connect(DB_URI);

    if (!await Movie.findById(req.params.id)) {
        res.status(200).send("Could not find movie")
        return
    }

    Movie.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).send("Movie successfully deleted")
    }).catch(error => {
        res.status(400).send(error)
    })
}

export async function deleteReview(req: Request, res: Response) {
    verifyAPIData(req);

    await connect(DB_URI);

    let query = {
        title: req.query.title,
        body: req.query.body,
        rating: req.query.rating
    }

    Movie.findByIdAndUpdate(req.params.id, query).then(movie => {
        res.status(200).send("Review updated successfully")
    }).catch(error => {
        res.status(400).send(error) 
    })
}

export async function getUserReviews(req: Request, res: Response) {
    verifyAPIData(req);

    await connect(DB_URI);

    let user = await User.findById(req.params.id)
    
    if (user) {
        let reviews = await Review.find({ user: user._id });

        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(reviews));
    } else {
        res.status(400).send("Could not find user")
    }
}

export async function getMovieReviews(req: Request, res: Response) {
    verifyAPIData(req);

    await connect(DB_URI);

    let movie = await Movie.findById(req.params.id)
    
    if (movie) {
        let reviews = await Review.find({ movie: req.params.id });

        res.setHeader("Content-Type", "application/json");
        res.status(200).send(reviews)
    } else {
        res.status(400).send("Could not find movie ")
    }
}