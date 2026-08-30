import Course from '../models/Course.js';
import { AppError, asyncHandler, sendSuccess } from '../utils/apiResponse.js';

export const getCourses = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    sort = 'newest',
    page = 1,
    limit = 9,
    featured,
  } = req.query;

  const query = { isActive: true };

  if (search) {
    const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    query.$or = [
      { title: regex },
      { shortDescription: regex },
      { description: regex },
      { category: regex },
    ];
  }

  if (category && category !== 'all') {
    query.categorySlug = category.toLowerCase();
  }

  if (featured === 'true') {
    query.featured = true;
  }

  let sortOption = { createdAt: -1 };
  switch (sort) {
    case 'title':
      sortOption = { title: 1 };
      break;
    case 'duration':
      sortOption = { duration: 1 };
      break;
    case 'level':
      sortOption = { level: 1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const [courses, total] = await Promise.all([
    Course.find(query).sort(sortOption).skip(skip).limit(limitNum).lean(),
    Course.countDocuments(query),
  ]);

  sendSuccess(res, courses, 200, {
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

export const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    slug: req.params.slug,
    isActive: true,
  }).lean();

  if (!course) {
    throw new AppError('Course not found', 404);
  }

  sendSuccess(res, course);
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  sendSuccess(res, course, 201);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    throw new AppError('Course not found', 404);
  }

  sendSuccess(res, course);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    throw new AppError('Course not found', 404);
  }

  sendSuccess(res, { message: 'Course deleted successfully' });
});

export const getFeaturedCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ featured: true, isActive: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  sendSuccess(res, courses);
});
