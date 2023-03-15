# Audio-Visual

### Description 
An audio visualiser that uses YouTube videos as the audio data source.

### Why I created it
I created this website because I wanted to be able to look at cool graphs for any song I want. I hated having to rely on YouTube videos to create visualisations for me.

### Technicalities
This website uses a dependency called yt-dl to stream video data to my server. Using FFMPEG the audio data is extracted and sent to the front-end of my website. That data is used for audio visualisation and the data is turned into audio using Web Audio API.

___
![](https://github.com/Joheb133/Audio-Visual/blob/main/audio-visual.gif)
