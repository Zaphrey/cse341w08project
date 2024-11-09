import { addUser, getUsers, getUser, updateUser, deleteUser, deleteAllUsers } from "@controllers/index";
import { NextFunction, Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
import { getUserRules, createUserRules, updateUserRules, deleteUserRules, getUserReviewsRules, addReviewRules, updateReviewRules, deleteReviewRules, addMovieRules, getMovieRules, updateMovieRules, getMovieReviewsRules } from "./validators";
require("express-async-errors")
import { userValidationError } from "@error/errorProcessing";
import { addMovie, deleteMovie, getMovie, getMovies, updateMovie } from "@controllers/movie";
import { addReview, deleteReview, getMovieReviews, getUserReviews, updateReview } from "@controllers/review";
import { auth, authCallback, home, isLoggedIn, logout } from "@controllers/auth";
import passport from "passport";
import session from "express-session";
import { config } from "dotenv";

config();

const swaggerDocument = require("../swagger-output.json")
const defaultRouter = Router()

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    throw new Error("Could not retrieve client id or secret")
}

defaultRouter.use(session({ secret: process.env.CLIENT_SECRET }));
defaultRouter.use("/", userValidationError);
defaultRouter.use(passport.initialize());
defaultRouter.use(passport.session());

// Authorization
defaultRouter.get("/", home)
defaultRouter.get("/auth", passport.authenticate("google", { scope: ["email", "profile"]}));
defaultRouter.get("/auth/callback", passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/",
}));
defaultRouter.get("/auth/failure");
defaultRouter.get("/logout", logout);

// Doc routes

defaultRouter.use("/api-docs", swaggerUi.serve);
defaultRouter.get("/api-docs", swaggerUi.setup(swaggerDocument))

// User routes

// defaultRouter.post("/user", createUserRules(), addUser); DEPRECATED // USE AUTH ROUTE INSTEAD
defaultRouter.get("/user", getUsers);
defaultRouter.get("/user/:id", getUserRules(), getUser);
defaultRouter.put("/user/:id", updateUserRules(), isLoggedIn, updateUser);
defaultRouter.delete("/user/:id", deleteUserRules(), isLoggedIn, deleteUser);

// Review routes

defaultRouter.post("/user/:id/reviews", addReviewRules(), isLoggedIn, addReview);
defaultRouter.get("/user/:id/reviews", getUserReviewsRules(), getUserReviews);
defaultRouter.put("/user/:id/reviews", updateReviewRules(), isLoggedIn, updateReview);
defaultRouter.delete("/user/:id/reviews", deleteReviewRules(), isLoggedIn, deleteReview);

// Movie routes
// These are more intended for admins, but I'm not sure how to implement stuff like that yet.
defaultRouter.post("/movies", addMovieRules(), isLoggedIn, addMovie);
defaultRouter.get("/movies", getMovies);
defaultRouter.get("/movies/:id", getMovieRules(), getMovie);
defaultRouter.put("/movies/:id", updateMovieRules(), isLoggedIn, updateMovie);
defaultRouter.delete("/movies/:id", deleteReviewRules(), isLoggedIn, deleteMovie);
defaultRouter.get("/movies/:id/reviews", getMovieReviewsRules(), getMovieReviews);

// This route is just intended to clear up excess documents
// defaultRouter.delete("/user", deleteAllUsers)

export default defaultRouter;

