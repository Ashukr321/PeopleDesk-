import express from "express";
const router = express.Router();
import { registerUser, loginUser, changePassword, deleteAccount, forgetPassword, verifyOtp } from "./user.controller.js";
import isAuthenticate from "../../middlewares/isAuthenticate.js";
// 1. register 
router.post('/auth/register', registerUser);
// 2. loginUser
router.post('/auth/login', loginUser);
// 6. verify top
router.post('/auth/verify-otp', verifyOtp);

// 3. change-password 
router.post('/users/change-password', isAuthenticate, changePassword)
// 4. deleteAccount
router.get('/users/me', isAuthenticate, deleteAccount);


// 5. forgetPassword 
// No auth middleware here — because user is not logged in
router.get('/users/forget-password', forgetPassword);

// exports routes 
export default router;