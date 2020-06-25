import TranslationSourceFile from '@entities/TranslationSourceFile';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import path from 'path';
import S3BucketRepository from 'src/repositories/S3BucketRepository';
import ProjectProvider from './ProjectProvider';

export default class TranslationFilesProvider {
    private readonly s3BucketRepository: S3BucketRepository = new S3BucketRepository();
    private readonly projectProvider: ProjectProvider = new ProjectProvider();

    public async getTranslationSourceFile(projectId: string, fileId: string): Promise<TranslationSourceFile> {
        const sourceFileName = this.projectProvider.getSourceFileName(projectId);
        const translationInputId = this.getTranslationInputId(fileId, sourceFileName);
        let fileContent: AWS.S3.Types.GetObjectOutput;
        try {
            fileContent = await this.s3BucketRepository.getBucketObjectContent(projectId, translationInputId);
        } catch(e) {
            throw new Error(`File ${path.basename(sourceFileName)} does not exist in folder.`);
        }
        let translationFile: TranslationSourceFile;
        try {
            translationFile = JSON.parse(fileContent.Body!.toString()) as TranslationSourceFile;
            if (!translationFile) {
                throw new Error(`File ${sourceFileName} does not have valid format.`);
            }
        } catch(e) {
            throw new Error(`File ${sourceFileName} does not have valid format.`);
        }
        return translationFile;
    }

    private getTranslationInputId(fileId: string, sourceFileName: string | undefined) {
        const directory = path.dirname(fileId);
        if (directory === ".") {
            return sourceFileName;
        }
        return `${path.dirname(fileId)}/${sourceFileName}`;
    }

    public async getTranslationTargetFile(projectId: string, projectFileId: string): Promise<TranslationTargetFile> {
        let fileContent: AWS.S3.Types.GetObjectOutput;
        try {
            fileContent = await this.s3BucketRepository.getBucketObjectContent(projectId, projectFileId);
        } catch(e) {
            throw new Error(`File ${path.basename(projectFileId)} does not exist.`);
        }
        if (fileContent.ContentLength! > 0) {
            const fileBody = JSON.parse(fileContent.Body!.toString());
            const translationFile: TranslationTargetFile = fileBody;
            const targetLanguage = fileBody['fb-locale'];
            if (!targetLanguage) {
                throw new Error(`Target language has not been specified in file ${path.basename(projectFileId)}`);
            }
            translationFile.locale = targetLanguage;
            return translationFile;
        }

        throw new Error(`File ${path.basename(projectFileId)} does not have valid format.`);
    }
}