import { Request, Response } from "express";
import { errorLogService } from "../services/CommonService";
import { fetchResumeDetails, savePersonalInfoService, saveResumeDescription, saveTitleService } from "../services/ResumeService";

// POST
// Route: "/api/resume/saveTitle"
export const saveTitle = async (req: Request, res: Response) => {
  try {
    const { userId, resumeTitle } = req.body;

    if (!userId || !resumeTitle) {
      return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
    }

    const resume = await saveTitleService(userId, resumeTitle);

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
export const savePersonalInfo = async(req: Request, res: Response) => {
    try {
        const { resumeId, userId, name, phoneNumber, emailId, position, district, city, pinCode, socialMedia, linkedIn, gitHub, portfolio } = req.body;

        if(!resumeId || !userId || !name || !phoneNumber || !emailId || !position || !district || !city || !pinCode) {
            return res.status(400).json({ statusId: 2, status: "Please fill all the required details" });
        }

        const savedInfo = await savePersonalInfoService(resumeId, userId, name, phoneNumber, emailId, position, district, city, pinCode, socialMedia, linkedIn, gitHub, portfolio);

        if(savedInfo){
            const resume = await fetchResumeDetails(resumeId, userId);
            return res.status(200).json({ resumeDetails: resume });
        } else {
            return res.status(500).json({ statusId: 0, status: "Some Error Occured while Saving", });
        }

    } catch (error: any) {
        console.log(error);
        errorLogService("Save Personal Info Route", error.toString());
        return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString(), });
    }
}

// PATCH
// Route: "/api/resume/resumeDescription/:id"
export const resumeDescription = async (req: Request, res: Response) => {
    try {
        const { resumeId, userId, resumeDescription } = req.body;
        if(!resumeId || !userId || !resumeDescription){
            return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
        }

        const saveDescription = await saveResumeDescription(resumeId, userId, resumeDescription)

    } catch (error: any) {
        console.log(error);
        errorLogService("Save Resume Description Route", error.toString());
        return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString(), });
    }
}