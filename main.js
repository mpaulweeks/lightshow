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
};

const toggleHeader = () => {
  document.getElementById('header').classList.toggle('hidden');
};

let arrowLeftHeld, arrowRightHeld;
window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft' && !arrowLeftHeld){
    arrowLeftHeld = setInterval(() => {
      if (state.selected) {
        state.selected.rotateCounterClockwise();
        canvas.draw();
      }
    }, 1);
  }
  if (e.code === 'ArrowRight' && !arrowRightHeld){
    arrowRightHeld = setInterval(() => {
      if (state.selected) {
        state.selected.rotateClockwise();
        canvas.draw();
      }
    }, 1);
  }
  if (e.code === 'Escape') {
    toggleHeader();
  }
});
window.addEventListener('keyup', e => {
  if (e.code === 'ArrowLeft'){
    clearInterval(arrowLeftHeld);
    arrowLeftHeld = undefined;
  }
  if (e.code === 'ArrowRight'){
    clearInterval(arrowRightHeld);
    arrowRightHeld = undefined;
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
  toggleHeader();
});

// on page load
canvas.calibrate();
canvas.draw();
