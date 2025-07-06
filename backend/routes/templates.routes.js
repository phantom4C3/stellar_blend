import { Router } from "express";
import {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} from "../controllers/template.controller.js";
import templateMiddleware from "../middlewares/validateTemplate.middlewares.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const templateRouter = Router();

templateRouter.post("/", [authMiddleware, templateMiddleware], createTemplate);
templateRouter.get("/", templateMiddleware, getTemplates);
templateRouter.get("/:id", templateMiddleware, getTemplateById);
templateRouter.put(
  "/:id",
  [authMiddleware, templateMiddleware],
  updateTemplate
);
templateRouter.delete(
  "/:id",
  [authMiddleware, templateMiddleware],
  deleteTemplate
);

export default templateRouter;
