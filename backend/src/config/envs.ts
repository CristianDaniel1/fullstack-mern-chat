process.loadEnvFile();

export const {
  PORT = 3000,
  CLIENT_PATH = 'frontend',
  MONGO_URL,
  MONGO_DB_NAME,
  JWT_SECRET,
  NODE_ENV,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
