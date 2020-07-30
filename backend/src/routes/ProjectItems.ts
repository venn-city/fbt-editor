import { Router } from "express";
import ProjectItemController from "src/controllers/ProjectItemController";
import mustAuthenticated from "src/middlewares/mustAuthenticated";

// Init shared
const router = Router();

/******************************************************************************
 *                      Get file content - "GET /api/project-items/:projectId?folderId=folderId"
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.get("/:projectId", mustAuthenticated, ProjectItemController.getAll);

/******************************************************************************
 *                      Delete item - "DELETE /api/project-items/"
 *                      Body: DeleteItemRequest
 *                          projectId: string
 *                          itemId: string
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.delete("/", mustAuthenticated, ProjectItemController.deleteItem);

/******************************************************************************
 *                      Create item - "POST /api/project-items/"
 *                      Body: CreateItemRequest
 *                          projectId: string
 *                          parentFolderId: string
 *                          name: string
 ******************************************************************************/

// tslint:disable-next-line: no-unbound-method
router.post("/", mustAuthenticated, ProjectItemController.createItem);

// tslint:disable-next-line: no-unbound-method
router.post("/upload", mustAuthenticated, ProjectItemController.uploadItem);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
