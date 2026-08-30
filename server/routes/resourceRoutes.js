import { Router } from 'express';
import {
  getResources,
  getResourceBySlug,
  createResource,
  updateResource,
  deleteResource,
} from '../controllers/resourceController.js';

const router = Router();

router.get('/', getResources);
router.get('/:slug', getResourceBySlug);
router.post('/', createResource);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

export default router;
