import { Response } from "express";
import { getUserById } from "../services/UserService";
import { getResumeById } from "../services/ResumeService";

export const preSaveValidation = async (res: Response, userId: string, resumeId: string) => {
    isUserAvaiable(res, userId);
    isResumeAvailable(res, resumeId);
    
}

const isUserAvaiable = async (res: Response, userId: string) => {
    const isUserAvaiable = await getUserById(userId);
    if (!isUserAvaiable) {
        return res.send(404).json({ statusId: 3, status: "User not found" });
    }
}

const isResumeAvailable = async (res: Response, resumeId: string) => {
    const isResumeAvailable = await getResumeById(resumeId);
    if (!isResumeAvailable) {
        return res.send(404).json({ statusId: 3, status: "Resume not found" });
    }
}