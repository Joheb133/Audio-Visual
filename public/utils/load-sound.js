import { audioCtx, gainNode, analyser } from "../app.js";

export function loadSound(link) {
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
    if (typeof source === "object") {
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