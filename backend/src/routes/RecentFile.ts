import { Request, Response, Router } from "express";
import RecentFileController from './../controllers/RecentFileController'

// Init shared
const router = Router();

/******************************************************************************
 *                      Get recent files - "GET /api/recent-files/"
 ******************************************************************************/

router.get("/", RecentFileController.getAll);

export default router;
