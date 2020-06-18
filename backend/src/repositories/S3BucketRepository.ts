import { ProjectContent } from '@entities/ProjectContent';
import ProjectFile from '@entities/ProjectFile';
import ProjectFolder from '@entities/ProjectFolder';
import * as AWS from "aws-sdk";
import path from "path";
import ProjectProvider from 'src/providers/ProjectProvider';
import S3BucketProvider from "./../providers/S3BucketProvider";

export default class S3BucketRepository {
    private readonly s3BucketProvider: S3BucketProvider = new S3BucketProvider();
    private readonly projectProvider: ProjectProvider = new ProjectProvider();

    async getBucketObjects(projectId: string, folderId: string | undefined): Promise<ProjectContent> {
      const s3 = this.s3BucketProvider.createS3Bucket(projectId);
      const bucketParams = {
        Bucket: this.projectProvider.getBucketName(projectId),
        Delimiter: '/',
        Prefix: folderId ? folderId : ""
      };
      const data: AWS.S3.Types.ListObjectsV2Output = await s3.listObjectsV2(bucketParams).promise();
      const sourceFileName = this.projectProvider.getSourceFileName(projectId);
      let projectFiles: ProjectFile[] = [];
      if (data.Contents) {
        projectFiles = data.Contents
        .filter(file=> path.extname(file.Key!) === ".json")
        .map((file)=> {
          const key: string = file.Key!;
          const fileName = path.basename(key);
          return new ProjectFile(key, fileName, fileName === sourceFileName);
        });
      }
      let projectFolders: ProjectFolder[] = [];
      if (data.CommonPrefixes) {
        projectFolders = data.CommonPrefixes?.map((folder)=> new ProjectFolder(folder.Prefix!, path.basename(folder.Prefix!)));
      }
      return new ProjectContent(projectId, projectFolders.concat(projectFiles).filter(item => item.id !== folderId));
  }

  async getBucketObjectContent(projectId: string, projectFileId: string | undefined): Promise<AWS.S3.Types.GetObjectOutput> {
    const s3 = this.s3BucketProvider.createS3Bucket(projectId);
    const bucketParams: AWS.S3.Types.GetObjectRequest = {
      Bucket: this.projectProvider.getBucketName(projectId),
      Key: projectFileId!
    };
    return s3.getObject(bucketParams).promise();
  }

  async deleteObject(projectId: string, projectItemId: string | undefined): Promise<AWS.S3.Types.DeleteObjectOutput> {
    const s3 = this.s3BucketProvider.createS3Bucket(projectId);
    const fileParams: AWS.S3.Types.GetObjectRequest = {
      Bucket: this.projectProvider.getBucketName(projectId),
      Key: projectItemId!
    };
    return s3.deleteObject(fileParams).promise();
  }

  async putObject(projectId: string, projectItemId: string): Promise<AWS.S3.Types.PutObjectOutput> {
    const s3 = this.s3BucketProvider.createS3Bucket(projectId);
    const fileParams: AWS.S3.Types.PutObjectRequest = {
      Bucket: this.projectProvider.getBucketName(projectId),
      Key: projectItemId
    };
    return s3.putObject(fileParams).promise();
  }

  async putContentObject(projectId: string, projectItemId: string, fileContent: string|Buffer): Promise<AWS.S3.Types.PutObjectOutput> {
    const s3 = this.s3BucketProvider.createS3Bucket(projectId);
    const fileParams: AWS.S3.Types.PutObjectRequest = {
      Bucket: this.projectProvider.getBucketName(projectId),
      Key: projectItemId,
      Body: fileContent
    };
    return s3.putObject(fileParams).promise();
  }
}

