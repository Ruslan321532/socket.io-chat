import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken";
import {
  generateProfilePic,
  validatePasswordMatch,
  validateUserDoesNotExist,
} from "../utils/validation.auth";
export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user || !(await bcrypt.compare(password, user.password || ""))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullName, userName, gender, password, confirmPassword } = req.body;

    validatePasswordMatch(password, confirmPassword, res);
    await validateUserDoesNotExist(userName, res);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const profilePic = generateProfilePic(userName, gender);

    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.userName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
