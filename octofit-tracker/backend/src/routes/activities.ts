import { Router } from 'express';
import { Activity, User } from '../models';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user', 'name').sort({ performedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    await User.findByIdAndUpdate(activity.user, { $inc: { totalPoints: activity.points } });
    response.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

export default router;