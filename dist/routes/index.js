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
const swaggerDocument = require("../swagger-output.json");
const defaultRouter = (0, express_1.Router)();
// Doc routes
defaultRouter.use("/api-docs", swagger_ui_express_1.default.serve);
defaultRouter.get("/api-docs", swagger_ui_express_1.default.setup(swaggerDocument));
// User routes
defaultRouter.post("/user", (0, validators_1.createUserRules)(), index_1.addUser);
defaultRouter.get("/user", index_1.getUsers);
defaultRouter.get("/user/:id", (0, validators_1.getUserRules)(), index_1.getUser);
defaultRouter.put("/user/:id", (0, validators_1.updateUserRules)(), index_1.updateUser);
defaultRouter.delete("/user/:id", (0, validators_1.deleteUserRules)(), index_1.deleteUser);
// Review routes
defaultRouter.post("/user/:id/reviews", (0, validators_1.addReviewRules)(), review_1.addReview);
defaultRouter.get("/user/:id/reviews", (0, validators_1.getUserReviewsRules)(), review_1.getUserReviews);
defaultRouter.put("/user/:id/reviews", (0, validators_1.updateReviewRules)(), review_1.updateReview);
defaultRouter.delete("/user/:id/reviews", (0, validators_1.deleteReviewRules)(), review_1.deleteReview);
// Movie routes
defaultRouter.post("/movies", (0, validators_1.addMovieRules)(), movie_1.addMovie);
defaultRouter.get("/movies", movie_1.getMovies);
defaultRouter.get("/movies/:id", (0, validators_1.getMovieRules)(), movie_1.getMovie);
defaultRouter.put("/movies/:id", (0, validators_1.updateMovieRules)(), movie_1.updateMovie);
defaultRouter.delete("/movies/:id", (0, validators_1.deleteReviewRules)(), movie_1.deleteMovie);
defaultRouter.get("/movies/:id/reviews", (0, validators_1.getMovieReviewsRules)(), review_1.getMovieReviews);
// This route is just intended to clear up excess documents
// defaultRouter.delete("/user", deleteAllUsers)
// Validation route
defaultRouter.use("/", errorProcessing_1.userValidationError);
exports.default = defaultRouter;
