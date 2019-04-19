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

const actions = [
  {
    code: 'ArrowLeft',
    callback: () => state.selected && state.selected.rotateCounterClockwise(),
  },
  {
    code: 'ArrowRight',
    callback: () => state.selected && state.selected.rotateClockwise(),
  },
  {
    code: 'ArrowUp',
    callback: () => state.selected && state.selected.angleOpen(),
  },
  {
    code: 'ArrowDown',
    callback: () => state.selected && state.selected.angleClose(),
  },
].reduce((obj, action) => {
  obj[action.code] = {
    ...action,
    interval: undefined,
  };
  return obj;
}, {});

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    toggleHeader();
  }
  if (e.code === 'KeyC') {
    state.clone();
    canvas.draw();
  }
  if (e.code === 'KeyD') {
    state.delete();
    canvas.draw();
  }
  const action = actions[e.code];
  if (action && !action.interval){
    action.interval = setInterval(() => {
      action.callback();
      canvas.draw();
    }, 1);
  }
});
window.addEventListener('keyup', e => {
  const action = actions[e.code];
  if (action) {
    clearInterval(action.interval);
    action.interval = undefined;
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
