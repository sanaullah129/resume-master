import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const isUserAvailableCheck = async (username: string, emailId: string) => {
    const user = await prisma.userDetails.findFirst({
        where: {
            OR: [
                { username: username },
                { emailId: emailId }
            ]
        }
    });

    return user;
};

export const createUser = async (username: string, emailId: string, password: string) => {
    const newUser = await prisma.userDetails.create({
        data: {
            username: username, emailId: emailId, password: password
        }
    });

    return newUser;
}

export const generateToken = async (jwtSecret: string, username: string, password: string, id: string): Promise<string> => {

    var token: string = "";

    if (jwtSecret) {
        token = jwt.sign(
            {
                username: username,
                password: password,
                id: id,
            },
            jwtSecret,
            { expiresIn: "1d" }
        );
    }
    return token;
}