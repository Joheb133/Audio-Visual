import { loadSound } from "./utils/load-sound.js";

// audio init
const audioCtx = new AudioContext();

const gainNode = audioCtx.createGain();
const analyser = audioCtx.createAnalyser();

analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

export {audioCtx, gainNode, analyser};

//loadSound("5J-1uAnzyV8")

/* canvas */
// Get a canvas defined with ID "oscilloscope"
const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");

// draw an oscilloscope of the current audio source
function draw() {

  requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(200, 200, 200)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0, 0, 0)";

  canvasCtx.beginPath();

  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {

    var v = dataArray[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

draw();
