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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = isLoggedIn;
exports.home = home;
exports.auth = auth;
exports.authCallback = authCallback;
exports.authFailure = authFailure;
exports.logout = logout;
const mongoose_1 = require("../schema/mongoose");
const dotenv_1 = require("dotenv");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
(0, dotenv_1.config)();
if (process.env.CLIENT_ID === undefined || process.env.CLIENT_SECRET === undefined) {
    throw new Error("Could not retrieve client id or client secret");
}
else {
    passport_1.default.use(new passport_google_oauth2_1.Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://cse341w08project.onrender.com"
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        (0, mongoose_1.connectDB)().then(() => {
            mongoose_1.User.findOne({ googleId: profile.id }).then(user => {
                if (!user && profile.emails) {
                    new mongoose_1.User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        date_joined: Date.now(),
                        googleId: profile.id,
                    }).save().then(user => {
                        console.log(`New user created: ${JSON.stringify(user)}`);
                    });
                }
            });
        });
        done(null, profile);
    }));
}
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
function home(req, res, next) {
    // res.setHeader("Content-Type", "application/html")
    res.status(200).send("<a href='/auth'>Authenticate with google</a>");
}
function auth(req, res, next) {
    res.status(200);
}
function authCallback(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function authFailure(req, res, next) {
    res.status(401).send("Failed to authenticate user.");
}
function logout(req, res, next) {
    req.logout((err) => {
        if (err) {
            next(err);
        }
    });
    res.clearCookie("connect.sid");
    res.redirect("/");
}
