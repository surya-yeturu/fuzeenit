import { Router } from 'express';
import {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  getFeaturedCourses,
} from '../controllers/courseController.js';

const router = Router();

router.get('/featured', getFeaturedCourses);
router.get('/', getCourses);
router.get('/:slug', getCourseBySlug);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
