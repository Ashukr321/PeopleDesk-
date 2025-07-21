import express from 'express';
// import routes

// create server 
const app = express();


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


// export express app 
export default app;