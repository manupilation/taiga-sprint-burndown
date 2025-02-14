export function getDateList(start: Date, end: Date): Date[] {
  const dateList = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    dateList.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
};
