import { audioCtx, gainNode } from "../app.js";
import { loadSound, source } from "./load-sound.js";
//import { loadMetadata } from "./load-metadata.js";

//play/pause
const playBtn = document.getElementById("play-button")
const playPathEl = document.getElementById("play-path")
let playing = false;
audioCtx.suspend();

playBtn.addEventListener("click", () => {
  if (playing) {
    pause();
  } else if (!playing) {
    play();
  }
});

function play() {
  audioCtx.resume(); //import
  playPathEl.setAttribute("d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z");//pause
  playing = true;
}
function pause() {
  audioCtx.suspend();
  playPathEl.setAttribute("d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z");//play
  playing = false;
}

//progress bar
const progressBar = document.getElementById("progress");
const songCurrentTimeEl = document.getElementById("song-current-time");
const songDurationEl = document.getElementById("song-duration");

function convertSeconds(seconds) {
  const s = Math.round(seconds)
  return new Date(1000 * s).toISOString().substring(14, 19)
}

let currentTime, time;
function timeElapsed() {
  let startTime = audioCtx.currentTime;
  let pastTime = 0;
  time = setInterval(() => {
    currentTime = audioCtx.currentTime - startTime;
    if (currentTime !== pastTime && playing) {
      songCurrentTimeEl.innerText = convertSeconds(currentTime)
      progressBar.value = currentTime;
      if (currentTime > source.buffer.duration) {
        clearInterval(time)
      }
    }
    pastTime = currentTime;
  }, 100)
}

//search-bar
let sourceCount = 0;
let search = {
  Btn: document.getElementById("search-button"),
  Bar: document.getElementById("search-bar"),
  Loading: document.getElementById("loader"),
  Title: document.getElementById("search-title")
}

search.Btn.addEventListener("click", () => {

  let searchVal = search.Bar.value;
  if (searchVal.match("youtube.com/watch\\?v=")) { // IF youtube link then... ELSE "enter yt link"
    let videoCode = searchVal.slice(searchVal.indexOf("youtube.com/watch?v=") + "youtube.com/watch?v=".length, searchVal.length);
    if (videoCode.length < 2) { return alert("invalid link") }
    if (sourceCount >= 1) { sourceCount--; pause(); source.stop(); clearInterval(time) };
    search.Btn.style.display = "none";
    search.Loading.style.display = "inline";

    loadSound(videoCode, function () { //search & GET audio (using yt code), callback (all the code to run after loudSound), error (handle error)
      sourceCount++;
      documentStlying();
      play();
      timeElapsed();
    }, function () {
      console.log("Failed GET Request")
    });

    loadMetadata(videoCode)
  } else {
    alert("Enter a youtube link");
  };
});

function documentStlying() {//styling - It looks so dirty in loadSound()
  search.Btn.style.display = "inline";
  search.Loading.style.display = "none";
  search.Bar.value = "";
  progressBar.max = source.buffer.duration;
  progressBar.value = 0;
  songCurrentTimeEl.innerText = convertSeconds(0);
  songDurationEl.innerText = convertSeconds(source.buffer.duration);
};

function loadMetadata(link) {
  const request = new XMLHttpRequest();
  request.open("GET", `http://${self.location.host}/stream/metadata/${link}`, true);

  request.onload = function () {
    search.Title.innerText = request.response
  }

  request.send()
}

//volume
const volumeControl = document.getElementById("volume");
gainNode.gain.value = volumeControl.value;
volumeControl.addEventListener('input', () => {
  gainNode.gain.value = volumeControl.value; //import
}, false);