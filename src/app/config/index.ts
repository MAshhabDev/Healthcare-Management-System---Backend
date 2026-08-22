import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL!,
  bak_url: process.env.APP_URL,
  frontend_url: process.env.FRONTEND_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,
  google_client_id: process.env.GOOGLE_CLIENT_ID!,
  super_admin_name: process.env.SUPER_NAME!,
  super_admin_email: process.env.SUPER_EMAIL!,
  super_admin_password: process.env.SUPER_PASSWORD!,
  admin_name: process.env.ADMIN_NAME!,
  admin_email: process.env.ADMIN_EMAIL!,
  admin_password: process.env.ADMIN_PASSWORD!,
  redis_name: process.env.REDIS_NAME!,
  redis_password: process.env.REDIS_PASSWORD!,
  redis_host: process.env.REDIS_HOST!,
  redis_port: process.env.REDIS_PORT!,

  smtp_user: process.env.SMTP_NAME!,
  smtp_password: process.env.SMTP_PASSWORD!,

  cloudinary_cloud_name: process.env.CLOUD_NAME!,
  cloudinary_api_key: process.env.CLOUD_KEY!,
  cloudinary_api_secret: process.env.CLOUD_SECRET!,

  bkash_base_url: process.env.BKASH_BASE_URL!,
  bkash_username: process.env.BKASH_USERNAME!,
  bkash_password: process.env.BKASH_PASSWORD!,
  bkash_app_key: process.env.BKASH_APP_KEY!,
  bkash_app_secret: process.env.BKASH_APP_SECRET!,
};
