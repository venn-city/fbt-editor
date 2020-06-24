import ProjectFileContent from '@entities/ProjectFileContent';
import { Request, Response } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import ProjectFileContentProvider from 'src/providers/ProjectFileContentProvider';
import ProjectItemProvider from 'src/providers/ProjectItemProvider';
import ResponseProvider from 'src/providers/ResponseProvider';
import TranslationFileContentProvider from 'src/providers/TranslationFileContentProvider';
import RecentFileIdProvider from './../providers/RecentFileIdProvider';

class ProjectItemContentController {
    private readonly projectFileContentProvider: ProjectFileContentProvider = new ProjectFileContentProvider();
    private readonly translationFileContentProvider: TranslationFileContentProvider = new TranslationFileContentProvider();
    private readonly projectItemProvider: ProjectItemProvider = new ProjectItemProvider();
    private readonly responseProvider: ResponseProvider = new ResponseProvider();

    constructor() {
        this.getfileContent = this.getfileContent.bind(this);
        this.updatefileContent = this.updatefileContent.bind(this);
    }

    public async getfileContent(req: Request, res: Response)  {
        const { projectId } = req.params;
        const { fileId } = req.query as ParamsDictionary;
        if (projectId && fileId) {
            const file = await this.projectFileContentProvider.getProjectFileContent(projectId, fileId);
            RecentFileIdProvider.add(fileId, projectId);
            return this.responseProvider.createSuccessfullResponse(res, file);
        }
        return this.responseProvider.createBadRequestResponse(res, 'Invalid projectId or file ID.');
    }

    public async updatefileContent(req: Request, res: Response)  {
        const projectFileContent  = req.body as ProjectFileContent;
        if (projectFileContent) {
            const translationFile = await this.translationFileContentProvider.getFileContent(projectFileContent);
            await this.projectItemProvider.createFile(projectFileContent.projectId, projectFileContent.fileId, translationFile);
            return res.end();
        }
        return this.responseProvider.createBadRequestResponse(res, 'Invalid project file content.');
    }
}

export default new ProjectItemContentController();
