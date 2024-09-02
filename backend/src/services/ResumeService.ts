import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchResumeDetails = async (resumeId: string, userId: string) => {
  return await prisma.resumeDetails.findFirst({
    where: { id: resumeId, userId: userId },
  });
};

export const saveTitleService = async (userId: string, resumeTitle: string) => {
  return await prisma.resumeDetails.create({
    data: { userId, resumeTitle },
  });
};

export const savePersonalInfoService = async (resumeId: string, userId: string, name: string, phoneNumber: number, emailId: string, position: string, district: string, city: string, pincode: number, socialMedia: string, linkedIn: string, github: string, website: string) => {
  return await prisma.resumeDetails.update({
    where: { id: resumeId, userId: userId },
    data: {
      name,
      phoneNumber,
      emailId,
      position,
      district,
      city,
      pincode,
      linkedIn,
      github,
      website,
      socialMedia,
    },
  });
};

export const saveResumeDescription = async(resumeId: string, userId: string, description: string) => {
    return await prisma.resumeDetails.update({
        where: { id: resumeId, userId: userId },
        data: {description}
    })
}
