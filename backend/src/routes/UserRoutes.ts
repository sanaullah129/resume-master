import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";


const userRoutes = Router();

userRoutes.post("/sign-up", registerUser);
userRoutes.post("/login", loginUser)

export default userRoutes;