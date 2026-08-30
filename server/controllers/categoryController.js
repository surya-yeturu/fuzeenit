import Category from '../models/Category.js';
import { asyncHandler, sendSuccess } from '../utils/apiResponse.js';

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true })
    .sort({ order: 1 })
    .lean();

  sendSuccess(res, categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  sendSuccess(res, category, 201);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  sendSuccess(res, category);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  sendSuccess(res, { message: 'Category deleted successfully' });
});
