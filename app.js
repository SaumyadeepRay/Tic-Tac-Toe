let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const gameOverSound = new Audio("sounds_game_over.wav");
const clickSound = new Audio("sounds_click.wav");

let turnX = true; //playerX
 
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX == true) {
            // Player X
            box.innerText = "X";
            turnX = false;
        } else {
            // Player O
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        
        clickSound.play();
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    gameOverSound.play();
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    gameOverSound.play();
    msg.innerText = "The game has ended in a draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    let count = 1;
    for(let pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if(pos1Value != "" && pos2Value != "" && pos3value != "") {
            count = count + 1;
            if(pos1Value == pos2Value && pos2Value == pos3value) {
                showWinner(pos1Value);
            }
            else if(count == 9) {
                showDraw();
            }
        }
    }
};

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);