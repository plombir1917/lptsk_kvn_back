import * as Minio from 'minio';
import { FileUpload } from 'src/upload/file-upload.interface';

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

  async uploadFile(filename: string, buffer: Buffer, mimetype: string) {
    try {
      await this.createBucketIfNotExist();
      const res = await this.minioClient.putObject(
        this.bucketName,
        filename,
        buffer,
        buffer.length,
        {
          'Content-Type': mimetype,
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getFileLink(filename: string): Promise<string> {
    try {
      console.log('start');
      const url = await this.minioClient.presignedUrl(
        'GET',
        this.bucketName,
        filename,
      );
      return url;
    } catch (error) {
      throw error;
    }
  }
}
