import { Router } from "express";
import AuthentificationsController from '../controllers/AuthentificationsController';

// Init shared
const router = Router();

/******************************************************************************
 *                      login - "POST /api/auth/login"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.post("/login", AuthentificationsController.login);


/******************************************************************************
 *                      Get auth client data - "GET /api/auth/getClientData"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/getClientData", AuthentificationsController.getClientData);

export default router;
