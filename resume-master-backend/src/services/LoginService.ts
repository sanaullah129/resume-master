import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const isUserAvailable = async (emailId: string) => {
  const user = await prisma.user.findFirst({
    where: { emailId: emailId },
  });

  return user ? true : false;
};

export const createUser = async (
  emailId: string,
  username: string,
  password: string
) => {
  const createUser = await prisma.user.create({
    data: {
      emailId: emailId,
      username: username,
      password: password,
    },
  });
  return createUser;
};

export const findUserByUsername = async (username: string): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: { username: username },
  });
  
  return user!;
};
