import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import cors  from 'cors'
// import routes
import userRoutes from './modules/user/user.routes.js'
import profileRoutes from './modules/profile/profile.routes.js'
// create server 
const app = express();

// important configurations 
// enable cors
app.use(cors({
  origin:"*"
}))

app.use(express.json());


// baseUrl 
const baseUrl = "/api"
app.use(`${baseUrl}`, userRoutes);
app.use(`${baseUrl}`, profileRoutes);

// default route 
app.get('/', (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      about: "PeopleDesk is a full-featured, modern Contact Management Web App built with the MERN Stack (MongoDB, Express.js, React via Next.js, Node.js). Designed for users who want to efficiently organize and manage their personal and professional contacts, the app also supports advanced user profiles, authentication, and productivity tools."
    });
  } catch (error) {
    return next(error);
  }
});

// globalErrorHandler 
app.use(globalErrorHandler);

// export express app 
export default app;