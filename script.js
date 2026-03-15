class Player{
    constructor(symbol){
        this.symbol = symbol;
    }

    changeSymbol(symbol){
        this.symbol = symbol;
    }
}

const player1 = new Player('X');
const player2 = new Player('O');

const cells = document.querySelectorAll('.cell');
const statusTurn = document.querySelector('#status');
const resetButton = document.querySelector('#reset-button');
const confirmButtons = document.querySelectorAll('.confirm-button');
const inputSymbol1 = document.querySelector('#symbol-input-p1');
const inputSymbol2 = document.querySelector('#symbol-input-p2');

const clickSound = new Audio('Click.mp3');

const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = ['', '', '', '', '', '', '', '', ''];

let currentTurn = player1.symbol;
let roundWon = false;

initGame();


function initGame(){
    cells.forEach(cell => cell.addEventListener('click', clickedCell));
    resetButton.addEventListener('click', reset);
    confirmButtons.forEach(confirmButton => confirmButton.addEventListener('click', confirm));

}

function clickedCell(){
    clickSound.play();
    
    if (!roundWon){
        if (this.innerText === ''){
            let cellIndex = this.getAttribute('index');
            board[cellIndex] = currentTurn;

            this.innerText = currentTurn;
            //this.innerText.style.color = 'red';
            changeTurn();
        }

        checkWinner();
    }    
}

function changeTurn(){
    currentTurn = (currentTurn === player1.symbol) ? player2.symbol : player1.symbol;

    statusTurn.innerText = `Turn: ${currentTurn}`;
}

function reset(){
    currentTurn = player1.symbol;
    roundWon = false;
    statusTurn.innerText = `Turn: ${currentTurn}`;

    board = ['', '', '', '', '', '', '', '', ''];

    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('win-cell');
    });

    clickSound.play();
}

function confirm(){

    let player = this.getAttribute('player');
    console.log(player);


    if (player === '1'){
        let symbol = inputSymbol1.value;

        if (symbol != '' && symbol != player2.symbol){
            player1.changeSymbol(symbol);
            reset();
        }

        inputSymbol1.value = '';
    }
    else{
        let symbol = inputSymbol2.value;

        if (symbol != '' && symbol != player1.symbol){
            player2.changeSymbol(symbol);
            reset();
        }

        inputSymbol2.value = '';
    }

    clickSound.play();

}

function checkWinner(){
    for (let i = 0; i < winCases.length; i++){
        //console.log(1);
        let cellA = winCases[i][0];
        let cellB = winCases[i][1];
        let cellC = winCases[i][2];
        //console.log(i, cellA, cellB, cellC);

        if (board[cellA] != '' && board[cellA] === board[cellB] && board[cellB] === board[cellC]){
            roundWon = true;
            statusTurn.innerText = `Winner: ${board[cellA]}`;
            cells[cellA].classList.add('win-cell');
            cells[cellB].classList.add('win-cell');
            cells[cellC].classList.add('win-cell');
            console.log(board[cellA])
            break;
        }

    }
}

