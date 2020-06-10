import { ParamsDictionary } from 'express-serve-static-core';
import { Request, Response } from "express";
import { BAD_REQUEST } from 'http-status-codes';
import ProjectFileContentProvider from 'src/providers/ProjectFileContentProvider';
import ProjectFileContent from '@entities/ProjectFileContent';
import RecentFileIdProvider from './../providers/RecentFileIdProvider';
import ProjectItemProvider from 'src/providers/ProjectItemProvider';
import TranslationFileContentProvider from 'src/providers/TranslationFileContentProvider';
import ResponseProvider from 'src/providers/ResponseProvider';

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
        const { projectName } = req.params as ParamsDictionary;
        const { fileId } = req.query as ParamsDictionary;
        if (projectName && fileId) {
            const file = await this.projectFileContentProvider.getProjectFileContent(projectName, fileId)
            RecentFileIdProvider.add(fileId)
            return this.responseProvider.createSuccessfullResponse(res, file);
        }
        return this.responseProvider.createBadRequestResponse(res, 'Invalid projectName or file ID.');
    };

    public async updatefileContent(req: Request, res: Response)  {
        const projectFileContent  = req.body as ProjectFileContent;
        if (projectFileContent) {
            var translationFile = await this.translationFileContentProvider.getFileContent(projectFileContent);
            await this.projectItemProvider.createFile(projectFileContent.projectName, projectFileContent.fileId, translationFile)
            return res.end();
        }
        return this.responseProvider.createBadRequestResponse(res, 'Invalid project file content.');
    };
}

export default new ProjectItemContentController();
