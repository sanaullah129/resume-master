import { Router } from "express";
import { addAdditionalInfo, addEducation, addExperience, addProjects, resumeDescription, savePersonalInfo, saveSkills, saveTitle } from "../controllers/addResumeController";

const resumeRoutes = Router();

resumeRoutes.post("/saveTitle", saveTitle);
resumeRoutes.patch("/personalInfo/:resumeId", savePersonalInfo);
resumeRoutes.patch("/resumeDescription/:resumeId", resumeDescription);
resumeRoutes.patch("/saveSkills/:resumeId", saveSkills);
resumeRoutes.post("/addExp", addExperience)
resumeRoutes.post("/addProjects", addProjects)
resumeRoutes.post("/addEducation", addEducation)
resumeRoutes.post("/addAdditionalInfo", addAdditionalInfo)

export default resumeRoutes;