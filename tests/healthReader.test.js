const { healthMetricsCounter } = require('../healthReader');
const fs = require('fs').promises;

describe('healthMetricsCounter', () => {
  test('counts entries correctly in valid JSON', async () => {
    const count = await healthMetricsCounter('./data/health-metrics.json');
    expect(count).toBe(8); // Matches your health-metrics.json data
  });

  test('returns 0 when file is missing', async () => {
    const count = await healthMetricsCounter('./data/missing.json');
    expect(count).toBe(0);
  });

  test('handles invalid JSON gracefully', async () => {
    await fs.writeFile('./data/bad.json', '{invalid-json}');
    const count = await healthMetricsCounter('./data/bad.json');
    expect(count).toBe(0);
  });
});
