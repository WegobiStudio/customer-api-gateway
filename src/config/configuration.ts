export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',
  corsOrigins: process.env.CORS_ORIGINS || '*',
  services: {
    users: {
      url: process.env.USERS_SERVICE_URL || 'http://localhost:3001',
      timeout: parseInt(process.env.USERS_SERVICE_TIMEOUT || '30000', 10), // Increased from 15000 to 30000
      retryCount: parseInt(process.env.USERS_SERVICE_RETRY_COUNT || '3', 10),
      retryDelay: parseInt(process.env.USERS_SERVICE_RETRY_DELAY || '1000', 10),
    },
    auth: {
      url: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
      timeout: parseInt(process.env.AUTH_SERVICE_TIMEOUT || '5000', 10),
      retryCount: parseInt(process.env.AUTH_SERVICE_RETRY_COUNT || '3', 10),
      retryDelay: parseInt(process.env.AUTH_SERVICE_RETRY_DELAY || '1000', 10),
    },
  },
  retry: {
    defaultCount: parseInt(process.env.DEFAULT_RETRY_COUNT || '3', 10),
    defaultDelay: parseInt(process.env.DEFAULT_RETRY_DELAY || '1000', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecret',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3BucketName: process.env.AWS_S3_BUCKET_NAME,
  },
});
