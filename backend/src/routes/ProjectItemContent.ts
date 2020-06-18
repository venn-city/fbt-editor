import { Request, Response, Router } from "express";
import _ from 'lodash';
import ProjectItemContentController from 'src/controllers/ProjectItemContentController';

// Init shared
const router = Router();

/******************************************************************************
 *                      Get file content - "GET /api/project-item-content/:projectName?fileId=fileId"
 **********************************************************************/

router.get("/:projectName", ProjectItemContentController.getfileContent);

/******************************************************************************
 *                      Update file content - "PUT /api/project-item-content/"
 *                      Body: ProjectFileContent
 *                          projectName: string,
 *                          targetLanguage: string,
 *                          projectFileId: string,
 *                          projectFileItems: ProjectFileItem[]
 ******************************************************************************/

router.put("/", ProjectItemContentController.updatefileContent);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
