
const express = require('express');
const router = express.Router();

const youtubeStream = require('youtube-audio-stream');

router.get('/:videoId', function (req, res) {
    try {
        youtubeStream(req.params.videoId).pipe(res);
        console.log(`connected: www.youtube.com/watch?v=${req.params.videoId}`)
    } catch (exception) {
        res.status(500).send(exception)
    }
});

module.exports = router;
