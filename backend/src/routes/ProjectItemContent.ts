import { Router } from "express";
import ProjectItemContentController from 'src/controllers/ProjectItemContentController';

// Init shared
const router = Router();

/******************************************************************************
 *                      Get file content - "GET /api/project-item-content/:projectId?fileId=fileId"
 **********************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/:projectId", ProjectItemContentController.getfileContent);

/******************************************************************************
 *                      Update file content - "PUT /api/project-item-content/"
 *                      Body: ProjectFileContent
 *                          projectId: string,
 *                          targetLanguage: string,
 *                          projectFileId: string,
 *                          projectFileItems: ProjectFileItem[]
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.put("/", ProjectItemContentController.updatefileContent);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
