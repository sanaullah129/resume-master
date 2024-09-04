import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const updateTitle = async (resumeId: string, resumeTitle: string) => {
    return await prisma.resumeDetails.update({
        where: {id: resumeId},
        data: { resumeTitle: resumeTitle }
    })
}