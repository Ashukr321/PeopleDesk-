import { config } from "dotenv";
config();

const envConfig = Object.freeze({
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  db_name: process.env.DB_NAME,
  user_email: process.env.USER_EMAIL,
  user_email_password: process.env.USER_EMAIL_PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
  jwt_token_expires_in: process.env.JWT_TOKEN_EXPIRES_IN
});

export default envConfig;