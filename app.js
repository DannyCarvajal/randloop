const startButton = document.getElementsByClassName('startButton')[0]
const numberOfRepetition = document.getElementsByClassName('repeatLoop')[0]
const intervalSeconds = document.getElementsByClassName('intervalTime')[0]
const words = document.getElementsByClassName('randomWords')[0]
startButton.addEventListener('click', loopInfo)

// SAVE PREVIOUS INFO
if (localStorage.getItem('repeat')) {
    numberOfRepetition.value = JSON.parse(localStorage.getItem('repeat'))
    intervalSeconds.value = JSON.parse(localStorage.getItem('interval'))
    words.value = localStorage.getItem('words')
}


function loopInfo() {
    let repeatData = numberOfRepetition.value
    let intervalData = intervalSeconds.value
    let wordsData = words.value

    localStorage.setItem('repeat', repeatData)
    localStorage.setItem('interval', intervalData)
    localStorage.setItem('words', wordsData)
    window.location.href = "./looper.html"
}


