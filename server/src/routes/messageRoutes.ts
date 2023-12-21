import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getMessages, sendMessage } from '../controllers/messageController';

const router = express.Router();

router.route('/send').post(protect, sendMessage);
router.route('/get-messages').get(protect, getMessages);


export default router;
