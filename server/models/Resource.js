import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['AI', 'Data', 'Development', 'Cloud', 'Career', 'Interview Preparation'],
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    readingTime: {
      type: String,
      default: '5 min read',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

resourceSchema.index({ category: 1 });
resourceSchema.index({ title: 'text', shortDescription: 'text' });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
