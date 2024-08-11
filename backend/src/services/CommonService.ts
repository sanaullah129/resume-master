import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const errorLogService = async (routeDetails: string, error: string) => {
    await prisma.errorLog.create({
        data: {
            routeDetails: routeDetails, error: error
        }
    })
}