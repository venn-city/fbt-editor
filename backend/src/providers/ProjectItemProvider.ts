import CreateItemRequest from "@entities/CreateItemRequest";
import TranslationSourceFile from "@entities/translation/TranslationSourceFile";
import TranslationTargetFile from "@entities/translation/TranslationTargetFile";
import { UploadedFile } from "express-fileupload";
import path from "path";
import S3BucketRepository from "src/repositories/S3BucketRepository";
import ProjectProvider from "./ProjectProvider";

export default class ProjectItemProvider {
  private readonly s3BucketRepository: S3BucketRepository = new S3BucketRepository();
  private readonly bucketRepository: S3BucketRepository = new S3BucketRepository();
  private readonly projectProvider: ProjectProvider = new ProjectProvider();

  public async deleteFile(
    projectId: string,
    projectFileId: string
  ): Promise<boolean> {
    const result = await this.s3BucketRepository.deleteObject(
      projectId,
      projectFileId
    );
    return result.RequestCharged !== null;
  }

  public async createItem(
    createItemRequest: CreateItemRequest
  ): Promise<boolean> {
    const extName: string = path.extname(createItemRequest.name);
    const parentFolderId: string = createItemRequest.parentFolderId
      ? createItemRequest.parentFolderId
      : "";
    let itemId: string = "";
    if (extName) {
      itemId = `${parentFolderId}${createItemRequest.name}`;
      const translationTargetFile = new TranslationTargetFile(
        createItemRequest.targetLanguage,
        {}
      );
      return this.createFile(
        createItemRequest.projectId,
        itemId,
        translationTargetFile
      );
    }

    itemId = `${parentFolderId}${createItemRequest.name}/`;
    await this.s3BucketRepository.putObject(
      createItemRequest.projectId,
      itemId
    );
    return true;
  }

  public async createFile(
    projectId: string,
    projectFileId: string,
    translationTargetFile: TranslationTargetFile
  ): Promise<boolean> {
    // tslint:disable-next-line: no-any
    const file: any = {
      translations: translationTargetFile.translations,
    };
    file["fb-locale"] = translationTargetFile.locale;
    await this.s3BucketRepository.putContentObject(
      projectId,
      projectFileId,
      JSON.stringify(file)
    );
    return true;
  }

  public async uploadItem(
    projectId: string,
    parentFolderId: string,
    file: UploadedFile
  ): Promise<boolean> {
    if (path.extname(file.name) !== ".json") {
      throw new Error(`File does not have a valid extension.`);
    }
    try {
      const translationSourceFile: TranslationSourceFile = JSON.parse(
        file.data.toString()
      ) as TranslationSourceFile;
      if (
        !translationSourceFile.phrases ||
        translationSourceFile.phrases.length === 0
      ) {
        throw new Error();
      }
    } catch (e) {
      throw new Error(`File does not have a valid format.`);
    }
    const sourceFileName = this.projectProvider.getSourceFileName(projectId);
    const translationSourceId = this.getTranslationSourceId(
      parentFolderId,
      sourceFileName
    );
    await this.bucketRepository.putContentObject(
      projectId,
      translationSourceId!,
      file.data
    );
    return true;
  }

  private getTranslationSourceId(
    folderId: string,
    sourceFileName: string | undefined
  ) {
    if (!folderId) {
      return sourceFileName;
    }
    return folderId + sourceFileName;
  }
}
