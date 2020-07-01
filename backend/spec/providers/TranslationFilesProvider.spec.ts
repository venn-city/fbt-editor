import TranslationSourceFile from '@entities/TranslationSourceFile';
import TranslationSourceItem from '@entities/TranslationSourceItem';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import ProjectProvider from 'src/providers/ProjectProvider';
import TranslationFilesProvider from 'src/providers/TranslationFilesProvider';
import S3BucketRepository from 'src/repositories/S3BucketRepository';

describe('TranslationFilesProvider', () => {
    const hash = "hash";
    const projectId = "projectId";
    const locale = "en_EN";
    const source = "source";
    const translation: string = "translation";
    const projectFileId = "projectFolder/projectFileId.json";
    const sourceFileName: string = "translation.json";
    const sourceFileId: string = `$projectFolder/${sourceFileName}`;
    let translationFilesProvider: TranslationFilesProvider;

    beforeAll((done) => {
        translationFilesProvider = new TranslationFilesProvider();
        done();
    });

    describe("getTranslationSourceFile",() => {

        it(`should return translationSourceFile whend file exists`, async(done) => {
            const translationSourceFile: TranslationSourceFile = createTranslationSourceFile();
            const objectContent = {
                Body: JSON.stringify(translationSourceFile)
            } as AWS.S3.Types.GetObjectOutput;
            spyOn(ProjectProvider.prototype, 'getSourceFileName').and.returnValue(sourceFileName);
            spyOn(S3BucketRepository.prototype, 'getBucketObjectContent').and.returnValue(Promise.resolve(objectContent));

            const result: TranslationSourceFile = await translationFilesProvider.getTranslationSourceFile(projectId, projectFileId);
            expect(result.phrases).toEqual(result.phrases);
            done();
        });

        it(`should throw error when file does not have valid format`, async(done) => {
            const objectContent = {
                Body: ""
            } as AWS.S3.Types.GetObjectOutput;
            spyOn(ProjectProvider.prototype, 'getSourceFileName').and.returnValue(sourceFileName);
            spyOn(S3BucketRepository.prototype, 'getBucketObjectContent').and.returnValue(Promise.resolve(objectContent));

            try {
                await translationFilesProvider.getTranslationSourceFile(projectId, projectFileId);
            } catch(e) {
                expect(e.message).toEqual(`File translation.json does not have valid format.`);
            }
            done();
        });

        it(`should throw error when file does not exist in folder.`, async(done) => {
            spyOn(ProjectProvider.prototype, 'getSourceFileName').and.returnValue(sourceFileName);
            spyOn(S3BucketRepository.prototype, 'getBucketObjectContent').and.throwError("error");

            try {
                await translationFilesProvider.getTranslationSourceFile(projectId, projectFileId);
            } catch(e) {
                expect(e.message).toEqual(`File translation.json does not exist in folder.`);
            }
            done();
        });
    });

    describe("getTranslationTargetFile",() => {

        it(`should return translationTargetFile whend file exists`, async(done) => {
            const translationTargetFile: TranslationTargetFile = createTranslationTargetFile();
            // tslint:disable-next-line: no-any
            const targetObject: any = {
                ...translationTargetFile
            };
            targetObject['fb-locale'] = translationTargetFile.locale;
            const objectContent = {
                Body: JSON.stringify(targetObject),
                ContentLength: 1
            } as AWS.S3.Types.GetObjectOutput;
            spyOn(S3BucketRepository.prototype, 'getBucketObjectContent').and.returnValue(Promise.resolve(objectContent));

            const result: TranslationTargetFile = await translationFilesProvider.getTranslationTargetFile(projectId, projectFileId);
            expect(result.locale).toEqual(translationTargetFile.locale);
            expect(result.translations).toEqual(translationTargetFile.translations);
            done();
        });

        it(`should throw error whend file does not exist`, async(done) => {
            const translationTargetFile: TranslationTargetFile = createTranslationTargetFile();
            spyOn(S3BucketRepository.prototype, 'getBucketObjectContent').and.throwError("error");

            try {
                await translationFilesProvider.getTranslationTargetFile(projectId, projectFileId);
            } catch(e) {
                expect(e.message).toEqual(`File projectFileId.json does not exist.`);
            }
            done();
        });

        it(`should return translationTargetFile whend file exists`, async(done) => {
            const objectContent = {
                Body: ""
            } as AWS.S3.Types.GetObjectOutput;
            spyOn(S3BucketRepository.prototype, 'getBucketObjectContent').and.returnValue(Promise.resolve(objectContent));

            try {
                await translationFilesProvider.getTranslationTargetFile(projectId, projectFileId);
            } catch(e) {
                expect(e.message).toEqual(`File projectFileId.json does not have valid format.`);
            }
            done();
        });

    });

    function createTranslationTargetFile(): TranslationTargetFile {
        return new TranslationTargetFile(locale, {});
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

    function createHash(index: number): string {
        return `${hash}${index}`;
    }

    function createSource(index: number): string {
        return `${source}${index}`;
    }
 });