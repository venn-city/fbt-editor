import * as AWS from "aws-sdk";
import ProjectProvider from './ProjectProvider';
import ProjectConfiguration from '@entities/ProjectConfiguration';

export default class S3BucketProvider {
    public projectProvider: ProjectProvider = new ProjectProvider();

    createS3Bucket(projectName: string): AWS.S3 {
        var projectConfiguration: ProjectConfiguration | null = this.projectProvider.getProject(projectName);
        if (!projectConfiguration) {
            throw new Error(`Project '${projectName}' does not exist.` )
        }
        AWS.config.secretAccessKey = projectConfiguration.secretAccessKey;
        AWS.config.accessKeyId = projectConfiguration.accessKeyId;
        const s3 = new AWS.S3({
            apiVersion: "2006-03-01"
        });
        return s3;
    }
}