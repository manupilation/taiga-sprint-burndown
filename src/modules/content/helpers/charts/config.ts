import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  ChartConfiguration,
} from 'chart.js';
import { setChartEnv } from './utils/setChartEnv';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

export function renderChart(
  labels: string[],
  valoresLaboraisDiarios: number[],
  valoresLaboraisPagos: (number | null)[]
): HTMLDivElement {
  const { canvas, canvasWrapper } = setChartEnv()
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get canvas context!');
    return;
  }

  const config: ChartConfiguration<'line', (number | null)[], string> = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Horas Restantes',
          data: valoresLaboraisDiarios,
          borderColor: '#1e90ff',
          backgroundColor: 'rgba(30, 144, 255, 0.2)',
          yAxisID: 'y',
          tension: 0.1,
        },
        {
          label: 'Horas Concluídas',
          data: valoresLaboraisPagos,
          borderColor: '#32cd32',
          backgroundColor: 'rgba(50, 205, 50, 0.2)',
          yAxisID: 'y',
          spanGaps: true,
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Horas',
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'index' as const,
          intersect: false,
        },
      },
    },
  };

  new Chart(ctx, config);

  canvasWrapper.append(canvas)

  return canvasWrapper;
}