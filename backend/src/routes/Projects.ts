import { Request, Response, Router } from "express";
import ProjectController from './../controllers/ProjectController'

// Init shared
const router = Router();

/******************************************************************************
 *                      Get projects - "GET /api/projects/"
 ******************************************************************************/

router.get("/", ProjectController.getAll);

export default router;
