let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let lapCounter = 0;
const display = document.getElementById('display');
const laps = document.getElementById('laps');
const buttonSound = document.getElementById('button-sound');

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1000);
        running = true;
        buttonSound.play();
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        buttonSound.play();
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
    buttonSound.play();
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapCounter++;
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        laps.appendChild(lapTime);
        buttonSound.play();
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

document.querySelectorAll('.controls button').forEach(button => {
    button.addEventListener('click', () => {
        buttonSound.play();
    });
});
