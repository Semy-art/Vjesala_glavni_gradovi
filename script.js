const capitals = [
"TIRANA","ANDORA","BEČ","MINSK","BRISEL","SARAJEVO","SOFIJA","ZAGREB","NIKOZIJA","PRAG","KOPENHAGEN","TALIN","HELSINKI","PARIZ","BERLIN","ATINA","BUDIMPEŠTA","REJKJAVIK","DABLIN","RIM","RIGA","VADUZ","VILNUS","LUKSEMBURG","VALETA","KIŠINJEV","MONAKO","PODGORICA","AMSTERDAM","SKOPLJE","OSLO","VARŠAVA","LISABON","BUKUREŠT","BEOGRAD","BRATISLAVA","LJUBLJANA","MADRID","STOKHOLM","BERN","ANKARA","KIJEV","LONDON","VATIKAN"];

let chosenWord = capitals[Math.floor(Math.random() * capitals.length)];
let lives = 6;
let correctLetters = [];

const wordDiv = document.getElementById("word");
const livesDiv = document.getElementById("lives");
const keyboardDiv = document.getElementById("keyboard");
const messageDiv = document.getElementById("message");

const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

function drawBase() {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10,240);
    ctx.lineTo(190,240);
    ctx.moveTo(50,240);
    ctx.lineTo(50,20);
    ctx.lineTo(130,20);
    ctx.lineTo(130,40);
    ctx.stroke();
}

function drawHangman(stage) {
    switch(stage) {
        case 5:
            ctx.beginPath();
            ctx.arc(130,60,20,0,Math.PI*2);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(130,80);
            ctx.lineTo(130,150);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(130,100);
            ctx.lineTo(100,120);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(130,100);
            ctx.lineTo(160,120);
            ctx.stroke();
            break;
        case 1:
            ctx.beginPath();
            ctx.moveTo(130,150);
            ctx.lineTo(110,190);
            ctx.stroke();
            break;
        case 0:
            ctx.beginPath();
            ctx.moveTo(130,150);
            ctx.lineTo(150,190);
            ctx.stroke();
            break;
    }
}

function displayWord() {
    let display = "";
    for (let letter of chosenWord) {
        if (letter === " ") {
            display += "  ";
        } else if (correctLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }
    wordDiv.innerText = display;
}

function createKeyboard() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let letter of alphabet) {
        const button = document.createElement("button");
        button.innerText = letter;
        button.onclick = () => handleGuess(letter, button);
        keyboardDiv.appendChild(button);
    }
}

function handleGuess(letter, button) {
    button.disabled = true;

    if (chosenWord.includes(letter)) {
        correctLetters.push(letter);
    } else {
        lives--;
        livesDiv.innerText = "Životi: " + lives;
        drawHangman(lives);
    }

    displayWord();
    checkGameOver();
}

function checkGameOver() {
    let won = true;
    for (let letter of chosenWord) {
        if (letter !== " " && !correctLetters.includes(letter)) {
            won = false;
        }
    }

    if (won) {
        messageDiv.innerText = "POBJEDILI STE! Riječ je bila " + chosenWord;
        disableAllButtons();
    }

    if (lives === 0) {
        messageDiv.innerText = "IZGUBILI STE! Riječ je bila " + chosenWord;
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

drawBase();
displayWord();
createKeyboard();