import CreateItemRequest from '@entities/CreateItemRequest';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import TranslationSourceItem from '@entities/TranslationSourceItem';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import TranslationTargetItem from '@entities/TranslationTargetItem';
import TranslationTargetItemTranslation from '@entities/TranslationTargetItemTranslation';
import { UploadedFile } from 'express-fileupload';
import ProjectItemProvider from 'src/providers/ProjectItemProvider';
import ProjectProvider from 'src/providers/ProjectProvider';
import S3BucketRepository from 'src/repositories/S3BucketRepository';

describe('ProjectItemProvider', () => {
    const hash = "hash";
    const projectId = "projectId";
    const locale = "en_EN";
    const source = "source";
    const translation: string = "translation";
    const projectFileId = "projectFolder/projectFileId.json";
    const parentFolderId = "projectFolder/";
    const sourceFileName: string = "translation.json";
    let projectItemProvider: ProjectItemProvider;

    beforeAll((done) => {
        projectItemProvider = new ProjectItemProvider();
        done();
    });

    describe('createItem', () => {
        it(`should create file`, async(done) => {
            const createItemRequest: CreateItemRequest = new CreateItemRequest(projectId, parentFolderId, sourceFileName, "");
            spyOn(S3BucketRepository.prototype, 'putContentObject').and.returnValue(Promise.resolve(<AWS.S3.Types.PutObjectOutput>{}));
            const result: boolean = await projectItemProvider.createItem(createItemRequest);

            expect(result).toEqual(true);
            done();
        });

        it(`should create folder`, async(done) => {
            const createItemRequest: CreateItemRequest = new CreateItemRequest(projectId, parentFolderId, parentFolderId, "");
            spyOn(S3BucketRepository.prototype, 'putObject').and.returnValue(Promise.resolve(<AWS.S3.Types.PutObjectOutput>{}));
            const result: boolean = await projectItemProvider.createItem(createItemRequest);

            expect(result).toEqual(true);
            done();
        });
    });

    describe('createFile', () => {
        it(`should create file`, async(done) => {
            spyOn(S3BucketRepository.prototype, 'putContentObject').and.returnValue(Promise.resolve(<AWS.S3.Types.PutObjectOutput>{}));
            const result: boolean = await projectItemProvider.createFile(projectId, projectFileId, createTranslationTargetFile());

            expect(result).toEqual(true);
            done();
        });
    });

    describe('deleteFile', () => {
        it(`should delete file`, async(done) => {
            spyOn(S3BucketRepository.prototype, 'deleteObject').and.returnValue(Promise.resolve(<AWS.S3.Types.DeleteObjectOutput>{}));
            const result: boolean = await projectItemProvider.deleteFile(projectId, projectFileId);

            expect(result).toEqual(true);
            done();
        });
    });

    describe('uploadItem', () => {
        it(`should upload file`, async(done) => {
            const file: UploadedFile = {
                name: "projectFileId.json",
                data: Buffer.from(JSON.stringify(createTranslationSourceFile()), 'utf8')
            } as UploadedFile;
            spyOn(S3BucketRepository.prototype, 'putContentObject').and.returnValue(Promise.resolve(<AWS.S3.Types.PutObjectOutput>{}));
            spyOn(ProjectProvider.prototype, 'getSourceFileName').and.returnValue(sourceFileName);
            const result: boolean = await projectItemProvider.uploadItem(projectId, parentFolderId, file);

            expect(result).toEqual(true);
            done();
        });
    });

    function createTranslationTargetFile(): TranslationTargetFile {
        const translations: { [Key: string]: TranslationTargetItem; } = {};
        translations[createHash(0)] = new TranslationTargetItem([], [], [new TranslationTargetItemTranslation(translation, {})]);
        return new TranslationTargetFile(locale, translations);
    }

    function createHash(index: number): string {
        return `${hash}${index}`;
    }

    function createTranslationSourceFile(): TranslationSourceFile {
        const translationSourceItems: TranslationSourceItem[] = [createTranslationSourceItem(0), createTranslationSourceItem(1)];
        return new TranslationSourceFile(translationSourceItems);
    }

    function createTranslationSourceItem(index: number): TranslationSourceItem {
        const hashToText: { [Key: string]: string; } = {};
        hashToText[createHash(index)] = createSource(index);
        return new TranslationSourceItem(hashToText, "", 0, 0, 0, 0, "", "", "", "");
    }

    function createSource(index: number): string {
        return `${source}${index}`;
    }
 });