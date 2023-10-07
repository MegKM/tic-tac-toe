/*----- constants -----*/

const COLOURS = {
    "0": null,
    "1": "<img height=180px src='assets/playerX.png'>",
    "-1": "<img height=180px src='assets/playerO.png'>"
}

const SYMBOLS = {
    "1": "X",
    "-1": "O"
}

//   1.2) Define the 8 possible winning combinations, each containing three indexes of the board that make a winner if they hold the same player value.
/*
horizonal win:
if(state.board[0] === playersTurn && state.board[1] === playersTurn && state.board[2] === playersTurn)
1)[n, n, n, 0, 0, 0, 0, 0, 0]
if(state.board[3] === playersTurn && state.board[4] === playersTurn && state.board[5] === playersTurn)
2)[0, 0, 0, n, n, n, 0, 0, 0]
if(state.board[6] === playersTurn && state.board[7] === playersTurn && state.board[8] === playersTurn)
3)[0, 0, 0, 0, 0, 0, n, n, n]

verical win:
if(state.board[0] === playersTurn && state.board[3] === playersTurn && state.board[6] === playersTurn)
4)[n, 0, 0, n, 0, 0, n, 0, 0]
if(state.board[1] === playersTurn && state.board[4] === playersTurn && state.board[7] === playersTurn)
5)[0, n, 0, 0, n, 0, 0, n, 0]
if(state.board[2] === playersTurn && state.board[5] === playersTurn && state.board[8] === playersTurn)
6)[0, 0, n, 0, 0, n, 0, 0, n]

diagonal win:
if(state.board[0] === playersTurn && state.board[4] === playersTurn && state.board[8] === playersTurn)
7)[n, 0, 0, 0, n, 0, 0, 0, n]
if(state.board[2] === playersTurn && state.board[4] === playersTurn && state.board[6] === playersTurn)
8)[0, 0, n, 0, n, 0, n, 0, 0]

*/
/*----- state variables -----*/
const state = {
    board: null,
    turn: null,
    winner: "playing",
    turnCount: 0
}

/*----- cached elements  -----*/
const elements = {
    message: document.querySelector("h1"),
    playAgain: document.querySelector("button"),
    squares: document.querySelectorAll("#board > div"),
}

// const img = document.createElement("img");
// img.src = "assets/playerX.png";
// const src = document.getElementById("#square0");
// src.appendChild(img);
// testRun.innerHTML = <img src="assets/playerX.png"/>

/*----- event listeners -----*/

elements.playAgain.addEventListener('click', init);


/*----- functions -----*/
init();

function init(){
    state.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    state.turn = 1;
    state.winner = "playing";
    state.turnCount = 0;
    document.getElementById("board").addEventListener('click', handleClick);
    render();
}

function handleClick(clickEvent){
    //get value of clicked item
    const clickedSquare = clickEvent.target;
    //loop through cached elements
    elements.squares.forEach(function(value, index){
        //check if clicked item matches value in cached item
        if (clickedSquare === value){
            //check if item in state.board is equal to 0. If it is, update it to current player's value. If not, do nothing.
            if(state.board[index] === 0){
                state.turnCount += 1;
                console.log(state.turnCount);
                state.board[index] = state.turn;
                let result = checkWinner(state.turn);
                if(result !== 0 && result !== undefined){
                    state.winner = "winnerFound";
                    console.log("winner is: " + COLOURS[state.turn]);
                    render();
                    document.getElementById("board").removeEventListener("click", handleClick);
                    return;
                }

                if(state.turnCount === 9){
                    state.winner = "tieDetected";
                    render();
                }
                state.turn *= -1;
            }
            else{
                return;
            }
        };
    });
    //update board with new values
    render();
};

function checkWinner(playersTurn){
    if(state.board[0] === playersTurn && state.board[1] === playersTurn && state.board[2] === playersTurn){
        if (state.board[0] !== 0){
            return state.board[0];
        } 
    }
    else if(state.board[3] === playersTurn && state.board[4] === playersTurn && state.board[5] === playersTurn){
        if(state.board[3] !== 0){
            return state.board[3];
        }
    }
    else if (state.board[6] === playersTurn && state.board[7] === playersTurn && state.board[8] === playersTurn){
        if(state.board[6] !== 0){
            return state.board[6];
        }
    }
    else if (state.board[0] === playersTurn && state.board[3] === playersTurn && state.board[6] === playersTurn){
        if(state.board[0] !== 0){
            return state.board[0];
        }
    }
    else if (state.board[1] === playersTurn && state.board[4] === playersTurn && state.board[7] === playersTurn){
        if(state.board[1] !== 0){
            return state.board[1];
        }
    }
    else if (state.board[2] === playersTurn && state.board[5] === playersTurn && state.board[8] === playersTurn){
        if(state.board[5] !== 0){
            return state.board[5];
        }
    }
    else if (state.board[0] === playersTurn && state.board[4] === playersTurn && state.board[8] === playersTurn){
        if(state.board[0] !== 0){
            return state.board[0];
        }
    }
    else if (state.board[2] === playersTurn && state.board[4] === playersTurn && state.board[6] === playersTurn){
        if(state.board[2] !== 0){
            return state.board[2];
        }
    }
    else{
        return 0;
    }
}

function renderBoard(){
    state.board.forEach(function (value, index) {
        const id = `square${index}`;
        const square = document.getElementById(id);
        square.innerHTML= COLOURS[value];
    })
} 

function render() {
    renderBoard();
    renderMessage();
}

function renderMessage(){
    if (state.winner === "winnerFound") {
        elements.message.innerHTML = `<span style="font-size: 5vmin">${ SYMBOLS[state.turn] } WINS!</span>`;  
        start();
        stop();
    }
    else if (state.winner === "tieDetected"){
        elements.message.innerText = "It's a tie \n ¯\\_(ツ)_/¯"
    }
    else {
        elements.message.innerHTML = `<span>${ SYMBOLS[state.turn] }'s turn</span>`;
    }

    
}


// ---- PLEASE NOTE, I DID NOT WRITE THE BELOW CODE ----//

// Source for instructions: https://dev.to/official_fire/creating-a-confetti-effect-in-5-minutes-16h3
// Source for confetti.js file: https://github.com/CoderZ90/confetti/blob/main/confetti.js

// for starting the confetti 
const start = () => {
    setTimeout(function() {
        confetti.start()
    }, 0.1000); 
}
//  for stopping the confetti 
const stop = () => {
    setTimeout(function() {
        confetti.stop()
    }, 2000); 
}

// ---------------------------------------------------- //