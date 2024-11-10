"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const validators_1 = require("./validators");
require("express-async-errors");
const errorProcessing_1 = require("../errors/errorProcessing");
const movie_1 = require("../controllers/movie");
const review_1 = require("../controllers/review");
const auth_1 = require("../controllers/auth");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const swaggerDocument = require("../swagger-output.json");
const defaultRouter = (0, express_1.Router)();
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    throw new Error("Could not retrieve client id or secret");
}
defaultRouter.use((0, express_session_1.default)({ secret: process.env.CLIENT_SECRET }));
defaultRouter.use("/", errorProcessing_1.userValidationError);
defaultRouter.use(passport_1.default.initialize());
defaultRouter.use(passport_1.default.session());
// Authorization
defaultRouter.get("/", auth_1.home);
defaultRouter.get("/auth", passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
defaultRouter.get("/auth/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/",
}));
defaultRouter.get("/auth/failure");
defaultRouter.get("/logout", auth_1.logout);
// Doc routes
defaultRouter.use("/api-docs", swagger_ui_express_1.default.serve);
defaultRouter.get("/api-docs", swagger_ui_express_1.default.setup(swaggerDocument));
// User routes
// defaultRouter.post("/user", createUserRules(), addUser); DEPRECATED // USE AUTH ROUTE INSTEAD
defaultRouter.get("/user", index_1.getUsers);
defaultRouter.get("/user/:id", (0, validators_1.getUserRules)(), index_1.getUser);
defaultRouter.put("/user/:id", (0, validators_1.updateUserRules)(), auth_1.isLoggedIn, index_1.updateUser);
defaultRouter.delete("/user/:id", (0, validators_1.deleteUserRules)(), auth_1.isLoggedIn, index_1.deleteUser);
// Review routes
defaultRouter.post("/user/:id/reviews", (0, validators_1.addReviewRules)(), auth_1.isLoggedIn, review_1.addReview);
defaultRouter.get("/user/:id/reviews", (0, validators_1.getUserReviewsRules)(), review_1.getUserReviews);
defaultRouter.put("/user/:id/reviews", (0, validators_1.updateReviewRules)(), auth_1.isLoggedIn, review_1.updateReview);
defaultRouter.delete("/user/:id/reviews", (0, validators_1.deleteReviewRules)(), auth_1.isLoggedIn, review_1.deleteReview);
// Movie routes
// These are more intended for admins, but I'm not sure how to implement stuff like that yet.
defaultRouter.post("/movies", (0, validators_1.addMovieRules)(), auth_1.isLoggedIn, movie_1.addMovie);
defaultRouter.get("/movies", movie_1.getMovies);
defaultRouter.get("/movies/:id", (0, validators_1.getMovieRules)(), movie_1.getMovie);
defaultRouter.put("/movies/:id", (0, validators_1.updateMovieRules)(), auth_1.isLoggedIn, movie_1.updateMovie);
defaultRouter.delete("/movies/:id", (0, validators_1.deleteReviewRules)(), auth_1.isLoggedIn, movie_1.deleteMovie);
defaultRouter.get("/movies/:id/reviews", (0, validators_1.getMovieReviewsRules)(), review_1.getMovieReviews);
// This route is just intended to clear up excess documents
// defaultRouter.delete("/user", deleteAllUsers)
exports.default = defaultRouter;
