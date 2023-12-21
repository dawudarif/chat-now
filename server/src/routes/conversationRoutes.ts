import express from 'express';
import {
  allConversations,
  createConversation,
  markConversationAsRead,
} from '../controllers/conversationControllers'
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/create').post(protect, createConversation);
router.route('/all').get(protect, allConversations);
router.route('/mark-read').post(protect, markConversationAsRead);

export default router;