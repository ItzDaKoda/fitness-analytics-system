
const fs = require('fs').promises;

async function healthMetricsCounter(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    if (!jsonData.metrics || !Array.isArray(jsonData.metrics)) {
      throw new Error('Invalid JSON format: Missing "metrics" array.');
    }

    const totalEntries = jsonData.metrics.length;
    console.log(`Total health entries: ${totalEntries}`);
    return totalEntries;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Error: File not found at ${filePath}`);
    } else if (error.name === 'SyntaxError') {
      console.error('Error: Invalid JSON structure.');
    } else {
      console.error(`Unexpected error: ${error.message}`);
    }
    return 0;
  }
}

module.exports = { healthMetricsCounter };

