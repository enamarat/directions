const directions = ["left", "right", "top", "bottom", 
                    "right", "left", "bottom", "top", 
                    "left", "top", "right", "bottom",
                    "right", "bottom", "left", "top"];

const directions_russian = ["лево", "право", "верх", "низ",
                            "право", "лево", "низ", "верх",
                            "лево", "верх", "право","низ",
                            "право", "низ", "лево", "верх"];
let count = 0;
let mistakes = 0;
let directionChosen = false;
let gameOver = true;
let language = "English";


const checkDirection = (event) => {
    if (gameOver == false) {
        // User moved cursor in right direction
        if (event.target.className == "panel" && event.target.id === directions[count]) {
            document.querySelector(`#${event.target.id}`).className = "panel_correct";
            count++;
            directionChosen = false;
        } 

        // User moved cursor in wrong direction
        if (event.target.className == "panel" && event.target.id !== directions[count] && directionChosen == false) {
            mistakes++;
            directionChosen = true;
        } 

        if (count < directions.length) {
            if (language == "English") {
                document.querySelector("h1").textContent = directions[count].toUpperCase();
            } else if (language == "Russian") {
                document.querySelector("h1").textContent = directions_russian[count].toUpperCase();
            }
            
            document.querySelector("#mistakes").textContent = `Mistakes: ${mistakes}`;
        } else {
            if (gameOver == false) {
                finishGame();
            }
        }
    }
}

const clearPanel = (event) => {
    if (event.target.className == "panel_correct") {
        document.querySelector(`#${event.target.id}`).className = "panel";
    }
}

const startGame = () => {
    count = 0;
    mistakes = 0;
    gameOver = false;
   
    if (language == "English") {
        document.querySelector("h1").textContent = directions[count].toUpperCase();
    } else if (language == "Russian") {
        document.querySelector("h1").textContent = directions_russian[count].toUpperCase();
    }

    document.querySelector("#start_button").style.display = "none";
}

const finishGame = () => {
    gameOver = true;
    document.querySelector("h1").textContent = "GAME OVER!";
    document.querySelector("#start_button").style.display = "block";
}

const changeLanguage = () => {
    if (language == "English") {
        language = "Russian";
        document.querySelector("#language").textContent = "ENG";
    } else if (language == "Russian") {
        language = "English";
        document.querySelector("#language").textContent = "RUS";
    }
}

document.querySelector("body").addEventListener("mouseover", checkDirection);
document.querySelector("body").addEventListener("mouseout", clearPanel);
document.querySelector("#start_button").addEventListener("click", startGame);
document.querySelector("#language").addEventListener("click", changeLanguage);