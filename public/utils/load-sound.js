import { audioCtx, gainNode, analyser } from "../app.js";

export function loadSound(link, callback, error) {
    const request = new XMLHttpRequest();
    request.open("GET", `http://${self.location.host}/stream/${link}`, true);
    request.responseType = "arraybuffer";

    request.onload = async function () {
        if(request.status === 200){
            const Data = request.response;
            await process(Data);
            callback();
        } else{
            error();
        }
    };

    request.send();
}
let source;
async function process(Data) {
    source = audioCtx.createBufferSource(); // Create Sound Source
    await audioCtx.decodeAudioData(Data, function (buffer) {
        source.buffer = buffer;
        source.connect(analyser);
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start(audioCtx.currentTime, 0, source.duration);
    })
};

export { source }