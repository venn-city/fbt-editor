import * as AWS from "aws-sdk";
import S3BucketProvider from "./../providers/S3BucketProvider";
import { ProjectContent } from '@entities/ProjectContent';
import ProjectFile from '@entities/ProjectFile';
import ProjectFolder from '@entities/ProjectFolder';
import path from "path";
import ProjectProvider from 'src/providers/ProjectProvider';

export default class S3BucketRepository {
    private s3BucketProvider: S3BucketProvider = new S3BucketProvider();
    private readonly projectProvider: ProjectProvider = new ProjectProvider();

    async getBucketObjects(projectName: string, folderId: string | undefined): Promise<ProjectContent> {
      var s3 = this.s3BucketProvider.createS3Bucket(projectName);
      var bucketParams = {
        Bucket: projectName,
        Delimiter: '/',
        Prefix: folderId ? folderId : ""
      };
      var data: AWS.S3.Types.ListObjectsV2Output = await s3.listObjectsV2(bucketParams).promise();
      var projectFiles: ProjectFile[] = []; 
      if (data.Contents) {
        projectFiles = data.Contents.map((file)=> new ProjectFile(file.Key!, path.basename(file.Key!)));
      }
      var projectFolders: ProjectFolder[] = [];
      if (data.CommonPrefixes) {
        projectFolders = data.CommonPrefixes?.map((folder)=> new ProjectFolder(folder.Prefix!, path.basename(folder.Prefix!)));
      }
      var sourceFileName = this.projectProvider.getSourceFileName(projectName);
      return new ProjectContent(projectName, projectFolders.concat(projectFiles).filter(item => item.id != folderId && !item.id.endsWith(sourceFileName)));
  }

  async getBucketObjectContent(projectName: string, projectFileId: string | undefined): Promise<AWS.S3.Types.GetObjectOutput> {
    var s3 = this.s3BucketProvider.createS3Bucket(projectName);
    var bucketParams: AWS.S3.Types.GetObjectRequest = {
      Bucket: projectName,
      Key: projectFileId!
    };
    return await s3.getObject(bucketParams).promise();
  }

  async deleteObject(projectName: string, projectItemId: string | undefined): Promise<AWS.S3.Types.DeleteObjectOutput> {
    var s3 = this.s3BucketProvider.createS3Bucket(projectName);
    var fileParams: AWS.S3.Types.GetObjectRequest = {
      Bucket: projectName,
      Key: projectItemId!
    };
    return await s3.deleteObject(fileParams).promise();
  }

  async putObject(projectName: string, projectItemId: string): Promise<AWS.S3.Types.PutObjectOutput> {
    var s3 = this.s3BucketProvider.createS3Bucket(projectName);
    var fileParams: AWS.S3.Types.PutObjectRequest = {
      Bucket: projectName,
      Key: projectItemId
    };
    return await s3.putObject(fileParams).promise();
  }

  async putContentObject(projectName: string, projectItemId: string, fileContent: string|Buffer): Promise<AWS.S3.Types.PutObjectOutput> {
    var s3 = this.s3BucketProvider.createS3Bucket(projectName);
    var fileParams: AWS.S3.Types.PutObjectRequest = {
      Bucket: projectName,
      Key: projectItemId, 
      Body: fileContent
    };
    return await s3.putObject(fileParams).promise();
  }
}

