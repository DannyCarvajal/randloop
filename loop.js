
const secondsText = document.getElementsByClassName('seconds')[0]
const wordsText = document.getElementsByClassName('words')[0]
let numberOfRepetition = Math.abs(Math.round(localStorage.getItem('repeat')))
let intervalSeconds = Math.abs(Math.round(localStorage.getItem('interval')))
let words = localStorage.getItem('words').split(",")
const intervalCopy = intervalSeconds

// PREVENT SAME REPETITIONS, EACH ONE CAN REPEAT DEPENDING ON THE NUMBER OF REPETITIONS
let maxPerWord = numberOfRepetition / words.length
let selectedWords = []
let excludedWord = []

const randomWord = () => {

    let selectedWord = words[Math.floor(Math.random() * words.length)]
    selectedWords.push(selectedWord)

    if (excludedWord.includes(selectedWord)) {
        return randomWord()

    } else {
        words.forEach(word => {

            let times = selectedWords.filter((v) => (v === word)).length;

            if (times === maxPerWord && !excludedWord.includes(word))
                excludedWord.push(word)

        })

    }

    return selectedWord
}

const countAnimation = () => {

    let downMovingBox = document.createElement('div')
    downMovingBox.className = "downCountAnimation"
    downMovingBox.style.animation = `downCount ${intervalSeconds}s ease-in-out `
    document.body.appendChild(downMovingBox)

}


const loopRepetitionCount = () => {

    // SET SECONDS TO TOP AGAIN, 1 REPETITION LESS IN COUNT,IF REPETITION IS COMPLETED PRINT FINAL MESSAGE
    if (numberOfRepetition > 1) {
        setTimeout(() => {
            intervalSeconds = intervalCopy
            numberOfRepetition--
            counter()
        }, `${intervalSeconds}000`)

    } else {
        setTimeout(() => {
            wordsText.innerHTML = "<i class=\"fas fa-redo\"></i>"
            wordsText.classList.toggle('reload')
            wordsText.addEventListener('click', () => window.history.back())
            secondsText.setAttribute('style', 'font-size:5rem;')
            secondsText.innerHTML = randomPhrase()
        }, `${intervalSeconds}000`)

    }

}

counter()

const motivationalEndPhrase = ["Your amazing", "Don't be on your comfort zone", "Give your all", "When will you get it ? ", "Mess with the best or die like the rest", "The music is the fuel of the soul", "Did you give your all today?"]

const randomPhrase = () => {
    return motivationalEndPhrase[Math.floor(Math.random() * 6)]
}

async function counter() {

    secondsText.innerText = intervalSeconds
    wordsText.innerHTML = randomWord()

    // EVERY SECOND, COUNT 1 LESS
    const secondsInterval = () => {
        intervalSeconds--
        secondsText.innerText = intervalSeconds
        console.log(intervalSeconds)

        if (secondsText.innerText == 1)
            clearTimeout(printSeconds)

    }

    var printSeconds = setInterval(secondsInterval, 1000);

    countAnimation()

    // ERASE DOWNCOUNT ANIMATION WHEN INTERVAL'S OVER
    setTimeout(() => {
        let downCount = document.getElementsByClassName('downCountAnimation')[0]
        document.body.removeChild(downCount)
    }, `${intervalSeconds}000`);

    loopRepetitionCount()

}


