import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         minlength: 6,
      },
      meter1: {
         type: String,
      },
      meter2: {
         type: String,
      },
      meter3: {
         type: String,
      },
      meter4: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
)
const User = mongoose.model("User", userSchema);

export default User;