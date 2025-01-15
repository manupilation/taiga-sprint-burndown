export function getSprintRange(duration: string): {
  startDate: Date,
  endDate: Date,
} {
  try {
    const [startStr, endStr] = duration.split(" to ").map(date => date.trim());
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);

    return {
      startDate,
      endDate,
    };
  } catch (error) {
    return {
      startDate: new Date(),
      endDate: new Date(),
    };
  }
}
