import * as Minio from 'minio';
import { FileUpload } from 'graphql-upload/GraphQLUpload.js';

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

  async uploadFile(photo: Promise<FileUpload>) {
    try {
      const file: FileUpload = await photo;

      const { createReadStream, filename, mimetype } = file;

      const buffer = await this.streamToBuffer(createReadStream());
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

  private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }
}
