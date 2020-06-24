import CreateItemRequest from '@entities/CreateItemRequest';
import DeleteItemRequest from '@entities/DeleteItemRequest';
import ProjectContent from '@entities/ProjectContent';
import { Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';
import { ParamsDictionary } from 'express-serve-static-core';
import ProjectItemProvider from 'src/providers/ProjectItemProvider';
import ResponseProvider from 'src/providers/ResponseProvider';
import S3BucketRepository from "src/repositories/S3BucketRepository";

class ProjectItemController {
    private readonly bucketRepository: S3BucketRepository = new S3BucketRepository();
    private readonly projectItemProvider: ProjectItemProvider = new ProjectItemProvider();
    private readonly responseProvider: ResponseProvider = new ResponseProvider();

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.uploadItem = this.uploadItem.bind(this);
    }

    public async getAll(req: Request, res: Response)  {
        const { projectId } = req.params;
        const { folderId } = req.query as ParamsDictionary;
        if (projectId) {
            const projectContent: ProjectContent = await this.bucketRepository.getBucketObjects(projectId, folderId);
            return this.responseProvider.createSuccessfullResponse(res, projectContent);
        }
        return this.responseProvider.createBadRequestResponse(res, 'Invalid projectId or file ID.');
    }

    public async createItem(req: Request, res: Response)  {
        const createItemRequest: CreateItemRequest = req.body as CreateItemRequest;
        if (createItemRequest) {
            await this.projectItemProvider.createItem(createItemRequest);
            return res.end();
        }
        return this.responseProvider.createBadRequestResponse(res, 'Create item request has wrong body.');
    }

    public async uploadItem(req: Request, res: Response)  {
        const createItemRequest: CreateItemRequest = req.body as CreateItemRequest;
        const file: UploadedFile  = req.files!.file as UploadedFile;
        if (createItemRequest && file) {
            await this.projectItemProvider.uploadItem(createItemRequest.projectId, createItemRequest.parentFolderId, file);
            return res.end();
        }
        return this.responseProvider.createBadRequestResponse(res, 'Upload item request has wrong body.');
    }

    public async deleteItem(req: Request, res: Response)  {
        const deleteItemRequest: DeleteItemRequest = req.body as DeleteItemRequest;
        if (deleteItemRequest) {
            await this.bucketRepository.deleteObject(deleteItemRequest.projectId, deleteItemRequest.itemId);
            return res.end();
        }
        return this.responseProvider.createBadRequestResponse(res, 'Delete item request has wrong body.');
    }
}

export default new ProjectItemController();
