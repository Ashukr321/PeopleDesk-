import createError from 'http-errors'

// create globalErrorHandler Function 
const globalErrorHandler = (err, req, res, next) => {

  if (!err.status) {
    const err = createError(500, "Internal Server Error");
    return next(err);
  }

  // send response 
  return res.status(err.status).json({
    success: false,
    message: err.message || "Something Went Wrong!"
  })
  
}


export default globalErrorHandler;