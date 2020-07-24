import ProjectConfiguration from "@entities/project/ProjectConfiguration";
import ProjectProvider from "src/providers/ProjectProvider";
import S3BucketProvider from "src/providers/S3BucketProvider";

describe("S3BucketProvider", () => {
  const projectId = "testName";
  const accessKeyId = "accessKeyId";
  const secretAccessKey = "secretAccessKey";
  let bucketProvider: S3BucketProvider;

  beforeAll((done) => {
    bucketProvider = new S3BucketProvider();
    done();
  });

  it(`should return s3 with settings`, (done) => {
    const projectConfiguration = new ProjectConfiguration(
      "testName",
      "test",
      "accessKeyId",
      "secretAccessKey",
      "",
      ""
    );
    spyOn(ProjectProvider.prototype, "getProject").and.returnValue(
      projectConfiguration
    );

    const s3bucket = bucketProvider.createS3Bucket(projectId);

    expect(s3bucket.config.credentials?.secretAccessKey).toEqual(
      secretAccessKey
    );
    expect(s3bucket.config.credentials?.accessKeyId).toEqual(accessKeyId);
    done();
  });
});
