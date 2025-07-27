import jwt from 'jsonwebtoken'
import createError from 'http-errors';
import envConfig from '../config/envConfig.js'
const isAuthenticate = async (req, res, next) => {
  try {
    // check authHeader
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createError(401, 'Authorization header missing or invalid'));
    }
    const token = authHeader.split(' ')[1];
    // decodedToken 
    const decodedToken = jwt.verify(token, envConfig.jwt_secret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return next(createError(400, `Invalid Or Expired Token : ${error.message}`));
  }
}

export default isAuthenticate;