import { Request, Response } from "express";
import { errorLogService } from "../services/CommonService";
import { getResumeById, saveEducation, saveExperiences, savePersonalInfoService, saveProjects, saveResumeDescription, saveSkill, saveTitleService, saveAdditionalInfo as saveAdditionalInfoService } from "../services/ResumeService";
import { getUserById } from "../services/UserService";

// POST
// Route: "/api/resume/saveTitle"
export const saveTitle = async (req: Request, res: Response) => {
  try {

    const { userId, resumeTitle } = req.body;

    if (!userId || !resumeTitle) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    var resume;
    const isUserAvaiable = await getUserById(userId);

    if (isUserAvaiable) {
      resume = await saveTitleService(userId, resumeTitle);
    } else {
      return res.send(404).json({ statusId: 3, status: "User not found" });
    }

    if (resume) {
      return res.status(200).json({ resumeDetails: resume });
    } else {
      return res.status(500).json({ statusId: 0, status: "Some Error Occured while Saving", });
    }
  } catch (error: any) {
    console.log(error);
    errorLogService("Save Title Route", error.toString());
    return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString(), });
  }
};

// PATCH
// Route: "/api/resume/personalInfo/:id"
export const savePersonalInfo = async (req: Request, res: Response) => {
  try {

    const { userId, name, phoneNumber, emailId, position, district, city, pinCode, socialMedia, linkedIn, gitHub, portfolio } = req.body;
    const { resumeId } = req.params;
    if (!resumeId || !userId || !name || !phoneNumber || !emailId || !position || !district || !city || !pinCode) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the required details" });
    }

    var savedInfo;
    const isUserAvaiable = await getUserById(userId);
    const isResumeAvailable = await getResumeById(resumeId);

    if (isUserAvaiable && isResumeAvailable) {
      savedInfo = await savePersonalInfoService(resumeId, name, phoneNumber, emailId, position, district, city, pinCode, socialMedia, linkedIn, gitHub, portfolio);
    } else {
      return res.send(404).json({ statusId: 3, status: "User or Resume not found" });
    }

    if (savedInfo) {
      return res.status(200).json({ resumeDetails: savedInfo });
    } else {
      return res.status(500).json({ statusId: 0, status: "Some Error Occured while Saving" });
    }

  } catch (error: any) {
    console.log(error);
    errorLogService("Save Personal Info Route", error.toString());
    return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
  }
}

// PATCH
// Route: "/api/resume/resumeDescription/:id"
export const resumeDescription = async (req: Request, res: Response) => {
  try {

    const { userId, resumeDescription } = req.body;
    const { resumeId } = req.params
    if (!resumeId || !userId || !resumeDescription) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    var saveDescription;
    const isUserAvaiable = await getUserById(userId);
    const isResumeAvailable = await getResumeById(resumeId);

    if (isUserAvaiable && isResumeAvailable) {
      saveDescription = await saveResumeDescription(resumeId, resumeDescription);
    } else {
      return res.send(404).json({ statusId: 3, status: "User not found" });
    }

    if (saveDescription) {
      return res.status(200).json({ resumeDetails: saveDescription });
    } else {
      return res.status(500).json({ statusId: 0, status: "Some Error Occured while Saving" });
    }

  } catch (error: any) {
    console.log(error);
    errorLogService("Save Resume Description Route", error.toString());
    return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
  }
}

// PATCH
// Route: "/api/resume/saveSkills/:id"
export const saveSkills = async (req: Request, res: Response) => {
  try {

    const { userId, technicalSkills, otherSkills } = req.body;
    const { resumeId } = req.params;

    if (!resumeId || !userId || !technicalSkills || !otherSkills) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    var addSkills;
    const isUserAvaiable = await getUserById(userId);
    const isResumeAvailable = await getResumeById(resumeId);

    if (isUserAvaiable && isResumeAvailable) {
      addSkills = await saveSkill(resumeId, userId, technicalSkills, otherSkills);
    } else {
      return res.send(404).json({ statusId: 3, status: "User not found" });
    }

    if (addSkills) {
      return res.status(200).json({ resumeDetails: addSkills });
    } else {
      return res.status(500).json({ statusId: 0, status: "Some Error Occured while Saving" });
    }

  } catch (error: any) {
    console.log(error);
    errorLogService("Save Skill Route", error.toString());
    return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
  }
}

