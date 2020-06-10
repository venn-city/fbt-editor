import { Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import _ from 'lodash';
import RecentFileIdProvider from './../providers/RecentFileIdProvider';
import path from 'path';
import ProjectFile from '@entities/ProjectFile';
import ResponseProvider from 'src/providers/ResponseProvider';

class RecentFileController {
    private readonly responseProvider: ResponseProvider = new ResponseProvider(); 

    constructor() {
        this.getAll = this.getAll.bind(this);
    }

    public async getAll(req: Request, res: Response)  {
        var recentFiles = RecentFileIdProvider.getAll().map(fileId => new ProjectFile(fileId, path.basename(fileId)))
        return this.responseProvider.createSuccessfullResponse(res, recentFiles);
    };
}

export default new RecentFileController();
