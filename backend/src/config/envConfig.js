import { config } from "dotenv";
config();

const envConfig = Object.freeze({
  port: process.env.PORT,
});

export default envConfig;