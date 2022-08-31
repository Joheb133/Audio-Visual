import { audioCtx, gainNode } from "../app.js";
import { loadSound } from "./load-sound.js";

//search-bar
const searchBtn = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
let searchVal;

searchBtn.addEventListener("click", () => {
  searchVal = searchBar.value;
  if (searchVal.match("youtube.com/watch\\?v=")) {
    let videoCode = searchVal.slice(searchVal.indexOf("youtube.com/watch?v=") + "youtube.com/watch?v=".length, searchVal.length);
    if (videoCode.length > 1) {
      console.log("Searching");
      loadSound(videoCode) //need an import
    } else {
      console.log("Invalid link");
    };
  } else {
    console.log("Enter a youtube link");
  };
});

//play/pause
const playBtn = document.getElementById("play");
let play = false;

playBtn.addEventListener("click", () => {
  if (play) {
    audioCtx.resume(); //import
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
  gainNode.gain.value = volumeControl.value; //import
}, false);