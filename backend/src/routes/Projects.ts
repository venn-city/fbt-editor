import { Router } from "express";
import ProjectController from './../controllers/ProjectController';

// Init shared
const router = Router();

/******************************************************************************
 *                      Get projects - "GET /api/projects/"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/", ProjectController.getAll);

export default router;
