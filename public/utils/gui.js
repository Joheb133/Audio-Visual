import { audioCtx, gainNode } from "../app.js";
import { loadSound, source } from "./load-sound.js";

//play/pause
const playBtn = document.getElementById("play")
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
  console.log("play")
  audioCtx.resume(); //import
  playPathEl.setAttribute("d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z");//pause
  playing = true;
}
function pause() {
  console.log("pause")
  audioCtx.suspend();
  playPathEl.setAttribute("d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z");//play
  playing = false;
}
//progress bar
const progressBar = document.getElementById("progress");
const songDurationEl = document.getElementById("song-duration");



//search-bar
const searchBtn = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
let sourceCount = 0;
let searching = false;
let searchVal;

searchBtn.addEventListener("click", () => {
  if (sourceCount >= 1) {
    sourceCount--;
    pause();
    source.stop();
  };

  searchVal = searchBar.value;
  if (searchVal.match("youtube.com/watch\\?v=")) {
    let videoCode = searchVal.slice(searchVal.indexOf("youtube.com/watch?v=") + "youtube.com/watch?v=".length, searchVal.length);
    if (!searching && videoCode.length > 4) {
      console.log("Searching");
      searching = true;
      //need an import
      loadSound(videoCode, function () {
        play()
        console.log("Playing audio");
        songDurationEl.innerText = new Date(1000 * source.buffer.duration).toISOString().substring(14, 19)
        sourceCount++;
        searching = false;
      });
    } else {
      console.log("Searching/invalid link");
    };
  } else {
    console.log("Enter a youtube link");
  };
});

//volume
const volumeControl = document.getElementById("volume");
gainNode.gain.value = volumeControl.value;
volumeControl.addEventListener('input', () => {
  gainNode.gain.value = volumeControl.value; //import
}, false);