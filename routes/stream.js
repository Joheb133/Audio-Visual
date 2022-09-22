
const express = require('express');
const ytdl = require('ytdl-core');
const router = express.Router();

const youtubeStream = require('youtube-audio-stream');

router.get('/:videoId', function (req, res) {
    try {
        if (ytdl.validateURL(`https://www.youtube.com/watch?v=${req.params.videoId}`)) {
            youtubeStream(req.params.videoId).pipe(res);
        } else {
            res.status(500).send("Link invalid")
        }
    }
    catch (exception) {
        res.status(500).send(exception)
    }
});

router.get('/metadata/:videoId', async function (req, res) {
    try {
        if (ytdl.validateURL(`https://www.youtube.com/watch?v=${req.params.videoId}`)) {
            const metaData = await ytdl.getBasicInfo(req.params.videoId)
            res.send(metaData.videoDetails.title)
        } else {
            res.status(500).send("Link invalid")
        }
    }
    catch (exception) {
        res.status(500).send(exception)
    }
})

module.exports = router;
