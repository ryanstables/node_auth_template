import express from "express";
import { register } from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/failed',
}));

router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/logged-out');
  });
});

// router.get('/google', passport.authenticate('google', {
//   scope: ["profile", "email"]
// }));

// router.get('/facebook', passport.authenticate('facebook', { 
//   scope: ["email"]
// }));

export default router;
