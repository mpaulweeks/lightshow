import { Light } from './model.js';

export const state = {
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
  ].map(data => new Light(data)),
  selected: undefined,
  hover: undefined,
  mouse: {
    x: 0,
    y: 0,
  },
  mouseRadius: 50,
};
