import { state } from './state.js';

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

const draw = () => {
  const s = state; // shorthand

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasElm.width, canvasElm.height);

  s.lights.forEach(light => {
    const grad = ctx.createRadialGradient(
      light.origin.x, light.origin.y, 0,
      light.origin.x, light.origin.y, light.depth
    );
    grad.addColorStop(0, light.color + 'A0');
    grad.addColorStop(1, light.color + '80');

    ctx.fillStyle = grad;
    ctx.beginPath();
    const leftPoint = calcRayPoint(light.origin, light.angle - light.window, light.depth);
    const rightPoint = calcRayPoint(light.origin, light.angle + light.window, light.depth);
    ctx.moveTo(light.origin.x, light.origin.y);
    [leftPoint, rightPoint].forEach(p => {
      ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();
  });

  ctx.lineWidth = 5;
  s.lights.forEach(light => {
    if (light !== s.selected){
      ctx.strokeStyle = light === s.hover ? 'white' : light.color;
      ctx.beginPath();
      ctx.arc(light.origin.x, light.origin.y, s.mouseRadius/2, 0, 2*Math.PI, false);
      ctx.closePath();
      ctx.stroke();
    }
  });
  ctx.strokeStyle = s.selected ? s.selected.color : 'white';
  ctx.beginPath();
  ctx.arc(s.mouse.x, s.mouse.y, s.mouseRadius, 0, 2*Math.PI, false);
  ctx.closePath();
  ctx.stroke();
}

export const canvas = {
  calibrate,
  draw,
}
