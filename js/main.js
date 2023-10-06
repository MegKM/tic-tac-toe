/*----- constants -----*/
const COLOURS = {
    "0": null,
    "1": "green",
    "-1": "purple"
}

//   1.2) Define the 8 possible winning combinations, each containing three indexes of the board that make a winner if they hold the same player value.

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

// 4) Upon loading the app should:
//   4.1) Initialize the state variables:
//     4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where 
init();

function init(){
    state.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    state.turn = 1;
    state.winner = null;
    render();
}

function handleClick(event){
// 5) Handle a player clicking a square:
//   5.1) Obtain the index of the square that was clicked by either:
//     5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
//     5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.

    const clickedSquare = event.target;
    // console.log(clickedSquare);

    // const clickedIndex = [...elements.squares].indexOf(event.target);
    // console.log("clicked index " + clickedIndex);

    // const trialRun = elements.squares[clickedIndex];
    // console.log(trialRun)

    elements.squares.forEach(function(event, index){
        if (clickedSquare === event){
            if(state.board[index] === 0){
                state.board[index] = state.turn;
            };
            console.log(event);
            console.log("this won't work");
        };
    })

    state.turn *= -1;
    render();

}

function renderBoard(){
    state.board.forEach(function (value, index) {
        const id = `square${index}`;
        const square = document.getElementById(id);
        square.style.backgroundColor = COLOURS[value];
    })
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

function render() {
    renderBoard();
    renderMessage();
    // renderControls();
}



function renderMessage(){
    if (state.winner) {
        elements.message.innerHTML = `<span style="color: ${ COLOURS[state.winner] }">${ COLOURS[state.winner] }</span>'s wins!`;    
    }
    else {
        elements.message.innerHTML = `<span style="color: ${ COLOURS[state.turn] }">${ COLOURS[state.turn] }'s turn</span>`;
    }
    // TODO: show tie
    
    
}
// index 0 maps to the top-left square and index 8 maps to the bottom-right square.
//     4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.
//     4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. 
//   4.2) Render those state variables to the page:
//     4.2.1) Render the board:
//       4.2.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration:
//         4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.
//         4.3.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).
//     4.2.2) Render a message:
//       4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.
//       4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
//       4.2.2.3) Otherwise, render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.
//   4.3) Wait for the user to click a square

// 6) Handle a player clicking the replay button:
//   6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).