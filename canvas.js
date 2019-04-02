
const canvasElm = document.getElementById('canvas');
const ctx = canvasElm.getContext('2d');

const calibrate = () => {
  let newHeight = document.body.clientHeight;
  let newWidth = document.body.clientWidth;
  if (newHeight !== canvasElm.height || newWidth !== canvasElm.width) {
    canvasElm.height = newHeight;
    canvasElm.width = newWidth;
  }
}

const calcRayPoint = (origin, angle, length) => {
  return {
    x: origin.x + (Math.cos(angle) * length),
    y: origin.y + (Math.sin(angle) * length),
  };
}

const draw = (s) => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasElm.width, canvasElm.height);

  const maxLength = Math.max(canvasElm.width, canvasElm.height);
  const squareLength = Math.min(canvasElm.width, canvasElm.height);

  s.lights.forEach(light => {
    const grad = ctx.createRadialGradient(
      light.origin.x, light.origin.y, 0,
      light.origin.x, light.origin.y, squareLength
    );
    grad.addColorStop(0, light.color);
    grad.addColorStop(1, '#000000');

    ctx.fillStyle = grad;
    ctx.beginPath();
    const leftPoint = calcRayPoint(light.origin, light.angle - light.window, squareLength*2);
    const rightPoint = calcRayPoint(light.origin, light.angle + light.window, squareLength*2);
    ctx.moveTo(light.origin.x, light.origin.y);
    [leftPoint, rightPoint].forEach(p => {
      ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();
  });

  ctx.strokeStyle = s.selected ? s.selected.color : 'white';
  ctx.beginPath();
  ctx.arc(s.mouse.x, s.mouse.y, 50, 0, 2*Math.PI, false);
  ctx.lineWidth = 5;
  ctx.closePath();
  ctx.stroke();
}
export const canvas = {
  calibrate,
  draw,
}