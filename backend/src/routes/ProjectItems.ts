import { Request, Response, Router } from "express";
import ProjectItemController from 'src/controllers/ProjectItemController';

// Init shared
const router = Router();

/******************************************************************************
 *                      Get file content - "GET /api/project-items/:projectName?folderId=folderId"
 ******************************************************************************/

router.get("/:projectName", ProjectItemController.getAll);

/******************************************************************************
 *                      Delete item - "DELETE /api/project-items/"
 *                      Body: DeleteItemRequest
 *                          projectName: string
 *                          itemId: string
 ******************************************************************************/

router.delete("/", ProjectItemController.deleteItem);

/******************************************************************************
 *                      Create item - "POST /api/project-items/"
 *                      Body: CreateItemRequest
 *                          projectName: string
 *                          parentFolderId: string
 *                          name: string
 ******************************************************************************/

router.post("/",  ProjectItemController.createItem);

router.post("/upload",  ProjectItemController.uploadItem);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
