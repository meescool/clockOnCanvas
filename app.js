/**
 * @author Marcela Estrada
 *   A simple clock app using
 **/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasTemp = document.createElement("canvas");
const ctxTemp = canvasTemp.getContext("2d");

const colors = {
  purple: '#3D315B',
  lavender: '#444B6E',
  blush: '#9c7cb7',
  white: '#fff',
  black: '#000'
}
const widths = {
  large: ctx.canvas.width / 20,
  medium: ctx.canvas.width / 30,
  small: ctx.canvas.width / 40
}

const r1 = (ctx.canvas.width - widths.large) / 2;
const r2 = r1 + (widths.large / 2);

bug("width" + r1);

class Draw {
  constructor() {

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
    /*
    since xy starts on the upper left corner, need to add/subtract r2
    which stores the radius of the clock so that the xy starts
    from the middle of the clock
    */
    coor.x1 = r2 + (Math.cos(this.radians(a)) * p1);
    coor.y1 = r2 - (Math.sin(this.radians(a)) * p1);
    coor.x2 = r2 + (Math.cos(this.radians(a)) * p2);
    coor.y2 = r2 - (Math.sin(this.radians(a)) * p2);
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

  /**
   * draw a line using the coordinates
   * @param {coor} coor - object that stores the coordinates to be set
   **/
  drawLine(coor, color, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(coor.x1, coor.y1);
    ctx.lineTo(coor.x2, coor.y2);
    ctx.stroke();
  }

}
// the clock class
class Clock {

  constructor(r1, r2) {

    this.r1 = r1;
    this.r2 = r2;


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
      draw.math(p1, p2, coor, a);
      draw.drawLine(coor, color, width);
    }


  }

}

class Hands {
  constructor(r1, r2, ctx, styles) {
    this.r1 = r1;
    this.r2 = r2;
    this.ctx = ctx;
  }
  setUpHands() {
    let date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let hrL = r1 * 0.5;
    let minL = r1 * 0.75;
    let secL = r1 * 0.75;


    let coor = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    };
    bug(sec);
    bug(hr);

    // second hand
    this.drawHand(sec, coor, secL, colors.blush, widths.small, 'sm');
    this.drawHand(min, coor, minL, colors.purple, widths.medium, 'sm');
    // hr += (60 / min);
    this.drawHand(hr, coor, hrL, colors.purple, widths.medium, 'hr');


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
      bug(time);
      time -= 15;
      a = -30 * time;
    }
    draw.math(0, length, coor, a);
    draw.drawLine(coor, color, width);
  }



  // drawTriangle() {
  //
  // }
}

//Program starts here

const clock = new Clock(r1, r2);
clock.drawCircle(r1, r2, colors.purple, widths.large, colors.lavender);
clock.clockSegments(r1, r2, colors.purple, widths.medium);




// backupClock();
const hands = new Hands(r1, r2);
hands.setUpHands();

clock.drawCircle(r1 * 0.1, r2, colors.purple, widths.medium, colors.purple);

// function backupClock() {
//   canvasTemp.width = canvas.width;
//   canvasTemp.height = canvas.height;
//   ctxTemp.drawImage(canvas, 0, 0);
// }
setInterval(render, 1000); // 1000 milliseconds = 1 sec

function render() {
  const clock = new Clock(r1, r2);
  clock.drawCircle(r1, r2, colors.purple, widths.large, colors.lavender);
  clock.clockSegments(r1, r2, colors.purple, widths.medium);




  // backupClock();
  const hands = new Hands(r1, r2);
  hands.setUpHands();

  clock.drawCircle(r1 * 0.1, r2, colors.purple, widths.medium, colors.purple);


}

function bug(message) {
  console.log(message);
}