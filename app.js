const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

const dim = myCanvas.getBoundingClientRect();
const dimX = dim.left;
const dimY = dim.top;
bug("width" + dimX);
bug("height" + dimY);









function bug(message) {
  console.log(message);
}