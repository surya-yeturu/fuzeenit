import Enquiry from '../models/Enquiry.js';
import { asyncHandler, sendSuccess } from '../utils/apiResponse.js';
import {
  validateEmail,
  validatePhone,
  validateRequired,
  sanitizeString,
} from '../utils/validators.js';

export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, interestedCourse, message } = req.body;

  const errors = {};
  const nameError = validateRequired(name, 'Name');
  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (phoneError) errors.phone = phoneError;

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  const enquiry = await Enquiry.create({
    name: sanitizeString(name),
    phone: sanitizeString(phone),
    email: sanitizeString(email).toLowerCase(),
    interestedCourse: sanitizeString(interestedCourse || ''),
    message: sanitizeString(message || ''),
    source: 'expert-modal',
  });

  sendSuccess(res, { message: 'Enquiry submitted successfully', id: enquiry._id }, 201);
});

export const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
  sendSuccess(res, enquiries);
});
