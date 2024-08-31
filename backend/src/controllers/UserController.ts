import { Request, Response } from "express";
import { createUser, generateToken, isUserAvailableCheck } from "../services/UserService";
import bcrypt from 'bcrypt';
import { errorLogService } from "../services/CommonService";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, emailId, password } = req.body;
        if (!username || !emailId || !password) {
            return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
        }

        const existingUser = await isUserAvailableCheck(username, emailId);

        if (existingUser) {
            return res.status(404).json({ statusId: 3, status: "User already exists with current username or emailId" });
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);

        const newUser = await createUser(username, emailId, hashedPassword);

        if (newUser) {
            return res.status(200).json({ statusId: 1, status: "User Created Successfully" });
        }
        else {
            return res.status(200).json({ statusId: 4, status: "Some error occured while creating user" });
        }
    } catch (error: any) {
        console.log(error);
        errorLogService("Register Route", error.toString());
        return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
        }

        const existingUser = await isUserAvailableCheck(username, username);
        var isPasswordCorrect: boolean = false;

        if (!existingUser) {
            return res.status(404).json({ statusId: 1, status: "No User with this username found" });
        } else {
            isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        }

        if (existingUser && isPasswordCorrect) {
            const jwtSecret = process.env.JWT_TOKEN as string;

            const token = await generateToken(jwtSecret, existingUser.username, existingUser.password, existingUser.id);

            return res.status(200).json({ token: token });

        }
        else {
            return res.status(401).json({ statusId: 2, status: "Invalid Username and Password Combination" });
        }
    } catch (error: any) {
        console.log(error);
        errorLogService("Login Route", error.toString());
        return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
    }
}