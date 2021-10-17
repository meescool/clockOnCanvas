export default class Draw {
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
  math(r2, p1, p2, coor, a) {
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
  drawLine(ctx, coor, color, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(coor.x1, coor.y1);
    ctx.lineTo(coor.x2, coor.y2);
    ctx.stroke();
  }

}