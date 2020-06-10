import S3BucketRepository from 'src/repositories/S3BucketRepository';
import path from 'path';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import ProjectProvider from './ProjectProvider';

export default class TranslationFilesProvider {
    private readonly s3BucketRepository: S3BucketRepository = new S3BucketRepository();
    private readonly projectProvider: ProjectProvider = new ProjectProvider();

    public async getTranslationSourceFile(projectName: string, fileId: string): Promise<TranslationSourceFile> {
        var sourceFileName = this.projectProvider.getSourceFileName(projectName);
        var translationInputId = this.getTranslationInputId(fileId, sourceFileName);
        try {
            var fileContent: AWS.S3.Types.GetObjectOutput = await this.s3BucketRepository.getBucketObjectContent(projectName, translationInputId);
        }
        catch(e) {
            throw new Error(`File ${path.basename(sourceFileName)} does not exist in folder.`)
        }
        var translationFile: TranslationSourceFile = JSON.parse(fileContent.Body!.toString()) as TranslationSourceFile
        if (!translationFile) {
            throw new Error(`File ${sourceFileName} does not have valid format.`)
        }
        return translationFile;
    }

    private getTranslationInputId(fileId: string, sourceFileName: string | undefined) {
        const directory = path.dirname(fileId)
        if (directory == ".") {
            return sourceFileName;
        }
        return path.dirname(fileId) + "/" + sourceFileName;
    }

    public async getTranslationTargetFile(projectName: string, projectFileId: string): Promise<TranslationTargetFile> {
        try {
            var fileContent: AWS.S3.Types.GetObjectOutput = await this.s3BucketRepository.getBucketObjectContent(projectName, projectFileId);
        }
        catch(e) {
            throw new Error(`File ${path.basename(projectFileId)} does not exist.`)
        }
        if (fileContent.ContentLength! > 0) {
            var fileBody = JSON.parse(fileContent.Body!.toString());
            var translationFile: TranslationTargetFile = fileBody;
            translationFile.locale = fileBody['fb-locale'];
            return translationFile
        }
        
        return new TranslationTargetFile("default", {});
    }
}