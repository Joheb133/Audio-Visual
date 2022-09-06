import * as BARS from "./visualisations/bars.js"
// audio init
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const analyser = new AnalyserNode(audioCtx, {fftSize: 512});

export { audioCtx, gainNode, analyser };

/* canvas */
// Get a canvas defined with ID "oscilloscope"
const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");

function canvasResize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 88;
};

window.addEventListener("resize", canvasResize, false);

const bar = new BARS.Bar(canvasCtx, analyser);

canvasResize();

// draw an oscilloscope of the current audio source
function draw() {

  requestAnimationFrame(draw);
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  
  bar.draw();
  bar.update(canvas.width, canvas.height)

}

draw();
