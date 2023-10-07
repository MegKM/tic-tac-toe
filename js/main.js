/*----- constants -----*/
const COLOURS = {
    "0": null,
    "1": "green",
    "-1": "purple"
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
    winner: null
}

/*----- cached elements  -----*/
const elements = {
    message: document.querySelector("h1"),
    playAgain: document.querySelector("button"),
    squares: document.querySelectorAll("#board > div")
}

/*----- event listeners -----*/
document.getElementById("board").addEventListener('click', handleClick);
elements.playAgain.addEventListener('click', init);


/*----- functions -----*/
init();

function init(){
    state.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    state.turn = 1;
    state.winner = null;
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
                state.board[index] = state.turn;
                let result = checkWinner(state.turn);
                console.log(result);
                if(result !== 0 && result !== undefined){
                    console.log("winner is: " + COLOURS[state.turn]);
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
        console.log(state.board[6])
        if(state.board[6] !== 0){
            return state.board[6];
        }
    }
    else if (state.board[0] === playersTurn && state.board[3] === playersTurn && state.board[6] === playersTurn){
        console.log(state.board[0])
        if(state.board[0] !== 0){
            return state.board[0];
        }
    }
    else if (state.board[1] === playersTurn && state.board[4] === playersTurn && state.board[7] === playersTurn){
        console.log(state.board[1])
        if(state.board[1] !== 0){
            return state.board[1];
        }
    }
    else if (state.board[2] === playersTurn && state.board[5] === playersTurn && state.board[8] === playersTurn){
        console.log(state.board[5])
        if(state.board[5] !== 0){
            return state.board[5];
        }
    }
    else if (state.board[0] === playersTurn && state.board[4] === playersTurn && state.board[8] === playersTurn){
        console.log(state.board[0])
        if(state.board[0] !== 0){
            return state.board[0];
        }
    }
    else if (state.board[2] === playersTurn && state.board[4] === playersTurn && state.board[6] === playersTurn){
        console.log(state.board[2])
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
        square.style.backgroundColor = COLOURS[value];
    })
} 

function render() {
    renderBoard();
    renderMessage();
}

function renderMessage(){
    if (state.winner) {
        elements.message.innerHTML = `<span style="color: ${ COLOURS[state.winner] }">${ COLOURS[state.winner] }s wins!</span>`;    
    }
    else {
        elements.message.innerHTML = `<span style="color: ${ COLOURS[state.turn] }">${ COLOURS[state.turn] }'s turn</span>`;
    }
    // TODO: show tie
    
}


//   5.2) If the board has a value at the index, immediately return because that square is already taken.
//   5.3) If winner is not null, immediately return because the game is over.
//   5.4) Update the board array at the index with the value of turn.
//   5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
//   5.6) Set the winner variable if there's a winner:
//     5.6.1) Loop through the each of the winning combination arrays defined.
//     5.6.2) Total up the three board positions using the three indexes in the current combo.
//     5.6.3) Convert the total to an absolute value (convert any negative total to positive).
//     5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.
//   5.7) If there's no winner, check if there's a tie:
//     5.7.1) Set winner to 'T' if there are no more nulls in the board array.
//   5.8) All state has been updated, so render the state to the page (step 4.2).
