import { Router } from "express";
import mustAuthenticated from "src/middlewares/mustAuthenticated";
import ProjectController from "./../controllers/ProjectController";

// Init shared
const router = Router();

/******************************************************************************
 *                      Get projects - "GET /api/projects/"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/", mustAuthenticated, ProjectController.getAll);

export default router;
