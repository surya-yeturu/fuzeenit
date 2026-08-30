import { Router } from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController.js';
import { formRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', formRateLimiter, createEnquiry);
router.get('/', getEnquiries);

export default router;
