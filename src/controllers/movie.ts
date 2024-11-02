import { config } from "dotenv"
import { NextFunction, Request, Response } from "express"
import { User, Movie, Review, connectDB } from "@schema/mongoose";
import { connect, mongo } from "mongoose"
import { validationResult } from "express-validator";
import { ApiValidationError } from "@error/customErrors";
import { verifyAPIData } from "@routes/validators";
config();

const DB_URI = (String)(process.env.DB_URL || "DB URI not found") // Assuming that the DB URI is in fact there

export async function addMovie(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);

    const id = new mongo.ObjectId().toString()

    const movie = new Movie({
        _id: id,
        name: req.body.name,
        genre: req.body.genre,
        maker: req.body.maker,
        cover: req.body.cover,
        date: req.body.date,
        description: req.body.description,
        rating: req.body.rating,
    })

    movie.save().then(() => {
        res.status(200).send(`Movie created ( ID: ${id} )`)
    })
}

export async function getMovies(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);

    Movie.find({}).then(movies => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(movies));
    }).catch(error => {
        res.status(400).send(error)
    })
}

export async function getMovie(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);

    let id = req.params.id
    let filter = { _id: id }

    Movie.findOne(filter).then(movie => {
        if (movie) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(movie)
        } else {
            res.status(400).send("Could not find movie")
        }
    }).catch(error => {
        res.status(400).send(error)
    })
}

export async function updateMovie(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);
    
    let id = req.params.id
    let filter = { _id: id }

    let query = {
        name: req.query.name,
        maker: req.query.maker,
        genre: req.query.genre,
        cover: req.query.cover,
        date: req.query.date,
        description: req.query.description,
        rating: req.query.rating,
    }

    // Check if movie exists first
    if (!await Movie.findOne(filter)) {
        res.status(200).send("Could not find movie")
        return
    }
    
    Movie.updateOne(filter, query).then(movie => {
        res.status(200).send("Movie updated successfully")
    }).catch(error => {
        res.status(400).send(error) 
    })
}

export async function deleteMovie(req: Request, res: Response, next: NextFunction) {
    verifyAPIData(req);

    await connect(DB_URI);

    let id = req.params.id
    let filter = { _id: id }

    if (!await Movie.findOne(filter)) {
        res.status(200).send("Could not find movie")
        return
    }

    Movie.deleteOne(filter).then(() => {
        res.status(200).send("Movie successfully deleted")
    }).catch(error => {
        res.status(400).send(error)
    })
}
