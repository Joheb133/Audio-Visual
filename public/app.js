const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Connect the source to be analysed
loadSound("aMGmXzpy84g");
function loadSound(link) {
  const request = new XMLHttpRequest();
  request.open("GET", `http://localhost:8000/stream/${link}`, true);
  request.responseType = "arraybuffer";


  request.onload = function () {
      const Data = request.response;
      console.log(Data)
      process(Data);
  };

  request.send();
}

function process(Data) {
  const source = audioCtx.createBufferSource(); // Create Sound Source
  audioCtx.decodeAudioData(Data, function (buffer) {
      source.buffer = buffer;
      source.connect(gainNode)
      gainNode.connect(audioCtx.destination);
      source.start(audioCtx.currentTime);
  });
  source.connect(analyser);
}

/* audio controls */
//play/pause
const play = document.getElementById("play");
const pause = document.getElementById("pause");

play.addEventListener("click", ()=>{
  audioCtx.resume();
});
pause.addEventListener("click", ()=>{
  audioCtx.suspend();
});

//volume
const volumeControl = document.getElementById("volume");
volumeControl.addEventListener('input', ()=> {
	gainNode.gain.value = volumeControl.value;
}, false);


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
