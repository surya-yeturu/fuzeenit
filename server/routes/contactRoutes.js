import { Router } from 'express';
import {
  createContactMessage,
  getContactMessages,
} from '../controllers/contactController.js';
import { formRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', formRateLimiter, createContactMessage);
router.get('/', getContactMessages);

export default router;
