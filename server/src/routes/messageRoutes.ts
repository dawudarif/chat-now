import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { sendMessage } from '../controllers/messageController';

const router = express.Router();

router.route('/send').post(protect, sendMessage);

export default router;
