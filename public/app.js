const audioCtx = new AudioContext();

// ...

var analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Connect the source to be analysed
loadSound();
function loadSound() {
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/stream/--_94TUDHxk", true);
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
      source.connect(audioCtx.destination);
      source.start(audioCtx.currentTime);
  });
  source.connect(analyser);
}

// Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById("oscilloscope");
var canvasCtx = canvas.getContext("2d");

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
