import * as Minio from 'minio';

export class MinioService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      useSSL: false,
      port: +process.env.MINIO_PORT,
    });
    this.bucketName = process.env.MINIO_BUCKET_NAME;
  }

  async createBucketIfNotExist() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);

    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'eu-west-1');
    }
  }

  async uploadFile(filename: string, filePath: string) {
    try {
      await this.minioClient.fPutObject(this.bucketName, filename, filePath);
      return true;
    } catch (error) {
      return false;
    }
  }
}
