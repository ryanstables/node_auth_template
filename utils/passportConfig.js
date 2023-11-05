import "dotenv/config";

export const facebook_config = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/user/login/facebook/callback",
  enableProof: true,
  profileFields: ['id', 'emails', 'name']
};

export const google_config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/user/login/google/callback"
};