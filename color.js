export class Color {
  constructor(parts) {
    this.r = parts.r;
    this.g = parts.g;
    this.b = parts.b;
    this.a = parts.a;
    // todo this is not 1:1 with starting colors
    this.step = Math.floor(Math.asin((this.r - 127) / 128)/0.2);
  }

  brighten() {
    this.a = Math.min(this.a + 1, 255);
  }
  darken() {
    this.a = Math.max(this.a - 1, 0);
  }

  normalizeRGB(val) {
    return Math.min(255, Math.max(0, Math.floor(val)));
  }
  cycleRainbow() {
    this.step += 1;
    this.r = this.normalizeRGB((Math.sin((0.02 * this.step) + (0 * 2)) * 128) + 127);
    this.g = this.normalizeRGB((Math.sin((0.02 * this.step) + (1 * 2)) * 128) + 127);
    this.b = this.normalizeRGB((Math.sin((0.02 * this.step) + (2 * 2)) * 128) + 127);
  }

  toHex() {
    const {r, g, b, a} = this;
    return '#' + [r,g,b,a].map(int => int
      .toString(16)
      .padStart(2, '0')
    ).join('')
  }
  toHexPure() {
    const {r, g, b} = this;
    const a = 255;
    return '#' + [r,g,b,a].map(int => int
      .toString(16)
      .padStart(2, '0')
    ).join('')
  }
  static fromHex(hexcode) {
    const parts = [1,3,5,7]
      .map(i => hexcode.substring(i, i+2))
      .map(hex => parseInt(hex, 16));
    return new Color({
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: parts[3],
    });
  }
}