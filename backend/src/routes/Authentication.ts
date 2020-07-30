import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";

// Init shared
const router = Router();

/******************************************************************************
 *                      login - "POST /api/auth/login"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.post("/login", AuthenticationController.login);

/******************************************************************************
 *                      Get auth client data - "GET /api/auth/getClientData"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/getClientData", AuthenticationController.getClientData);

export default router;
