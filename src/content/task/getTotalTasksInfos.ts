import { Task, TotalTaskInfo } from "../../interfaces";
import { sumTimes } from "../time/sumTimes";

export function getTotalTasksInfos(tasks: Task[]): TotalTaskInfo {
  let totalHR = '0.00';
  let totalClosedHR = '0.00';
  let totalClosed = 0;
  let totalNew = 0;
  const totalNewHR = tasks.filter(task => task.isNew).reduce((acc, task) => sumTimes(acc, task.hours), '0.00');
  const totalClosedNewHora = tasks.filter(task => task.isClosed && task.isNew).reduce((acc, task) => sumTimes(acc, task.hours), '0.00');
  const totalTypes = {};

  tasks.forEach((task) => {
    totalHR = sumTimes(totalHR, task.hours);
    totalTypes[task.type] = (totalTypes[task.type] || 0) + 1;
    totalClosed += task.isClosed ? 1 : 0;
    totalNew += task.isNew ? 1 : 0;

    if (task.isClosed) {
      totalClosedHR = sumTimes(totalClosedHR, task.hours);
    }
  });

  return {
    totalHR,
    totalTypes,
    totalClosed,
    totalClosedHR,
    totalNew,
    totalNewHR,
    totalClosedNewHora
  };
}