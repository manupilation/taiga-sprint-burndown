export function setChartEnv() {
  const canvas = document.createElement('canvas');
  canvas.className = 'sprint-burndown__myChart';
  
  const canvasWrapper = document.createElement('div');
  
  canvasWrapper.setAttribute('tg-sprint-chart', '');
  canvasWrapper.classList.add('sprint-burndown__chart-wrapper');

  return {
    canvas,
    canvasWrapper
  }
}