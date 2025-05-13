import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
   const { email, password } = req.body;
   try {
      if (password.length < 6) {
         return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      const user = await User.findOne({ email });
      if (user) {
         return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
         email: email,
         password: hashedPassword,
      });
      if (newUser) {
         generateToken(newUser._id, res);
         await newUser.save();
         res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
         });
         console.log("User created successfully");
      } else {
         res.status(400).json({ message: "Invalid User data" });
      }

   } catch (err) {
      console.error(`Error in signup controller ` + err);
      res.status(500).json({ message: "Server error" });
   }

}
export const login = async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: "User not found" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
         return res.status(400).json({ message: "Invalid credentials" });
      } else {
         generateToken(user._id, res);
         res.status(200).json({
            _id: user._id,
            email: user.email,
         });
      }
   } catch (err) {
      console.error(`Error in login controller ` + err);
      res.status(500).json({ message: "Server error" });
   }
}
export const logout = (req, res) => {
   try {
      res.cookie("jwtKey", "", {
         maxAge: 0,
         httpOnly: true,
         sameSite: 'strict',
         secure: process.env.NODE_ENV === 'production',
         path: '/',
      });
      res.status(200).json({ message: "Logged out successfully" });
   } catch (err) {
      console.error(`Error in logout controller ` + err);
      res.status(500).json({ message: "Server error" });
   }
}

export const checkAuth = (req, res) => {
   try {
      res.status(200).json(req.user);
   } catch (err) {
      console.error(`Error in checkAuth controller ` + err);
      res.status(500).json({ message: "Server error" });
   }
}