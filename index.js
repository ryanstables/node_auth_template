import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import utilityRoutes from "./routes/utility.js";
import { initPassport } from "./utils/initPassport.js";

/**
 * Init and set vars...
**/
const PORT = process.env.PORT || 5050;
const app = express();

/**
 * Configure stuff...
**/
initPassport(app);
app.use(express.json());

/**
 * Setup Router...
**/
app.use(utilityRoutes);
app.use(authRoutes);
// -----------------------------
//
// ...use express router to add your other routes here
//
// -----------------------------


/**
 * Connect to server/db...
**/
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch(err => {
  console.error(`Couldn't connect to DB ${err}`);
});
