import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const fetchResumeDetails = async (req: Request, res: Response) => {
    const {resumeId} =req.params;
    const resumeDetails = await prisma.resumeDetails.findUnique({
        where: {id: resumeId},
        include: {
            experience: true,
        }
    });
    return res.status(200).json(resumeDetails);
}