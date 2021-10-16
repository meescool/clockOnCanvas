/**
 * @author Marcela Estrada
 *   A simple clock app using
 **/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const styles = {
  color: '#3D315B',
  width: ctx.canvas.width / 20,
  bgColor: '#444B6E'
}

const r1 = (ctx.canvas.width - styles.width) / 2;
const r2 = r1 + (styles.width / 2);

bug("width" + r1);
// the clock class
class Clock {

  constructor(r1, r2, ctx, styles) {

    this.r1 = r1;
    this.r2 = r2;
    this.drawCircle(r1, r2, styles.color, styles.width, styles.bgColor);
    this.clockSegments(r1, r2, styles.color, styles.width);
    this.clockhands();
    this.drawCircle(r1 * 0.1, r2, styles.color, styles.width, styles.bgColor);

  }
  /**
   * draw the clock structure
   **/
  drawCircle(r, xy, color, width, bgColor) {
    // the first 2 parameters represent the coordinates of the center of the
    // circle, 3rd is the radius, and last two are start and end angle

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.arc(xy, xy, r, 0, 2 * Math.PI);
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.stroke();

  }

  /**
   * draw the five minute marks on the clock using trig
   **/
  clockSegments(r1, r2, color, width) {
    let coor = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    }
    let a = 45;
    let p1 = r1 - (r1 * 0.2); // get the length for the segment to start
    let p2 = r1 - (width / 2); // get the length for the segment to end

    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    // 360 deg in a circle, 60 min in an hour, 5 min increments
    // 60 / 5 = 12 segments in a clock
    // 360 / 12 = 30 degrees per segment
    for (let i = 0; i < 12; i++) {
      a = i * 30;
      this.math(p1, p2, coor, a);
      bug(styles);
      this.drawLine(coor);
    }


  }
  /**
   * calculate the values for the coordinates to draw the lines
   * formulas
   * --------
   * x = cos * seg
   * y = sin * seg
   * reference
   * ---------
   * https://www.youtube.com/watch?v=aHaFwnqH5CU&t=63s
   *
   * @param {number} p1 - the start of the segments
   * @param {number} p2 - the end of the segments
   * @param {coor} coor - object that stores the coordinates to be set
   * @param {a}
   * @return {coor} The new set of coordinates to be drawn
   **/
  math(p1, p2, coor, a) {
    coor.x1 = 250 + (Math.cos(this.radians(a)) * p1);
    coor.y1 = 250 - (Math.sin(this.radians(a)) * p1);
    coor.x2 = 250 + (Math.cos(this.radians(a)) * p2);
    coor.y2 = 250 - (Math.sin(this.radians(a)) * p2);
    bug(coor);
    this.reset(coor);
    return coor;
  }
  /**
   * input for cos and sin functions return in radians and math function
   * needs them to return in angles, so this function converts the given
   * angle to radians so that the os and sin function return a degree so that
   * calculations can be done right
   * formulas
   * --------
   * angle in radians = angle in deg * (pi/180)
   * reference
   * ---------
   * https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
   *
   * @param {number} a - degree that needs to be converted to a radian
   * @return {number} radian that is needed to complete cos/sin equations
   **/
  radians(a) {
    return a * (Math.PI / 180);
  }

  reset(coor) {

  }

  /**
   * draw a line using the coordinates
   * @param {coor} coor - object that stores the coordinates to be set
   **/
  drawLine(coor) {
    ctx.beginPath();
    ctx.moveTo(coor.x1, coor.y1);
    ctx.lineTo(coor.x2, coor.y2);
    ctx.stroke();
  }

  clockHands() {}
}


const clock = new Clock(r1, r2, ctx, styles);


function render() {

}

function bug(message) {
  console.log(message);
}