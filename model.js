export class Light {
  constructor(data) {
    this.origin = data.origin;
    this.color = data.color;
    this.angle = data.angle;
    this.window = data.window;
  }
  rotate(direction) {
    this.angle = (this.angle + (direction*0.01) + (2*Math.PI)) % (2*Math.PI);
  }
  rotateClockwise() {
    this.rotate(1);
  }
  rotateCounterClockwise() {
    this.rotate(-1);
  }
}
