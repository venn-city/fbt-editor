import { Router } from "express";
import AuthenticationsController from '../controllers/AuthenticationController';

// Init shared
const router = Router();

/******************************************************************************
 *                      login - "POST /api/auth/login"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.post("/login", AuthenticationsController.login);


/******************************************************************************
 *                      Get auth client data - "GET /api/auth/getClientData"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/getClientData", AuthenticationsController.getClientData);

export default router;
