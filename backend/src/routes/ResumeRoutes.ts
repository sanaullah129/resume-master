import { Router } from "express";
import { savePersonalInfo, saveTitle } from "../controllers/ResumeController";

const resumeRoutes = Router();

resumeRoutes.post("/saveTitle", saveTitle);
resumeRoutes.patch("/personalInfo", savePersonalInfo);

export default resumeRoutes;