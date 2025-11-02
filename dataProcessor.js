
require('dotenv').config();
const { healthMetricsCounter } = require('./healthReader');
const { workoutCalculator } = require('./workoutReader');

async function processFiles() {
  try {
    const userName = process.env.USER_NAME || 'Alex';
    const weeklyGoal = parseInt(process.env.WEEKLY_GOAL, 10) || 0;

    console.log(`Processing data for: ${userName}`);
    console.log('Reading workout data...');
    const { totalWorkouts, totalMinutes } = await workoutCalculator('./data/workouts.csv');

    console.log('Reading health data...');
    const totalHealthEntries = await healthMetricsCounter('./data/health-metrics.json');

    console.log('\n=== SUMMARY ===');
    console.log(`Workouts found: ${totalWorkouts}`);
    console.log(`Total workout minutes: ${totalMinutes}`);
    console.log(`Health entries found: ${totalHealthEntries}`);
    console.log(`Weekly goal: ${weeklyGoal} minutes`);

    if (totalMinutes >= weeklyGoal) {
      console.log(`Congratulations ${userName}! You have exceeded your weekly goal!`);
    } else {
      console.log(`Keep going ${userName}! You need ${weeklyGoal - totalMinutes} more minutes to reach your goal.`);
    }
  } catch (error) {
    console.error(`Processing failed: ${error.message}`);
  }
}

processFiles();
