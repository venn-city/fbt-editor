import TranslationSourceFileProvider from './TranslationFilesProvider';
import _ from 'lodash';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import S3BucketRepository from 'src/repositories/S3BucketRepository';
import CreateItemRequest from '@entities/CreateItemRequest';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import ProjectProvider from './ProjectProvider';

export default class ProjectItemProvider {
    private translationSourceFileProvider: TranslationSourceFileProvider = new TranslationSourceFileProvider();
    private readonly s3BucketRepository: S3BucketRepository = new S3BucketRepository();
    private readonly bucketRepository: S3BucketRepository = new S3BucketRepository();
    private readonly projectProvider: ProjectProvider = new ProjectProvider();

    public async deleteFile(projectName: string, projectFileId: string): Promise<boolean> {
        var result = await this.s3BucketRepository.deleteObject(projectName, projectFileId);
        return result.RequestCharged !== null;
    }

    public async createItem(createItemRequest: CreateItemRequest): Promise<boolean> {
        const extName: string = path.extname(createItemRequest.name);
        const parentFolderId: string = createItemRequest.parentFolderId ? createItemRequest.parentFolderId : "";
        let itemId:string = "" 
        if (extName) {
            itemId =`${parentFolderId}${createItemRequest.name}`;
            var translationTargetFile = new TranslationTargetFile(createItemRequest.targetLanguage, {});
            return this.createFile(createItemRequest.projectName, itemId, translationTargetFile);
        }

        itemId = `${parentFolderId}${createItemRequest.name}/`;
        await this.s3BucketRepository.putObject(createItemRequest.projectName, itemId);
        return true;
    }

    public async createFile(projectName: string, projectFileId: string, translationTargetFile: TranslationTargetFile): Promise<boolean> {
        var result = await this.s3BucketRepository.putContentObject(projectName, projectFileId, JSON.stringify(translationTargetFile));
        return true;
    }

    public async uploadItem(projectName: string, parentFolderId: string, file: UploadedFile): Promise<boolean> {
        if (path.extname(file.name) !== ".json") {
            throw new Error(`File does not have a valid extension.`)
        }
        try {
            var translationSourceFile: TranslationSourceFile = JSON.parse(file.data.toString()) as TranslationSourceFile
        }
        catch(e) {
            throw new Error(`File does not have a valid format.`)
        }
        if (!translationSourceFile.phrases || translationSourceFile.phrases.length === 0) {
            throw new Error(`File does not have a valid format.`)
        }
        var sourceFileName = this.projectProvider.getSourceFileName(projectName);
        var translationSourceId = this.getTranslationSourceId(parentFolderId, sourceFileName);
        await this.bucketRepository.putContentObject(projectName, translationSourceId!, file.data)
        return true;
    }

    private getTranslationSourceId(fileId: string, sourceFileName: string | undefined) {
        const directory = path.dirname(fileId)
        if (directory == ".") {
            return sourceFileName;
        }
        return path.dirname(fileId) + "/" + sourceFileName;
    }
}