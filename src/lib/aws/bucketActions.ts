'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { S3 } from '../aws';
import { v4 as uuid } from 'uuid';

const Bucket = process.env.AWS_S3_BUCKET_NAME;

export const uploadImageToS3 = async (file: File) => {
  try {
    const key = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const Key = `${uuid()}-${key}`;

    const putCommand = new PutObjectCommand({
      Bucket,
      Key,
      Body: buffer,
      ContentType: file.type,
    });

    await S3.send(putCommand);

    return { url: `https://${process.env.AWS_CLOUD_FRONT}/${Key}` };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
};