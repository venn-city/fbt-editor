import { Router } from "express";
import mustAuthenticated from "src/middlewares/mustAuthenticated";
import RecentFileController from "./../controllers/RecentFileController";

// Init shared
const router = Router();

/******************************************************************************
 *                      Get recent files - "GET /api/recent-files/"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/", mustAuthenticated, RecentFileController.getAll);

export default router;
