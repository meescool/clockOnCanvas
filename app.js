import Clock from './js/clock.js';
import Hands from './js/hands.js';

/**
 * @author Marcela Estrada
 *   A simple clock animated app using the Canvas element
 **/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

// inner edge of the frame of the clock
const r1 = (ctx.canvas.width - widths.large) / 2;
// outer edge of the frame of the clock
const r2 = r1 + (widths.large / 2);

/** Program starts here **/

// drawing the frame of the clock
const clock = new Clock(r1, r2, ctx);
clock.drawCircle(r1, r2, colors.purple, widths.large, colors.lavender);
clock.clockSegments(r1, r2, colors.purple, widths.medium);

// drawing the hands of the clock
const hands = new Hands(r1, r2, ctx, colors, widths);
hands.setUpHands();

// drawing the inner circle of the clock
clock.drawCircle(r1 * 0.1, r2, colors.purple, widths.medium, colors.purple);

setInterval(render, 1000); // 1000 milliseconds = 1 sec

/**
 * This function runs the whole clock program.
 * @param {clock} clock - object that contains the clock class
 * @param {hands} hands - object that contains the hands class
 */
function render() {
  // clear the canvas during each loop to keep a crisp drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // setting up the clock
  const clock = new Clock(r1, r2, ctx);
  clock.drawCircle(r1, r2, colors.purple, widths.large, colors.lavender);
  clock.clockSegments(r1, r2, colors.purple, widths.medium);

  // setting up the hands
  const hands = new Hands(r1, r2, ctx, colors, widths);
  hands.setUpHands();

  // drawing the final clock
  clock.drawCircle(r1 * 0.1, r2, colors.purple, widths.medium, colors.purple);

}
