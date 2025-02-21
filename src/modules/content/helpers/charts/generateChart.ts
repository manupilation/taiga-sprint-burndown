import { getDateList } from "../time/getDateList";
import { getSprintRange } from "../time/getSprintRange";
import { renderChart } from "./config";
import { calculateSprintPresenceValidator, verifyIfIsWeekend } from "./utils/date";
import { calculateValoresLaboraisDiarios, generateTrabalhoConcluido } from "./utils/values";

type SquadInfos = {
  totalHR: string;
  totalClosed: string;
  duration: string;
};

export function generateChartData(squadInfos: SquadInfos): HTMLDivElement {
  const hoje = new Date();
  const { duration, totalHR, totalClosed } = Object.assign({}, squadInfos);
  const totalHora = Number(totalHR);
  const totalFaltando = totalHora - +totalClosed;

  const { endDate, startDate } = getSprintRange(duration);
  const dateList = getDateList(startDate, endDate);
  const diffInDays = dateList.length;

  const mapDiasDeSemana = dateList.map((dia) => dia.getDay());
  const mapFinalDeSemana = mapDiasDeSemana.filter(verifyIfIsWeekend).length;
  const getQuantidadeDeDiasLaborativos = diffInDays - mapFinalDeSemana - 1;
  const quantidadeTrabalhoDiarioEmHoras = totalHora / getQuantidadeDeDiasLaborativos;

  const valoresLaboraisDiarios = calculateValoresLaboraisDiarios(
    mapDiasDeSemana,
    totalHora,
    quantidadeTrabalhoDiarioEmHoras
  );

  const getIfHojeIsInsideDateList = calculateSprintPresenceValidator(dateList, hoje);

  const valoresLaboraisPagos = generateTrabalhoConcluido(
    mapDiasDeSemana,
    totalHora,
    totalFaltando,
    getIfHojeIsInsideDateList
  );

  const labelsFromDateList: string[] = dateList.map(date => {
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}`;
  });

  return renderChart(
    labelsFromDateList,
    valoresLaboraisDiarios,
    valoresLaboraisPagos
  )
}