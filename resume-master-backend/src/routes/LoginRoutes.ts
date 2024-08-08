import express from 'express'
import { LoginUser, registerUser } from '../controllers/LoginController';

const loginRoutes = express.Router();

loginRoutes.post("/register", registerUser);
loginRoutes.post("/login", LoginUser);

export default loginRoutes;