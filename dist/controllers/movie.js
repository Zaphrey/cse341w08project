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
exports.addMovie = addMovie;
exports.getMovies = getMovies;
exports.getMovie = getMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;
const dotenv_1 = require("dotenv");
const mongoose_1 = require("../schema/mongoose");
const mongoose_2 = require("mongoose");
const validators_1 = require("../routes/validators");
(0, dotenv_1.config)();
const DB_URI = (String)(process.env.DB_URL || "DB URI not found"); // Assuming that the DB URI is in fact there
function addMovie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        const id = new mongoose_2.mongo.ObjectId().toString();
        const movie = new mongoose_1.Movie({
            _id: id,
            name: req.body.name,
            genre: req.body.genre,
            maker: req.body.maker,
            cover: req.body.cover,
            date: req.body.date,
            description: req.body.description,
            rating: req.body.rating,
        });
        movie.save().then(() => {
            res.status(200).send(`Movie created ( ID: ${id} )`);
        });
    });
}
function getMovies(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        mongoose_1.Movie.find({}).then(movies => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(movies));
        }).catch(error => {
            res.status(400).send(error);
        });
    });
}
function getMovie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        let id = req.params.id;
        let filter = { _id: id };
        mongoose_1.Movie.findOne(filter).then(movie => {
            if (movie) {
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(movie);
            }
            else {
                res.status(400).send("Could not find movie");
            }
        }).catch(error => {
            res.status(400).send(error);
        });
    });
}
function updateMovie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        let id = req.params.id;
        let filter = { _id: id };
        let query = {
            name: req.query.name,
            maker: req.query.maker,
            genre: req.query.genre,
            cover: req.query.cover,
            date: req.query.date,
            description: req.query.description,
            rating: req.query.rating,
        };
        // Check if movie exists first
        if (!(yield mongoose_1.Movie.findOne(filter))) {
            res.status(200).send("Could not find movie");
            return;
        }
        mongoose_1.Movie.updateOne(filter, query).then(movie => {
            res.status(200).send("Movie updated successfully");
        }).catch(error => {
            res.status(400).send(error);
        });
    });
}
function deleteMovie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        let id = req.params.id;
        let filter = { _id: id };
        if (!(yield mongoose_1.Movie.findOne(filter))) {
            res.status(200).send("Could not find movie");
            return;
        }
        mongoose_1.Movie.deleteOne(filter).then(() => {
            res.status(200).send("Movie successfully deleted");
        }).catch(error => {
            res.status(400).send(error);
        });
    });
}
