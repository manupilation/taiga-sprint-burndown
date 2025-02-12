import { SprintPresenceValidator, verifyIfIsWeekend } from "./date";

function clearValorDoDia(total: number, quantidadeHoras: number): number {
  return Number(Math.max(0, total - quantidadeHoras).toFixed(2));
}

export function calculateValoresLaboraisDiarios(
  mapDiasDeSemana: number[],
  totalHora: number,
  quantidadeTrabalhoDiarioEmHoras: number
): number[] {
  return mapDiasDeSemana.reduce((acc, curr, i) => {
    if (i === 0) {
      acc.push(totalHora);
      return acc;
    }
    const ehFimDeSemana = verifyIfIsWeekend(curr);
    const total = acc.at(-1);
    const valorDoDia = ehFimDeSemana ? total : clearValorDoDia(total, quantidadeTrabalhoDiarioEmHoras);
    acc.push(valorDoDia);
    return acc;
  }, [] as number[]);
}

export function generateTrabalhoConcluido(
  mapDiasDeSemana: number[],
  totalHora: number,
  totalFaltando: number,
  { indice, todayIsHere }: SprintPresenceValidator
): (number | null)[] {
  const trabalhoConcluido = new Array(mapDiasDeSemana.length).fill(null);
  trabalhoConcluido[0] = totalHora;
  trabalhoConcluido[trabalhoConcluido.length - 1] = totalFaltando;
  if (todayIsHere && indice !== null) {
    trabalhoConcluido[indice] = totalFaltando;
  }
  return trabalhoConcluido;
}