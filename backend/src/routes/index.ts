import { Router } from 'express';
import ProjectItemContentRouter from './ProjectItemContent';
import ProjectItemsRouter from './ProjectItems';
import ProjectsRouter from './Projects';
import RecentFilesRouter from './RecentFile';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/projects', ProjectsRouter);
router.use('/project-items', ProjectItemsRouter);
router.use('/project-item-content', ProjectItemContentRouter);
router.use('/recent-files', RecentFilesRouter);

// Export the base-router
export default router;
