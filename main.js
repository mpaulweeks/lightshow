import { canvas } from './canvas.js';

canvas.calibrate();

const state = {
  lights: [
    {
      origin: {x: 100, y: 300},
      color: '#FF0000FF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
    {
      origin: {x: 200, y: 300},
      color: '#00FF00FF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
    {
      origin: {x: 300, y: 300},
      color: '#0000FFFF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
    {
      origin: {x: 400, y: 300},
      color: '#FFFF00FF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
    {
      origin: {x: 500, y: 300},
      color: '#00FFFFFF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
    {
      origin: {x: 600, y: 300},
      color: '#FF00FFFF',
      angle: Math.PI * 0.5,
      window: Math.PI / 6,
    },
  ],
  selected: undefined,
  hover: undefined,
  mouse: {
    x: 0,
    y: 0,
  },
  mouseRadius: 50,
};

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
  } else if (state.hover){
    state.selected = state.hover;
    state.selected.origin = state.mouse;
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
  state.hover = getClosestLight(state);
  state.mouse = {...newPoint};
  canvas.draw(state);
});

document.getElementById('header-close').addEventListener('click', () => {
  document.getElementById('header').remove();
})
