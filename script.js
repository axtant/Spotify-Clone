// Get the play button elements for all songs
const playButtons = document.querySelectorAll('.fa-play');

// Get the audio element
const audio = new Audio();

// Get the progress bar element
const progressBar = document.getElementById('myProgressBar');

// Get the time display element
const timeDisplay = document.getElementById('timeDisplay');

// Array of song data
const songs = [
    { title: 'Swiming Pools (Drank)', duration: '4:07', file: 'songs/1.mp3', image: 'img/KendrickLamarSwimmingPools.jpg' },
    { title: 'Alag Aasmaan - Cover ft.UwU', duration: '1:13', file: 'songs/2.mp3', image: 'img/2.jpg' },
    { title: 'VALENTINO', duration: '2:22', file: 'songs/3.mp3', image: 'img/3.jpeg' },
    { title: 'Yes Indeed', duration: '4:07', file: 'songs/4.mp3', image: 'img/4.jpeg' },
    { title: 'Jimmy Cooks (Feat. 21 Savage)', duration: '3:38', file: 'songs/5.mp3', image: 'img/5.jpg' }
];

// Add click event listener to all play buttons
playButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
        const currentSong = songs[index];

        if (audio.paused || audio.src !== currentSong.file) {
            // If audio is paused or a different song is selected, load and play the new song
            audio.src = currentSong.file;
            audio.play();
            button.classList.remove('fa-play');
            button.classList.add('fa-pause');

            // Update now playing display
            document.getElementById('nowPlaying').innerHTML = `<img src="${currentSong.image}" alt=""><p>${currentSong.title}</p>`;
        } else {
            // If the same song is playing, pause it
            audio.pause();
            button.classList.remove('fa-pause');
            button.classList.add('fa-play');
        }
    });
});

// Add an event listener to update the progress bar and time display as the audio plays
audio.addEventListener('timeupdate', function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    const currentTimeMinutes = Math.floor(audio.currentTime / 60);
    const currentTimeSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);

    const currentTimeFormatted = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;
    const durationFormatted = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

    timeDisplay.textContent = `${currentTimeFormatted} / ${durationFormatted}`;
});

// Additional variable to keep track of the currently playing song
let currentSongIndex = -1;

// Add click event listener to all play buttons
playButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
        // Check if the same song is clicked again
        if (index === currentSongIndex) {
            // Toggle play/pause for the same song
            if (audio.paused) {
                audio.play();
                button.classList.remove('fa-play');
                button.classList.add('fa-pause');
            } else {
                audio.pause();
                button.classList.remove('fa-pause');
                button.classList.add('fa-play');
            }
        } else {
            // Load and play a new song
            const currentSong = songs[index];
            audio.src = currentSong.file;
            audio.play();
            button.classList.remove('fa-play');
            button.classList.add('fa-pause');

            // Update now playing display
            updateNowPlaying(currentSong);
            currentSongIndex = index;
        }
    });
});

// Function to update the now playing display
function updateNowPlaying(song) {
    const nowPlayingElement = document.getElementById('nowPlaying');
    const imageElement = nowPlayingElement.querySelector('img');
    const titleElement = nowPlayingElement.querySelector('p');

    // Set the image and title for the now playing display
    imageElement.src = song.image;
    titleElement.textContent = song.title;

    // Show the now playing display with a fade-in effect
    nowPlayingElement.style.opacity = 1;
    // setTimeout(() => {
        // Hide the now playing display after 3 seconds (adjust as needed)
    //     nowPlayingElement.style.opacity = 0;
    // }, 3000);
}

