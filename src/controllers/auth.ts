import { connectDB, User } from "@schema/mongoose";
import axios, { Axios } from "axios";
import { config } from "dotenv"
import { NextFunction, Request, Response } from "express"
import { header } from "express-validator";
import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

config();

if (process.env.CLIENT_ID === undefined || process.env.CLIENT_SECRET === undefined) {
    throw new Error("Could not retrieve client id or client secret");
} else {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/callback"
    },
    function(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, profile: Profile) => void) {
        console.log(profile)
        connectDB().then(() => {
            User.findOne({ googleId: profile.id }).then(user => {
                if (!user && profile.emails) {
                    new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        date_joined: Date.now(),
                        googleId: profile.id,
                    }).save().then(user => {
                        console.log(`New user created: ${JSON.stringify(user)}`);
                    })
                }
            })
        })
        done(null, profile)
    }));
}

passport.serializeUser((user: Express.User, done: (err: any, id?: any) => void) => {
    done(null, user)
})

passport.deserializeUser((user: Express.User, done: (err: any, id?: any) => void) => {
    done(null, user)
})

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    req.user ? next() : res.sendStatus(401);
}

export function home(req: Request, res: Response, next: NextFunction) {
    // res.setHeader("Content-Type", "application/html")
    res.status(200).send("<a href='/auth'>Authenticate with google</a>")
}

export function auth(req: Request, res: Response, next: NextFunction) {
    res.status(200)
}

export async function authCallback(req: Request, res: Response, next: NextFunction) {
    
}

export function authFailure(req: Request, res: Response, next: NextFunction) {
    res.status(401).send("Failed to authenticate user.")
}

export function logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
        if (err) { next(err) }
    });

    res.clearCookie("connect.sid")
    res.redirect("/");
}