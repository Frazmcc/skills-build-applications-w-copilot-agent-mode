import { Router } from 'express';
import { Leaderboard, User } from '../models';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const users = await User.find().sort({ totalPoints: -1, name: 1 });
    response.json(users.map((user, index) => ({ rank: index + 1, user, points: user.totalPoints })));
  } catch (error) {
    next(error);
  }
});

router.get('/:period', async (request, response, next) => {
  try {
    const leaderboard = await Leaderboard.findOne({ period: request.params.period }).populate('entries.user', 'name email');
    if (!leaderboard) {
      response.status(404).json({ error: 'Leaderboard not found' });
      return;
    }
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;