import express from "express";
const router = express.Router();
import { registerUser, loginUser, changePassword, deleteAccount ,forgetPassword} from "./user.controller.js";


// All Routes

// 1. register 
router.post('/auth/register', registerUser);
// 2. loginUser
router.post('/auth/login', loginUser);
// 3. change-password 
router.post('/users/change-password', changePassword)
// 4. deleteAccount
router.get('/users/me', deleteAccount);
// 5. forgetPassword 
router.get('/users/forget-password',forgetPassword);




// exports routes 
export default router;