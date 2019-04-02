import { state } from './state.js';
import { canvas } from './canvas.js';

const getClosestLight = (state) => {
  let nearestLight, nearestDistance;
  state.lights.forEach(light => {
    const distance = Math.sqrt(
      Math.pow(state.mouse.x - light.origin.x, 2) +
      Math.pow(state.mouse.y - light.origin.y, 2)
    );
    if (nearestDistance === undefined || distance < nearestDistance){
      nearestLight = light;
      nearestDistance = distance;
    }
  });
  if (nearestDistance < state.mouseRadius) {
    return nearestLight;
  }
  return null;
}

let spaceHeld;
window.addEventListener('keydown', e => {
  if (e.code === 'Space' && !spaceHeld){
    spaceHeld = setInterval(() => {
      if (state.selected) {
        state.selected.angle = (state.selected.angle + 0.01 + (2*Math.PI)) % (2*Math.PI);
        canvas.draw();
      }
    }, 1);
  }
});
window.addEventListener('keyup', e => {
  if (e.code === 'Space'){
    clearInterval(spaceHeld);
    spaceHeld = undefined;
  }
});

window.addEventListener('mousedown', e => {
  if (state.selected){
    state.selected = undefined;
  } else if (state.hover){
    state.selected = state.hover;
    state.selected.origin = state.mouse;
  }
  canvas.draw();
});
window.addEventListener('mousemove', e => {
  const newPoint = {
    x: e.clientX,
    y: e.clientY,
  };
  if (state.selected) {
    state.selected.origin = {...newPoint};
  }
  state.hover = getClosestLight(state);
  state.mouse = {...newPoint};
  canvas.draw();
});

document.getElementById('header-close').addEventListener('click', () => {
  document.getElementById('header').remove();
});

// on page load
canvas.calibrate();
canvas.draw();
