import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getResumeById = async (id: string) => {
  return await prisma.resumeDetails.findUnique({
    where: { id: id }
  })
}

export const saveTitleService = async (userId: string, resumeTitle: string, resumeId: string) => {
  if (resumeId) {
    return await prisma.resumeDetails.update({
      where: { id: resumeId },
      data: { userId, resumeTitle },
    });
  }
  else {
    return await prisma.resumeDetails.create({
      data: { userId, resumeTitle },
    });
  }

};

export const savePersonalInfoService = async (resumeId: string, userId: string, name: string, phoneNumber: number, emailId: string, position: string, district: string, city: string, pincode: number, linkedIn: string, github: string, website: string, socialMedia: string) => {
  return await prisma.resumeDetails.update({
    where: { id: resumeId },
    data: {
      name, phoneNumber, emailId, position, district, city, pincode, linkedIn, github, website, socialMedia,
    },
  });
};

export const saveResumeDescription = async (resumeId: string, description: string) => {
  return await prisma.resumeDetails.update({
    where: { id: resumeId },
    data: { description }
  })
}

export const saveSkill = async (resumeDetailsId: string, userId: string, technicalSkills: string, otherSkills: string) => {
  return await prisma.skills.create({
    data: { resumeDetailsId, userId, technicalSkills, otherSkills }
  });
}

export const saveExperiences = async (resumeDetailsId: string, userId: string, companyName: string, fromDate: string, toDate: string, location: string, description: string, skills: string) => {
  return await prisma.experience.create({
    data: { resumeDetailsId, userId, companyName, fromDate, toDate, location, description, skills }
  })
}

export const saveProjects = async (resumeDetailsId: string, userId: string, projectTitle: string, description: string, skills: string) => {
  return await prisma.projects.create({
    data: { resumeDetailsId, userId, projectTitle, description, skills }
  })
}

export const saveEducation = async (resumeDetailsId: string, userId: string, schoolName: string, fromDate: string, toDate: string, grade: string, specialization: string, location: string) => {
  return await prisma.education.create({
    data: { resumeDetailsId, userId, schoolName, fromDate, toDate, grade, specialization, location }
  })
}

export const saveAdditionalInfo = async (resumeDetailsId: string, userId: string, title: string, info: string) => {
  return await prisma.additionalInfo.create({
    data: { resumeDetailsId, userId, title, info }
  })
}