export class Light {
  constructor(data) {
    this.origin = data.origin;
    this.color = data.color;
    this.angle = data.angle;
    this.window = data.window;
    this.depth = data.depth;
  }
  clone() {
    return new Light({
      ...this,
      origin: {...this.origin},
    });
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
  angleOpen() {
    this.window = Math.min(this.window + 0.01, Math.PI/2.1);
  }
  angleClose() {
    this.window = Math.max(this.window - 0.01, 0.01);
  }
  grow() {
    this.depth = Math.min(this.depth + 1, document.body.clientWidth);
  }
  shrink() {
    this.depth = Math.max(this.depth - 1, 5);
  }
}
