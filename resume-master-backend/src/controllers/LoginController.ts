import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createUser,
  findUserByUsername,
  isUserAvailable,
} from "../services/LoginService";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, emailId, password } = req.body;
    if (username || emailId || password)
      return res
        .status(400)
        .json({ statusId: 2, status: "Please fill all the details" });

    const isUserExists = await isUserAvailable(emailId as string);

    if (isUserExists) {
      return res
        .status(400)
        .json({ statusId: 3, status: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 20);

    const newUser = await createUser(emailId, username, hashedPassword);

    if (newUser)
      return res
        .status(200)
        .json({ statusId: 1, status: "User Created Successfully." });
    else
      return res
        .status(500)
        .json({ statusId: 0, status: "Error Occured while creating user" });
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      error_message: error.toString(),
    });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ statusId: 1, status: "Please enter all details" });

    const existingUser = await findUserByUsername(username);
    let isPasswordCorrect: boolean = false;
    if (existingUser) {
      isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser?.password
      );
    }

    if (existingUser && isPasswordCorrect) {
      const jwtSecret = process.env.JWT_SECRET as string;
      if (jwtSecret) {
        const token: string = jwt.sign(
          {
            username: existingUser?.username,
            emailId: existingUser?.emailId,
            password: existingUser?.password,
          },
          jwtSecret,
          { expiresIn: "1d" }
        );
        return res.status(200).json({ token: token });
      }
    } else {
      return res.status(400).json({ statusId: 2, status: "Invalid Username and Password Combination" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error", error_message: error.toString() });
  }
};
