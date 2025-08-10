import express from 'express';
import { getUser, logOut, login, register, verifyOtp } from '../controllers/authController.js'
import { isAuthenticated } from '../middlewares/authMIddlewares.js';

const router = express.Router();

router.post('/register', register);

router.post('/verify-otp', verifyOtp);

router.post('/login', login);

router.get('/logout',isAuthenticated, logOut);

router.get('/me',isAuthenticated, getUser);

export default router;