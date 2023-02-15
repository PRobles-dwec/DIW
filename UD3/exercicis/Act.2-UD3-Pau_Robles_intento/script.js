//Audio variables
var audio = document.querySelector("#audio");
var audioSource = document.querySelector("#audioSource");

//Functions variables first audio
function playAudio(e){
    var audioSelected = document.getElementById(e.srcElement.id).getAttribute('audio');
    audioSource.src = audioSelected;
    audio.load();
    audio.play();
  }

    document.getElementById("audio1").addEventListener("click", playAudio, false);
    document.getElementById("audio2").addEventListener("click", playAudio, false);
    document.getElementById("audio3").addEventListener("click", playAudio, false);
    document.getElementById("audio4").addEventListener("click", playAudio, false);
    document.getElementById("audio5").addEventListener("click", playAudio, false);
    document.getElementById("audio6").addEventListener("click", playAudio, false);

function pauseAudio(e) {
    var audioSelected = document.getElementById(e.srcElement.id).getAttribute('audio');
    audioSource.src = audioSelected;
    audio.pause();
}

function stopAudio(e) {
    var audioSelected = document.getElementById(e.srcElement.id).getAttribute('audio');
    audioSource.src = audioSelected;
    audio.load();
}
function rewindAudio(e) {
    var audioSelected = document.getElementById(e.srcElement.id).getAttribute('audio');
    audioSource.src = audioSelected;
    audio.currentTime -= 10;
    audio.play();
}
function forwardAudio(e) {
    var audioSelected = document.getElementById(e.srcElement.id).getAttribute('audio');
    audioSource.src = audioSelected;
    audio.currentTime -= 10;
    audio.play();
}
