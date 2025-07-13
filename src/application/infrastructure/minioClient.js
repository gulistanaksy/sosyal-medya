// src/infrastructure/minioClient.js
import { Client } from "minio";

const minioClient = new Client({
  endPoint: "minio",         // docker-compose'daki servis adı
  port: 9000,                // docker-compose'daki port
  useSSL: false,
  accessKey: "admin",        // docker-compose'daki MINIO_ROOT_USER
  secretKey: "admin123",     // docker-compose'daki MINIO_ROOT_PASSWORD
});

export default minioClient;
