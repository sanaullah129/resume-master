import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isUserAvailableCheck = async (username: string, emailId: string) => {
    const user = await prisma.userDetials.findFirst({
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
    const newUser = await prisma.userDetials.create({
        data: {
            username: username, emailId: emailId, password: password
        }
    });
    
    return newUser;
}