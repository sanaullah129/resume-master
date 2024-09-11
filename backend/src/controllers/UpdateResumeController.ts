import { Request, Response } from "express";
import { errorLogService } from "../services/commonService";
import { preSaveValidation } from "../middlewares/utils";
import { savePersonalInfoService, saveResumeDescription, saveSkill, saveTitleService } from "../services/resumeService";

// PUT
// Route: "/api/updateResume/personalInfo/:id"
export const updateTitle = async (req: Request, res: Response) => {
    try {
        const { userId, resumeTitle } = req.body;
        const { resumeId } = req.params;

        if (!userId || !resumeTitle) {
            return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
        }

        preSaveValidation(res, userId, resumeId);

        const resume = await saveTitleService(resumeId, userId, resumeTitle);

        if (resume) {
            return res.status(200).json({ resumeDetails: resume });
        } else {
            return res.status(500).json({ statusId: 0, status: "Some Error Occured while Saving", });
        }


    } catch (error: any) {
        console.log(error);
        errorLogService("Edit Title Route", error.toString());
        return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString(), });
    }
}

// PUT
// Route: "/api/updateResume/personalInfo/:id"
export const updatePersonalInfo = async (req: Request, res: Response) => {
    try {
        const { userId, name, phoneNumber, emailId, position, district, city, pinCode, linkedIn, gitHub, website, socialMedia } = req.body;
        const { resumeId } = req.params;

        if (!resumeId || !userId || !name || !phoneNumber || !emailId || !position || !district || !city || !pinCode || !website) {
            return res.status(400).json({ statusId: 2, status: "Please fill all the required details" });
        }

        preSaveValidation(res, userId, resumeId);

        const saveResume = await savePersonalInfoService(resumeId, userId, name, phoneNumber, emailId, position, district, city, pinCode, linkedIn, gitHub, website, socialMedia);

        if (saveResume) {
            return res.status(200).json({ resumeDetails: saveResume });
        } else {
            return res.status(500).json({ statusId: 0, status: "Some Error Occured while Saving", });
        }
    } catch (error: any) {
        console.log(error);
        errorLogService("Edit Title Route", error.toString());
        return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString(), });
    }
}

// PUT
// Route: "/api/updateResume/resumeDescription/:id"
export const updateDescription = async (req: Request, res: Response) => {
    try {
        const { userId, resumeDescription } = req.body;
        const { resumeId } = req.params

        if (!resumeId || !userId || !resumeDescription) {
            return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
        }

        preSaveValidation(res, userId, resumeId);

        const saveDescription = await saveResumeDescription(resumeId, resumeDescription);

        if (saveDescription) {
            return res.status(200).json({ resumeDetails: saveDescription });
        } else {
            return res.status(500).json({ statusId: 0, status: "Some Error Occured while Saving" });
        }

    } catch (error: any) {
        console.log(error);
        errorLogService("Edit Title Route", error.toString());
        return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString(), });
    }
}

// PATCH
// Route: "/api/resume/updateSkills/:id"
export const updateSkills = async (req: Request, res: Response) => {
    try {
  
      const { userId, technicalSkills, otherSkills } = req.body;
      const { resumeId } = req.params;
  
      if (!resumeId || !userId || !technicalSkills || !otherSkills) {
        return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
      }
  
      preSaveValidation(res, userId, resumeId);  
  
      const addSkills = await saveSkill(resumeId, userId, technicalSkills, otherSkills);
  
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