export type SprintPresenceValidator = { todayIsHere: boolean; indice: number | null };


export function verifyIfIsWeekend(dia: number) {
  return dia === 0 || dia === 6;
}

export function calculateSprintPresenceValidator(dateList: Date[], hoje: Date): SprintPresenceValidator {
  return dateList.reduce((acc, data, indice) => {
    data.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);
    if (data.getTime() === hoje.getTime()) {
      acc.todayIsHere = true;
      acc.indice = indice;
    }
    return acc;
  }, { todayIsHere: false, indice: null } as SprintPresenceValidator);
}