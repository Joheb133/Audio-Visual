//audio init
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Music search
const searchBtn = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
let searchVal;

searchBtn.addEventListener("click", () => {
  searchVal = searchBar.value;
  if (searchVal.match("youtube.com/watch\\?v=")) {
    let videoCode = searchVal.slice(searchVal.indexOf("youtube.com/watch?v=") + "youtube.com/watch?v=".length, searchVal.length);
    if (videoCode.length > 1) {
      console.log("Searching");
      loadSound(videoCode)
    } else {
      console.log("Invalid link");
    };
  } else {
    console.log("Enter a youtube link");
  };
});
//Create + connect the source to be analysed
function loadSound(link) {
  const request = new XMLHttpRequest();
  request.open("GET", `http://localhost:8000/stream/${link}`, true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    const Data = request.response;
    process(Data);
    console.log("Playing audio")
  };

  request.send();
}
let source;
function process(Data) {
  if(typeof source === "object"){
    source.stop()
  }
  source = audioCtx.createBufferSource(); // Create Sound Source
  audioCtx.decodeAudioData(Data, function (buffer) {
    source.buffer = buffer;
    source.connect(gainNode)
    gainNode.connect(audioCtx.destination);
    source.connect(analyser);
    source.start(audioCtx.currentTime);
  });
}

/* audio controls */
//play/pause
const playBtn = document.getElementById("play");
let play = false;

playBtn.addEventListener("click", () => {
  if (play) {
    audioCtx.resume();
    play = false;
    playBtn.innerText = "Pause"
  } else if (!play) {
    audioCtx.suspend();
    play = true;
    playBtn.innerText = "Play"
  }
});

//volume
const volumeControl = document.getElementById("volume");
volumeControl.addEventListener('input', () => {
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
