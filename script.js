// Variable to keep track of the currently playing song
var currentlyPlaying = null;
var userIsSeeking = false;

function playSong(songId, imgElement) {
    const songToPlay = document.getElementById(songId);
    const progressBar = document.getElementById('myProgressBar');

    if (currentlyPlaying && currentlyPlaying !== songToPlay) {
        currentlyPlaying.pause();
        const previousImgElement = document.querySelector(`img[data-songid="${currentlyPlaying.id}"]`);
        if (previousImgElement) {
            previousImgElement.src = 'img/play.png';
        }
        progressBar.value = 0; 
    }

    if (songToPlay.paused) {
        songToPlay.play();
        imgElement.src = 'img/pause.png';
        currentlyPlaying = songToPlay;
    } else {
        songToPlay.pause();
        imgElement.src = 'img/play.png';
        currentlyPlaying = null;
    }
}

function setVolume(volume) {
    if (currentlyPlaying) {
        currentlyPlaying.volume = volume;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const audioElements = document.querySelectorAll('audio');
    const progressBar = document.getElementById('myProgressBar');

    audioElements.forEach(function (audio) {
        audio.addEventListener('timeupdate', function () {
            if (!userIsSeeking) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                progressBar.value = percentage;
            }
        });

        audio.addEventListener('ended', function () {
            progressBar.value = 0;
        });

        progressBar.addEventListener('input', function () {
            const seekTime = (progressBar.value / 100) * audio.duration;
            audio.currentTime = seekTime;
            userIsSeeking = true;
        });

        progressBar.addEventListener('mouseup', function () {
            userIsSeeking = false;
        });

        audio.addEventListener('seeking', function () {
            userIsSeeking = true;
        });

        audio.addEventListener('seeked', function () {
            userIsSeeking = false;
        });
    });
});
