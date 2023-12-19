import express from 'express';
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
} from '../controllers/userControllers';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth', authUser);
router.route('/logout').get(protect, logoutUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
