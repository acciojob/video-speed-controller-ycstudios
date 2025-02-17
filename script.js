// Get DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volumeSlider = player.querySelector('.volume');
const speedSlider = player.querySelector('.playbackSpeed');
const rewindButton = player.querySelector('.rewind');
const forwardButton = player.querySelector('.forward');

// Functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleVolume() {
    video.volume = volumeSlider.value;
}

function handlePlaybackSpeed() {
    video.playbackRate = speedSlider.value;
}

function rewind() {
    video.currentTime = Math.max(video.currentTime - 10, 0);
}

function forward() {
    video.currentTime = Math.min(video.currentTime + 25, video.duration);
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
volumeSlider.addEventListener('change', handleVolume);
volumeSlider.addEventListener('mousemove', handleVolume);
speedSlider.addEventListener('change', handlePlaybackSpeed);
speedSlider.addEventListener('mousemove', handlePlaybackSpeed);

rewindButton.addEventListener('click', rewind);
forwardButton.addEventListener('click', forward);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Initial setup
video.addEventListener('loadedmetadata', () => {
    volumeSlider.value = video.volume;
    speedSlider.value = video.playbackRate;
});