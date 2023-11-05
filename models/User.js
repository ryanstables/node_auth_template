import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 250,
      unique: true,
    },
    password: {
      salt: {
        type: String,
        required: true,
        min: 64,
        unique: false,
      },
      hash: {
        type: String,
        required: true,
        min: 64,
        unique: false,
      },
      email: {
        type: String,
        required: false,
        unique: false,
      },  
    },
    // -----------------------------------
    //
    // Add other user properties here...
    //
    // -----------------------------------
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
