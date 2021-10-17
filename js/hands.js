import Draw from './draw.js';
export default class Hands {
  constructor(r1, r2, ctx, colors, widths) {
    this.r1 = r1;
    this.r2 = r2;
    this.ctx = ctx;
    this.colors = colors;
    this.widths = widths;
  }
  setUpHands() {
    let date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let hrL = this.r1 * 0.5;
    let minL = this.r1 * 0.75;
    let secL = this.r1 * 0.75;


    let coor = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    };

    // second hand
    this.drawHand(sec, coor, secL, this.colors.blush, this.widths.small, 'sm');
    this.drawHand(min, coor, minL, this.colors.purple, this.widths.medium, 'sm');
    // hr += (60 / min);
    this.drawHand(hr, coor, hrL, this.colors.purple, this.widths.medium, 'hr');


  }
  drawHand(time, coor, length, color, width, type) {
    const draw = new Draw();
    let a = 0;
    // 60 sec in min, 360 deg in circle
    // 360/60 = 6
    if (type === 'sm') {
      time -= 15; // reset the axis to start at y axis cause time
      a = -6 * time;
    }
    //24 hr in day , 12 hr in clock
    // 360/12 = 30
    else {
      time -= 15;
      a = -30 * time;
    }
    draw.math(this.r2, 0, length, coor, a);
    draw.drawLine(this.ctx, coor, color, width);
  }

}