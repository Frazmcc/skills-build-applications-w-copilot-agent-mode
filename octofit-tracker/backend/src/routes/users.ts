import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ totalPoints: -1, name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    next(error);
  }
});

export default router;