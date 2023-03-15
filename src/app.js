import * as BARS from "./visualisations/bars.js"
// audio init
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const analyser = new AnalyserNode(audioCtx, {fftSize: 256});

export { audioCtx, gainNode, analyser };

/* canvas */
// Get a canvas defined with ID "oscilloscope"
const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");

const bar = new BARS.Bar(canvasCtx, analyser);

function canvasResize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 88;
  bar.update(canvas.width, canvas.height)
};

window.addEventListener("resize", canvasResize, false);

canvasResize();

// draw an oscilloscope of the current audio source
function draw() {

  requestAnimationFrame(draw);
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  
  bar.draw();
  
}

draw();

//canvas.addEventListener("click", ()=>{bar.draw()}, false)
