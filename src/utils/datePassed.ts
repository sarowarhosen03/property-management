export default function datePassed(timestamp: number, limit = 24) {
  // Get the current time in milliseconds
  const now = Date.now();

  // Calculate the difference in milliseconds
  const difference = now - timestamp;

  // Check if the difference is greater than or equal to the limit (in hours) converted to milliseconds
  const limitInMilliseconds = limit * 60 * 60 * 1000;

  return difference >= limitInMilliseconds;
}
