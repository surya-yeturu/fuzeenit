import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    interestedCourse: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
    source: {
      type: String,
      default: 'expert-modal',
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
