import ContactMessage from '../models/ContactMessage.js';
import { asyncHandler, sendSuccess } from '../utils/apiResponse.js';
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMinLength,
  sanitizeString,
} from '../utils/validators.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    courseInterestedIn,
    experienceLevel,
    message,
  } = req.body;

  const errors = {};
  const nameError = validateRequired(fullName, 'Full name');
  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);
  const messageError =
    validateRequired(message, 'Message') || validateMinLength(message, 10, 'Message');

  if (nameError) errors.fullName = nameError;
  if (emailError) errors.email = emailError;
  if (phoneError) errors.phone = phoneError;
  if (messageError) errors.message = messageError;

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  const contactMessage = await ContactMessage.create({
    fullName: sanitizeString(fullName),
    email: sanitizeString(email).toLowerCase(),
    phone: sanitizeString(phone),
    courseInterestedIn: sanitizeString(courseInterestedIn || ''),
    experienceLevel: experienceLevel || '',
    message: sanitizeString(message),
  });

  sendSuccess(
    res,
    { message: 'Message sent successfully', id: contactMessage._id },
    201
  );
});

export const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  sendSuccess(res, messages);
});
