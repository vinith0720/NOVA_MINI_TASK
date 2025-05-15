import multer from 'multer';
import multers3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

export const bucket = process.env.AWS_BUCKET;

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  Credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const awsUpload = multer({
  storage: multers3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    // acl : "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cd) => {
      const fileName = `uploads/${Date.now()}-${file.originalname}`;
      cd(null, fileName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('file');

export default awsUpload;
