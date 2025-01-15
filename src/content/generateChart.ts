import { getDateList } from "./time/getDateList";
import { getSprintRange } from "./time/getSprintRange";

export function generateChart(duration: string): void {
  const { endDate, startDate } = getSprintRange(duration);
  const dateList = getDateList(startDate, endDate);
  const diffInDays = dateList.length;
  const mapFinaisDeSemana = dateList.map(dia => dia.getDay());
  
  console.log(dateList);
  console.log(dateList.length, diffInDays);
  console.log(mapFinaisDeSemana);
}
