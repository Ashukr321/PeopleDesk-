import { config } from "dotenv";
config();

const envConfig = Object.freeze({
  port: process.env.PORT,
  mongo_uri:process.env.MONGO_URI,
  db_name:process.env.DB_NAME
});

export default envConfig;