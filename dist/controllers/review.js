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
exports.addReview = addReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
exports.getUserReviews = getUserReviews;
exports.getMovieReviews = getMovieReviews;
const dotenv_1 = require("dotenv");
const mongoose_1 = require("../schema/mongoose");
const mongoose_2 = require("mongoose");
const validators_1 = require("../routes/validators");
(0, dotenv_1.config)();
const DB_URI = (String)(process.env.DB_URL || "DB URI not found"); // Assuming that the DB URI is in fact there
function addReview(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        let user = yield mongoose_1.User.findById(req.params.id);
        let movie = yield mongoose_1.Movie.findById(req.query.movie_id);
        if (user && movie) {
            let date = new Date().toISOString().replace("/T/", " ").replace(/\..+/, "");
            const review = new mongoose_1.Review({
                body: req.body.body,
                title: req.body.title,
                rating: req.body.rating,
                date: date,
                movie: movie._id,
                user: user._id,
            });
            yield review.save();
            res.status(201).send(`Posted review. ( ID: ${review._id} )`);
        }
        else {
            res.status(400).send("user could not be found");
        }
    });
}
function updateReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        if (!(yield mongoose_1.Movie.findById(req.params.id))) {
            res.status(200).send("Could not find movie");
            return;
        }
        mongoose_1.Movie.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).send("Movie successfully deleted");
        }).catch(error => {
            res.status(400).send(error);
        });
    });
}
function deleteReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        let query = {
            title: req.query.title,
            body: req.query.body,
            rating: req.query.rating
        };
        mongoose_1.Movie.findByIdAndUpdate(req.params.id, query).then(movie => {
            res.status(200).send("Review updated successfully");
        }).catch(error => {
            res.status(400).send(error);
        });
    });
}
function getUserReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        let user = yield mongoose_1.User.findById(req.params.id);
        if (user) {
            let reviews = yield mongoose_1.Review.find({ user: user._id });
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(reviews));
        }
        else {
            res.status(400).send("Could not find user");
        }
    });
}
function getMovieReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, validators_1.verifyAPIData)(req);
        yield (0, mongoose_2.connect)(DB_URI);
        let movie = yield mongoose_1.Movie.findById(req.params.id);
        if (movie) {
            let reviews = yield mongoose_1.Review.find({ movie: req.params.id });
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(reviews);
        }
        else {
            res.status(400).send("Could not find movie ");
        }
    });
}
