import express from 'express';
import { createUserProfile , getProfileDetails,updateProfileDetails,profilePicUpdate} from './profile.controller.js';
import isAuthenticate from '../../middlewares/isAuthenticate.js'

const router = express.Router();

// 1 createProfile 
router.post('/profile', isAuthenticate,createUserProfile);

// 2 getProfile 
router.get('/profile/me',isAuthenticate,getProfileDetails);

// 3 updateProfileDetails
router.put('/profile/update',isAuthenticate,updateProfileDetails);

// 4 profilePicUpdate
router.put('/profile/profilePic',isAuthenticate,profilePicUpdate )


export default router;