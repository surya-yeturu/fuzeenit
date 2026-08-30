import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: true }
);

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    lessons: [lessonSchema],
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    technologies: [{ type: String, trim: true }],
    outcome: { type: String, default: '' },
  },
  { _id: true }
);

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
  },
  { _id: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
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
      required: [true, 'Category is required'],
      trim: true,
    },
    categorySlug: {
      type: String,
      required: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'All Levels',
    },
    mode: {
      type: String,
      enum: ['Online', 'Hybrid', 'Classroom'],
      default: 'Online',
    },
    price: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    technologies: [{ type: String, trim: true }],
    learningOutcomes: [{ type: String, trim: true }],
    curriculum: [moduleSchema],
    projects: [projectSchema],
    careerOutcomes: [{ type: String, trim: true }],
    faqs: [faqSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

courseSchema.index({ category: 1 });
courseSchema.index({ categorySlug: 1 });
courseSchema.index({ title: 'text', shortDescription: 'text', description: 'text' });
courseSchema.index({ featured: 1 });

const Course = mongoose.model('Course', courseSchema);

export default Course;
