import { Request, Response } from "express";
import { errorLogService } from "../services/CommonService";
import { getUserById } from "../services/UserService";
import { updateTitle as updateTitleService } from "../services/UpdateResumeService";
import { getResumeById } from "../services/ResumeService";

export const updateTitle = async (req: Request, res: Response) => {
    try {
        const { userId, resumeTitle } = req.body;
        const { resumeId } = req.params;

        if (!userId || !resumeTitle) {
            return res.status(400).json({ statusId: 2, status: "Please fill all the details" });
        }

        
        const isUserAvaiable = await getUserById(userId);
        const isResumeAvailable = await getResumeById(resumeId);

        if (!isUserAvaiable) {
            return res.send(404).json({ statusId: 3, status: "User not found" });

        } 
        
        if(!isResumeAvailable) {
            return res.send(404).json({ statusId: 3, status: "Resume not found" });
        }

        const resume = await updateTitleService(resumeId, resumeTitle);

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

export const updatePersonalIndo = (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        console.log(error);
        errorLogService("Edit Title Route", error.toString());
        return res.status(500).json({ statusId: 0, status: "Internal Server Error", error: error.toString(), });
    }
}