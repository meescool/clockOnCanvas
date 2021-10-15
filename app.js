/**
 * @author Marcela Estrada
 *   A simple clock app using
 **/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const styles = {
  frameColor: '#3D315B',
  frameWidth: ctx.canvas.width / 20,
  segmentColor: '#708B75',
  segmentWidth: 2,
  bgColor: '#444B6E',
  handWidth: 2,
  handColor: '#eee',
  secHandColor: 'red',
}

const r = (ctx.canvas.width - styles.frameWidth) / 2;

bug("width" + r);
// the clock class
class Clock {

  constructor(r, ctx, styles) {

    this.r = r;
    this.drawCircle();
    this.clockSegments();

  }
  /**
   * draw the clock structure
   * @param {int} r - the radius of the circle
   * @return {null}
   **/
  drawCircle() {
    // the first 2 parameters represent the coordinates of the center of the
    // circle, 3rd is the radius, and last two are start and end angle

    ctx.beginPath();
    ctx.lineWidth = styles.frameWidth;
    ctx.strokeStyle = styles.frameColor;
    ctx.arc(r + (styles.frameWidth / 2), r + (styles.frameWidth / 2), r, 0, 2 * Math.PI);
    ctx.fillStyle = styles.bgColor;
    ctx.fill();
    ctx.stroke();

  }

  /**
   * draw the five minute marks on the clock
   **/
  clockSegments() {
    ctx.beginPath();
    ctx.lineWidth = styles.segmentWidth;
    ctx.strokeStyle = styles.segmentColor;
    ctx.moveTo(r, r);
    ctx.lineTo(0, 0);
    ctx.stroke();
  }

  // clockHands(){
  //   new bigHand = new Hand();
  // }
}


const clock = new Clock(r, ctx, styles);


function render() {

}

function bug(message) {
  console.log(message);
}