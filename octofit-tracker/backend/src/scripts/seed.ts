import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([Activity.deleteMany({}), Leaderboard.deleteMany({}), Team.deleteMany({}), User.deleteMany({}), Workout.deleteMany({})]);

    const [alex, jordan, sam] = await User.create([
      { name: 'Alex Morgan', email: 'alex@example.com', totalPoints: 180 },
      { name: 'Jordan Lee', email: 'jordan@example.com', totalPoints: 145 },
      { name: 'Sam Rivera', email: 'sam@example.com', totalPoints: 120 },
    ]);

    await Team.create({
      name: 'Octo Sprinters',
      description: 'A team focused on consistent daily movement.',
      members: [alex._id, jordan._id, sam._id],
    });

    await Activity.create([
      { user: alex._id, type: 'Run', durationMinutes: 30, calories: 280, points: 80 },
      { user: jordan._id, type: 'Cycling', durationMinutes: 45, calories: 360, points: 70 },
      { user: sam._id, type: 'Strength training', durationMinutes: 35, calories: 220, points: 60 },
    ]);

    await Leaderboard.create({
      period: 'weekly',
      entries: [
        { user: alex._id, points: alex.totalPoints, rank: 1 },
        { user: jordan._id, points: jordan.totalPoints, rank: 2 },
        { user: sam._id, points: sam.totalPoints, rank: 3 },
      ],
    });

    await Workout.create([
      {
        title: 'Core Circuit',
        description: 'A quick core workout for a stronger foundation.',
        level: 'beginner',
        durationMinutes: 20,
        exercises: ['Plank', 'Dead bug', 'Bird dog'],
      },
      {
        title: 'Tempo Run',
        description: 'Build aerobic endurance with sustained effort.',
        level: 'intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
