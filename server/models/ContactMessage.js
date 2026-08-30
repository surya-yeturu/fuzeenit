import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    courseInterestedIn: {
      type: String,
      default: '',
      trim: true,
    },
    experienceLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional', ''],
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
