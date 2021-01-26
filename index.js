const startbtn = document.getElementById('start');
const stopbtn = document.getElementById('stop');
const resetbtn = document.getElementById('reset');
const resumeBtn = document.getElementById('resume');
const lapBtn = document.getElementById('lap');
const screen = document.getElementById('screen');
const lapCon = document.getElementById('lapCon');
var lapCount = 0;
var intervalId, startTimeCopy, stopTime, currentTime;

function calculateTime(ellapsedFromStart, ellapsedFromStop) {
    var startTime = Date.now() - ellapsedFromStart;
    console.log('starttime ' + startTime) ///
    intervalId = setInterval(() => {
        currentTime = Date.now() - ellapsedFromStop; //updated every milliseconds
        let diff = Math.abs(startTime - currentTime); //in milliseconds //diff is used to measure the stopwatch time
        let diffInHrs = diff / 3600000;
        let hh = Math.floor(diffInHrs);

        let diffInMin = (diffInHrs - hh) * 60;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMillSec = (diffInSec - ss) * 1000;
        let ms = Math.floor(diffInMillSec);


        let formattedHH = hh.toString().padStart(2, "0");
        let formattedMM = mm.toString().padStart(2, "0");
        let formattedSS = ss.toString().padStart(2, "0");
        let formattedMS = ms.toString().padStart(2, "0");

        screen.innerHTML = `${formattedHH}:${formattedMM}:${formattedSS}`

    }, 1);


}

resetbtn.onclick = () => {
    screen.innerHTML = '00:00:00';
    lapCon.innerHTML = '';
    clearInterval(intervalId);
    resumeBtn.style.display = 'none'; //remove the resume btn when reset btn is clicked
    resetbtn.style.display = 'none';
    stopbtn.style.display = 'none';
    lapBtn.style.display = 'none';
}

startbtn.addEventListener('click', () => {
    startTimeCopy = Date.now();
    calculateTime(0, 0);
    resetbtn.style.display = 'inline-block';
    stopbtn.style.display = 'inline-block';
    lapBtn.style.display = 'inline-block';
});

stopbtn.onclick = () => {
    stopTime = currentTime; //the last value generated before clearinterval
    resumeBtn.style.display = 'inline-block'; //display the resume btn when stop btn is clicked
    clearInterval(intervalId);

}

resumeBtn.addEventListener('click', () => {
    let resumeTime = Date.now();
    let ellapsedFromStop = Math.abs(resumeTime - stopTime);
    let ellapsedFromStart = Math.abs(resumeTime - startTimeCopy);
    calculateTime(ellapsedFromStart, ellapsedFromStop);
    resumeBtn.style.display = 'none'; //remove the resume btn when resume btn is clicked
});

lapBtn.addEventListener('click', () => {
    lapCount++;
    let newLapId = document.createElement('p');
    newLapId.innerHTML = lapCount + ": " + screen.innerHTML;
    lapCon.appendChild(newLapId);
})