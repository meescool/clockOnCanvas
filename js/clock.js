import Draw from './draw.js';
// the clock class
export default class Clock {

  constructor(r1, r2, ctx) {

    this.r1 = r1;
    this.r2 = r2;
    this.ctx = ctx;


  }
  /**
   * draw the clock structure
  * @param {number} r - inner edge of the frame of the clock
   * @param {number} xy - outer edge of the frame of the clock
   * @param {string} color - the color for the line
   * @param {number} width - the width of the clock structure
   * @param {number} width - the width of the line
   * @param {string} bgColor - the color of the clock structure
   **/
  drawCircle(r, xy, color, width, bgColor) {
    // the first 2 parameters represent the coordinates of the center of the
    // circle, 3rd is the radius, and last two are start and end angle

    this.ctx.beginPath();
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;
    this.ctx.arc(xy, xy, r, 0, 2 * Math.PI);
    this.ctx.fillStyle = bgColor;
    this.ctx.fill();
    this.ctx.stroke();

  }

  /**
   * draw the five minute marks on the clock using trig
   **/
  clockSegments(r1, r2, color, width) {
    const draw = new Draw();
    let coor = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    }
    let a = 45;
    let p1 = r1 - (r1 * 0.2); // get the length for the segment to start
    let p2 = r1 - (width / 2); // get the length for the segment to end

    // 360 deg in a circle, 60 min in an hour, 5 min increments
    // 60 / 5 = 12 segments in a clock
    // 360 / 12 = 30 degrees per segment
    for (let i = 0; i < 12; i++) {
      a = i * 30;
      draw.math(r2, p1, p2, coor, a);
      draw.drawLine(this.ctx, coor, color, width);
    }


  }

}