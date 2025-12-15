import express from 'express';
import { getAllUsers, registerNewAdmin } from '../controllers/userController.js';
import { isAuthenticated, isAuthorized } from '../middlewares/authMIddlewares.js';

const router = express.Router();

router.get('/all', isAuthenticated, isAuthorized("Admin"), getAllUsers);
router.post('/add/new-admin', isAuthenticated,  registerNewAdmin);

export default router;