// POST
// Route: "/api/resume/addExp"
export const addExperience = async (req: Request, res: Response) => {
  try {
    const { resumeId, userId, experiences } = req.body;

    if (!resumeId || !userId || !experiences || !Array.isArray(experiences)) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    const isUserAvailable = await getUserById(userId);
    const isResumeAvailable = await getResumeById(resumeId);

    if (!isUserAvailable || !isResumeAvailable) {
      return res.status(404).json({ statusId: 3, status: "User or Resume not found" });
    }

    const savedExperiences = await Promise.all(experiences.map(exp => saveExperiences(resumeId, userId, exp.companyName, exp.fromDate, exp.toDate, exp.location, exp.description, exp.skills)));

    return res.status(200).json({ resumeDetails: savedExperiences });
  } catch (error: any) {
    console.error(error);
    errorLogService("Add Experience Route", error.toString());
    return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
  }
};

// POST
// Route: "/api/resume/addProjects"
export const addProjects = async (req: Request, res: Response) => {
  try {
    const { userId, resumeId, projects } = req.body;

    if (!resumeId || !userId || !projects || !Array.isArray(projects)) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    const isUserAvailable = await getUserById(userId);
    const isResumeAvailable = await getResumeById(resumeId);

    if (!isUserAvailable || !isResumeAvailable) {
      return res.status(404).json({ statusId: 3, status: "User or Resume not found" });
    }

    const savedProjects = await Promise.all(projects.map(project => saveProjects(resumeId, userId, project.projectTitle, project.description, project.skills)));

    return res.status(200).json({ resumeDetails: savedProjects });
  } catch (error: any) {
    console.error(error);
    errorLogService("Add Projects Route", error.toString());
    return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
  }
};


// POST
// Route: "/api/resume/addEducation"
export const addEducation = async (req: Request, res: Response) => {
  try {
    const { userId, resumeId, education } = req.body;

    if (!resumeId || !userId || !education || !Array.isArray(education)) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    const isUserAvailable = await getUserById(userId);
    const isResumeAvailable = await getResumeById(resumeId);

    if (!isUserAvailable || !isResumeAvailable) {
      return res.status(404).json({ statusId: 3, status: "User or Resume not found" });
    }

    const savedEducation = await Promise.all(education.map(edu => saveEducation(resumeId, userId, edu.schoolName, edu.fromDate, edu.toDate, edu.grade, edu.specialization, edu.location)));

    return res.status(200).json({ resumeDetails: savedEducation });
  } catch (error: any) {
    console.error(error);
    errorLogService("Add Education Route", error.toString());
    return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
  }
};


// POST
// Route: "/api/resume/addAdditionalInfo"
export const addAdditionalInfo = async (req: Request, res: Response) => {
  try {
    const { userId, resumeId, additionalInfo } = req.body;

    if (!resumeId || !userId || !additionalInfo || !Array.isArray(additionalInfo)) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    const isUserAvailable = await getUserById(userId);
    const isResumeAvailable = await getResumeById(resumeId);

    if (!isUserAvailable || !isResumeAvailable) {
      return res.status(404).json({ statusId: 3, status: "User or Resume not found" });
    }

    const savedAdditionalInfo = await Promise.all(additionalInfo.map(addInfo => saveAdditionalInfoService(resumeId, userId, addInfo.title, addInfo.info)));

    return res.status(200).json({ resumeDetails: savedAdditionalInfo });
  } catch (error: any) {
    console.error(error);
    errorLogService("Add Additional Info Route", error.toString());
    return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString() });
  }
};