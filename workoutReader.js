
const fs = require('fs');
const csv = require('csv-parser');

async function workoutCalculator(filePath) {
  return new Promise((resolve, reject) => {
    let totalWorkouts = 0;
    let totalMinutes = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        totalWorkouts++;

        // Handle "duration" column (your CSV uses this name)
        const minutes = parseInt(
          row.duration || row.minutes || row.Minutes || row.time || row.Time || 0,
          10
        );

        if (!isNaN(minutes)) {
          totalMinutes += minutes;
        }
      })
      .on('end', () => {
        console.log(`Total workouts: ${totalWorkouts}`);
        console.log(`Total minutes: ${totalMinutes}`);
        resolve({ totalWorkouts, totalMinutes });
      })
      .on('error', (err) => {
        console.error(`Error reading CSV file: ${err.message}`);
        reject(err);
      });
  });
}

module.exports = { workoutCalculator };
