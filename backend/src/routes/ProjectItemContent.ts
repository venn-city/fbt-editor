import { Router } from "express";
import ProjectItemContentController from "src/controllers/ProjectItemContentController";
import mustAuthenticated from "src/middlewares/mustAuthenticated";

// Init shared
const router = Router();

/******************************************************************************
 *                      Get file content - "GET /api/project-item-content/:projectId?fileId=fileId"
 **********************************************************************/

router.get(
  "/:projectId",
  mustAuthenticated,
  // tslint:disable-next-line: no-unbound-method
  ProjectItemContentController.getfileContent
);

/******************************************************************************
 *                      Update file content - "PUT /api/project-item-content/"
 *                      Body: ProjectFileContent
 *                          projectId: string,
 *                          targetLanguage: string,
 *                          projectFileId: string,
 *                          projectFileItems: ProjectFileItem[]
 ******************************************************************************/

router.put(
  "/",
  mustAuthenticated,
  // tslint:disable-next-line: no-unbound-method
  ProjectItemContentController.updatefileContent
);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
