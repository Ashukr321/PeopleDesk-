import mongoose from "mongoose";
import envConfig from "./envConfig.js";

// connectDb 
const connectDb = async () => {
  try {
    const db = await mongoose.connect(envConfig.mongo_uri, {
      dbName: envConfig.db_name,
      maxPoolSize: 10
    });
    console.log(`✅ Database Connected Successfully! Host: ${db.connection.host}`);
  } catch (error) {
    console.log(`❌ Failed to Connect MongoDB Database`);
    console.error(error); // Show error details for debugging
  }
}

// export connectDb
export default connectDb;
