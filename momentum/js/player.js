//import playList from './playList.js';

const playList = [
    {      
        title: 'Aqua Caelestis',
        src: './assets/sounds/Aqua Caelestis.mp3',
        duration: '00:39'
    },  
    {      
        title: 'Ennio Morricone',
        src: './assets/sounds/Ennio Morricone.mp3',
        duration: '01:37'
    },
    {      
        title: 'River Flows In You',
        src: './assets/sounds/River Flows In You.mp3',
        duration: '01:37'
    },
    {      
        title: 'Summer Wind',
        src: './assets/sounds/Summer Wind.mp3',
        duration: '01:50'
    }
];

const player = document.querySelector('.player');
const playListContainer = document.querySelector('.play-list');
let currentChild = playListContainer.querySelector(':nth-child(0)');
const audio = [];

playList.forEach(track => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = track.title;
    playListContainer.append(li);
    const newAudio = new Audio(track.src);
    newAudio.volume = .40;
    audio.push(newAudio);
});

const playPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const currentTime = document.querySelector('.current');
const trackLength = document.querySelector('.length');
const trackName = document.querySelector('.track-name');
const progressBar = player.querySelector('.progress');
const volumeButton = document.querySelector('.volume-button');
const volumeInput = document.querySelector('.volume-progress > input');
let volume = 0.4;
let muted = false;
let drag = false;

let isPlay = false;
let playNum = 0;

currentTime.textContent = '00:00';
trackLength.textContent = playList[playNum].duration;
trackName.textContent = playList[playNum].title;

function playTrack() {
    play.classList.add('pause');
    trackLength.textContent = playList[playNum].duration;
    trackName.textContent = playList[playNum].title;
    isPlay = true;
    currentChild = playListContainer.querySelector(`:nth-child(${playNum + 1})`);
    currentChild.classList.add('item-active');
    if (muted) {
        audio[playNum].volume = 0;
    } else {
        audio[playNum].volume = volume;
    }
    audio[playNum].play();
}

function pauseTrack() {
    play.classList.remove('pause');
    isPlay = false;
    audio[playNum].pause();
}

play.addEventListener('click', () => {
    if (isPlay) pauseTrack();
    else playTrack();
});

playPrev.addEventListener('click', () => {
    audio[playNum].pause();
    audio[playNum].currentTime = 0;
    currentChild.classList.remove('item-active');
    if (playNum === 0) {
        playNum = playList.length - 1;
    } else {
        playNum--;
    }
    playTrack();
});

playNext.addEventListener('click', () => {
    audio[playNum].pause();
    audio[playNum].currentTime = 0;
    currentChild.classList.remove('item-active');
    if (playNum === playList.length - 1) {
        playNum = 0;
    } else {
        playNum++;
    }
    playTrack();
});

setInterval(() => {
    if (!drag) {
        const percentage = audio[playNum].currentTime / audio[playNum].duration * 100;
        progressBar.value = Number(percentage);
        currentTime.textContent = getTimeCodeFromNum(audio[playNum].currentTime);
        if (percentage == 100) {
            play.classList.remove('pause');
            currentChild.classList.remove('item-active');
            if (playNum == audio.length - 1) {
                playNum = 0;
            } else {
                playNum++;
            }
            playTrack();
        }
    }
}, 100);

function getTimeCodeFromNum(num) {
    const floored = Math.floor(num);
    let minutes = String(Math.floor(floored / 60));
    let seconds = String(Math.floor(floored % 60));
    minutes = minutes.padStart(2, '0');
    seconds = seconds.padStart(2, '0');
    return `${minutes}:${seconds}`;
}

progressBar.addEventListener('input', () => {
    audio[playNum].currentTime = Math.floor(progressBar.value * audio[playNum].duration / 100);
});
progressBar.addEventListener('mousedown', () => {
    drag = true;
});
progressBar.addEventListener('mousedown', () => {
    drag = false;
});

volumeInput.addEventListener('input', () => {
    volume = volumeInput.value / 100;
    unmute();
});
volumeInput.addEventListener('click', () => {
    volume = volumeInput.value / 100;
    unmute();
});

volumeButton.addEventListener('click', () => {
    if (muted) unmute();
    else mute();
});

function mute() {
    audio[playNum].volume = 0;
    volumeButton.style.background = "url(./assets/svg/mute.svg) no-repeat";
    volumeButton.style["background-size"] = "25px 25px";
    muted = true;
}
function unmute() {
    audio[playNum].volume = volume;
    volumeButton.style.background = "url(./assets/svg/volume.svg) no-repeat";
    volumeButton.style["background-size"] = "25px 25px";
    muted = false;
}