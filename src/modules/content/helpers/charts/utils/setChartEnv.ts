export function setChartEnv() {
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  
  const canvasWrapper = document.createElement('div');
  const canvasContainer: HTMLDivElement = document.querySelector('.graphics-container');
  
  canvasWrapper.setAttribute('tg-sprint-chart', '');
  canvasWrapper.classList.add('burndown-chart');
  
  const tgSvgElement = document.querySelector('tg-svg[svg-icon="icon-graph"]');
  
  tgSvgElement.addEventListener('click', () => {
    canvasContainer.classList.toggle('open');
  })
  
  const wrapperStyle = {
    height: '280px',
    padding: '0px',
    position: 'relative',
  };
  
  Object.assign(canvasWrapper.style, wrapperStyle);

  return {
    canvas,
    canvasWrapper
  }
}