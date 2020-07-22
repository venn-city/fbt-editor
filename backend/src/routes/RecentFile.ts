import { Router } from "express";
import RecentFileController from './../controllers/RecentFileController';
import mustAuthenticated from 'src/middlewares/mustAuthenticated';

// Init shared
const router = Router();

/******************************************************************************
 *                      Get recent files - "GET /api/recent-files/"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/", mustAuthenticated, RecentFileController.getAll);

export default router;
