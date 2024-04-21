import User from "../models/user.model";
import { Request, Response } from "express";

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
  res: Response
) => {
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }
};

export const validateUserDoesNotExist = async (userName: string, res:Response) => {
  const user = await User.findOne({ userName });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
};

export const generateProfilePic = (userName: string, gender: string) => {
  const baseUrl = "https://avatar.iran.liara.run/public";
  return `${baseUrl}/${
    gender === "male" ? "boy" : "girl"
  }?username=${userName}`;
};
