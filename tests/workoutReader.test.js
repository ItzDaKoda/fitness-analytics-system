const { workoutCalculator } = require('../workoutReader');

describe('workoutCalculator', () => {
  test('counts workouts and minutes correctly', async () => {
    const { totalWorkouts, totalMinutes } = await workoutCalculator('./data/workouts.csv');
    expect(totalWorkouts).toBe(10);
    expect(totalMinutes).toBe(330);
  });

  test('handles missing file gracefully', async () => {
    await expect(workoutCalculator('./data/missing.csv')).rejects.toThrow();
  });
});
