const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
let isPlaying = true;
let indexSong = 0;
displayTimer();
let timer;
const musics = [
  "holo.mp3",
  "summer.mp3",
  "spark.mp3",
  "home.mp3",
  "vamos.mp3",
  "oelc.mp3",
];
song.setAttribute("src", `./musics/${musics[indexSong]}`);
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  changeSong(1);
}
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  song.setAttribute("src", `./musics/${musics[indexSong]}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  //console.log("clicked");
  if (isPlaying) {
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}

function displayTimer() {
  //console.log("displayTimer");
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}

function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const second = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    second < 10 ? "0" + second : second
  }`;
}

rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
