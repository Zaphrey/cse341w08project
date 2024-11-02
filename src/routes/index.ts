import { addUser, getUsers, getUser, updateUser, deleteUser, deleteAllUsers } from "@controllers/index";
import { NextFunction, Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
import { getUserRules, createUserRules, updateUserRules, deleteUserRules, getUserReviewsRules, addReviewRules, updateReviewRules, deleteReviewRules, addMovieRules, getMovieRules, updateMovieRules, getMovieReviewsRules } from "./validators";
require("express-async-errors")
import { userValidationError } from "@error/errorProcessing";
import { addMovie, deleteMovie, getMovie, getMovies, updateMovie } from "@controllers/movie";
import { addReview, deleteReview, getMovieReviews, getUserReviews, updateReview } from "@controllers/review";

const swaggerDocument = require("../swagger-output.json")
const defaultRouter = Router()

// Doc routes

defaultRouter.use("/api-docs", swaggerUi.serve);
defaultRouter.get("/api-docs", swaggerUi.setup(swaggerDocument))

// User routes

defaultRouter.post("/user", createUserRules(), addUser);
defaultRouter.get("/user", getUsers);
defaultRouter.get("/user/:id", getUserRules(), getUser);
defaultRouter.put("/user/:id", updateUserRules(), updateUser);
defaultRouter.delete("/user/:id", deleteUserRules(), deleteUser);

// Review routes

defaultRouter.post("/user/:id/reviews", addReviewRules(), addReview);
defaultRouter.get("/user/:id/reviews", getUserReviewsRules(), getUserReviews);
defaultRouter.put("/user/:id/reviews", updateReviewRules(), updateReview);
defaultRouter.delete("/user/:id/reviews", deleteReviewRules(), deleteReview);

// Movie routes

defaultRouter.post("/movies", addMovieRules(), addMovie);
defaultRouter.get("/movies", getMovies);
defaultRouter.get("/movies/:id", getMovieRules(), getMovie);
defaultRouter.put("/movies/:id", updateMovieRules(), updateMovie);
defaultRouter.delete("/movies/:id", deleteReviewRules(), deleteMovie);
defaultRouter.get("/movies/:id/reviews", getMovieReviewsRules(), getMovieReviews);

// This route is just intended to clear up excess documents
// defaultRouter.delete("/user", deleteAllUsers)

// Validation route
defaultRouter.use("/", userValidationError);

export default defaultRouter;

