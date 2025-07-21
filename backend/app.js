import app from './src/index.js';
import envConfig from './src/config/envConfig.js';

// start Server & listen 
const startServer = async () => {
  try {
    app.listen(envConfig.port, () => {
      console.log(`✅ server listening on port ${envConfig.port}`);
    })
  } catch (error) {
    console.log(console.log(`❌ server failed to run `))
  }
}
// call startServer function 
startServer();