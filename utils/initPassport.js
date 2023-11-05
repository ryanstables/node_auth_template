import "dotenv/config";
import passport from "passport";
import session from "express-session";
import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
import { google_config, facebook_config } from "./passportConfig.js";
import LocalStrategy from "passport-local";
import crypto from 'crypto';
import User from '../models/User.js';
import { ALGORITHM, ITERATIONS, KEYLEN } from '../config/constants.js';

export const initPassport = (app) => {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const { salt, hash } = user.password;
      crypto.pbkdf2(password, salt, ITERATIONS, KEYLEN, ALGORITHM, async (err, derivedHash) => {
        if (err) {
          return done(err);
        }
        if (hash === derivedHash.toString('hex')) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect username of password.' });
        }
      });
    } catch (err) {
      return done(err);
    }
}));

// Serialize user into the sessions
passport.serializeUser((user, cb) => cb(null, { username: user.username }));

// Deserialize user from the sessions
passport.deserializeUser((user, cb) => cb(null, user));


/*
passport.use(
  new FacebookStrategy(
    facebook_config,
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, formatFacebook(profile._json));
    }
  )
);

passport.use(
  new GoogleStrategy(
    google_config,
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, formatGoogle(profile._json));
    }
  )
);


const formatGoogle = (profile) => {
  return {
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email
  };
};

const formatFacebook = (profile) => {
  return {
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email
  };
};

*/