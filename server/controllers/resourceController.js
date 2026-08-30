import Resource from '../models/Resource.js';
import { AppError, asyncHandler, sendSuccess } from '../utils/apiResponse.js';

export const getResources = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 12 } = req.query;

  const query = { isPublished: true };

  if (category && category !== 'all') {
    query.category = category;
  }

  if (search) {
    const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    query.$or = [
      { title: regex },
      { shortDescription: regex },
      { content: regex },
    ];
  }

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const [resources, total] = await Promise.all([
    Resource.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-content')
      .lean(),
    Resource.countDocuments(query),
  ]);

  sendSuccess(res, resources, 200, {
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

export const getResourceBySlug = asyncHandler(async (req, res) => {
  const resource = await Resource.findOne({
    slug: req.params.slug,
    isPublished: true,
  }).lean();

  if (!resource) {
    throw new AppError('Resource not found', 404);
  }

  sendSuccess(res, resource);
});

export const createResource = asyncHandler(async (req, res) => {
  const resource = await Resource.create(req.body);
  sendSuccess(res, resource, 201);
});

export const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!resource) {
    throw new AppError('Resource not found', 404);
  }

  sendSuccess(res, resource);
});

export const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);

  if (!resource) {
    throw new AppError('Resource not found', 404);
  }

  sendSuccess(res, { message: 'Resource deleted successfully' });
});
