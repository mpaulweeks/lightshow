import { canvas } from './canvas.js';

canvas.calibrate();

const state = {
  lights: [
    {
      origin: {x: 100, y: 100},
      color: '#FF0000FF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
    {
      origin: {x: 300, y: 100},
      color: '#00FF00FF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
    {
      origin: {x: 500, y: 100},
      color: '#0000FFFF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
  ],
  selected: undefined,
  mouse: {
    x: 0,
    y: 0,
  },
  mouseRadius: 50,
}

let spaceHeld;
window.addEventListener('keydown', e => {
  if (e.code === 'Space' && !spaceHeld){
    spaceHeld = setInterval(() => {
      if (state.selected) {
        state.selected.angle = (state.selected.angle + 0.01 + (2*Math.PI)) % (2*Math.PI);
        canvas.draw(state);
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
  } else {
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
      state.selected = nearestLight;
      state.selected.origin = state.mouse;
    }
  }
  canvas.draw(state);
});
window.addEventListener('mousemove', e => {
  const newPoint = {
    x: e.clientX,
    y: e.clientY,
  };
  if (state.selected) {
    state.selected.origin = {...newPoint};
  }
  state.mouse = {...newPoint};
  canvas.draw(state);
});
