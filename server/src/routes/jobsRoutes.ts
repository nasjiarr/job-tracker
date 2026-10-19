import { Router } from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  moveJob,
  addTimelineNote,
  deleteJob,
} from '../controllers/jobsController';
import { validateBody, validateQuery } from '../middleware/validate';
import {
  CreateJobSchema,
  UpdateJobSchema,
  MoveJobSchema,
  CreateTimelineNoteSchema,
  JobFilterQuerySchema,
} from '@shared/schemas';

const router = Router();

router.get('/', validateQuery(JobFilterQuerySchema), getJobs);
router.get('/:id', getJobById);
router.post('/', validateBody(CreateJobSchema), createJob);
router.put('/:id', validateBody(UpdateJobSchema), updateJob);
router.patch('/:id/move', validateBody(MoveJobSchema), moveJob);
router.post('/:id/timelines', validateBody(CreateTimelineNoteSchema), addTimelineNote);
router.delete('/:id', deleteJob);

export default router;
