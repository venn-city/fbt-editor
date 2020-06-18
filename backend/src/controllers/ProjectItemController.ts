import S3BucketRepository from "src/repositories/S3BucketRepository";
import { ParamsDictionary } from 'express-serve-static-core';

import { Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';
import ProjectContent from '@entities/ProjectContent';
import CreateItemRequest from '@entities/CreateItemRequest';
import DeleteItemRequest from '@entities/DeleteItemRequest';
import ProjectItemProvider from 'src/providers/ProjectItemProvider';
import { UploadedFile } from 'express-fileupload';
import ProjectProvider from 'src/providers/ProjectProvider';
import ResponseProvider from 'src/providers/ResponseProvider';

class ProjectItemController {
    private readonly bucketRepository: S3BucketRepository = new S3BucketRepository();
    private readonly projectItemProvider: ProjectItemProvider = new ProjectItemProvider();
    private readonly projectProvider: ProjectProvider = new ProjectProvider();
    private readonly responseProvider: ResponseProvider = new ResponseProvider(); 

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.uploadItem = this.uploadItem.bind(this);
    }

    public async getAll(req: Request, res: Response)  {
        const { projectName } = req.params as ParamsDictionary;
        const { folderId } = req.query as ParamsDictionary;
        if (projectName) {
            var projectContent: ProjectContent = await this.bucketRepository.getBucketObjects(projectName, folderId);
            return this.responseProvider.createSuccessfullResponse(res, projectContent);
        }
        return this.responseProvider.createBadRequestResponse(res, 'Invalid projectName or file ID.');
    };

    public async createItem(req: Request, res: Response)  {
        const createItemRequest: CreateItemRequest = req.body as CreateItemRequest;
        if (createItemRequest) {
            await this.projectItemProvider.createItem(createItemRequest);
            return res.end();
        }
        return this.responseProvider.createBadRequestResponse(res, 'Create item request has wrong body.');
    };

    public async uploadItem(req: Request, res: Response)  {
        const createItemRequest: CreateItemRequest = req.body as CreateItemRequest;
        var file: UploadedFile  = req.files!['file'] as UploadedFile;
        if (createItemRequest && file) {
            await this.projectItemProvider.uploadItem(createItemRequest.projectName, createItemRequest.parentFolderId, file);
            return res.end();
        }
        return this.responseProvider.createBadRequestResponse(res, 'Upload item request has wrong body.');
    };

    public async deleteItem(req: Request, res: Response)  {
        const deleteItemRequest: DeleteItemRequest = req.body as DeleteItemRequest;
        if (deleteItemRequest) {
            deleteItemRequest
            await this.bucketRepository.deleteObject(deleteItemRequest.projectName, deleteItemRequest.itemId);
            return res.end();
        }
        return this.responseProvider.createBadRequestResponse(res, 'Delete item request has wrong body.');
    };
}

export default new ProjectItemController();
