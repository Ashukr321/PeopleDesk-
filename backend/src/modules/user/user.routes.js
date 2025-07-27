import express from "express";
const router = express.Router();
import { registerUser, loginUser, changePassword, deleteAccount, forgetPassword, resetPassword, verifyOtp } from "./user.controller.js";
import isAuthenticate from "../../middlewares/isAuthenticate.js";

// 1. register 
router.post('/auth/register', registerUser);

// 2. loginUser
router.post('/auth/login', loginUser);

// 3. verify top
router.post('/auth/verify-otp', verifyOtp);

// 4. change-password 
router.post('/users/change-password', isAuthenticate, changePassword)

// 5. forgetPassword 
// No auth middleware here — because user is not logged in
router.post('/users/forget-password', forgetPassword);

// 6 resetPassword
router.put('/users/reset-password', resetPassword);

// 7. deleteAccount
router.get('/users/me', isAuthenticate, deleteAccount);

// exports routes 
export default router;