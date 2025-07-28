import express from 'express';
import { createUserProfile , getProfileDetails,updateProfileDetails} from './profile.controller.js';

const router = express.Router();

// 1 createProfile 
router.post('/profile', createUserProfile);

// 2 getProfile 
router.get('/profile/me',getProfileDetails);

// 3 updateProfileDetails
router.put('/profile/update',updateProfileDetails);




export default router;