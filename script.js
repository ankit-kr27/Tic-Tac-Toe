const selectPartyContainer = document.querySelector(".select-party-container");
const gameContainer = document.querySelector(".game-on-container");
const resultContainer = document.querySelector('.winner-container');

const switchBtn = document.querySelector('.switch-btn');
const startBtn = document.querySelector(".start-btn")

const player1State = {
    pName: "Player1",
    p1sym: 'X'
}
const player2State = {
    pName: "Player1",
    p2sym: 'O'
}

function setGameState(state) {   // states : init, ongame, result
    switch (state) {
        case "init": {
            // hiding and unhiding containers
            selectPartyContainer.classList.remove("hide");
            gameContainer.classList.add('hide');
            resultContainer.classList.add('hide');
            break
        }
        case 'ongame': {
            // hiding and unhiding containers
            selectPartyContainer.classList.add("hide");
            gameContainer.classList.remove('hide');
            resultContainer.classList.add('hide');
            break
        }
        case 'result': {
            // hiding and unhiding containers
            selectPartyContainer.classList.add("hide");
            gameContainer.classList.add('hide');
            resultContainer.classList.remove('hide');
            break
        }
    }
}

startBtn.addEventListener('click', () => {
    setGameState('ongame')
})

switchBtn.addEventListener('click', () => {
    let temp = player1State.p1sym
    player1State.p1sym = player2State.p2sym
    player2State.p2sym = temp

    updateDisplay(player1State, player2State)
})

function updateDisplay(p1, p2) {
    document.querySelector('.player-1-symbol').innerText = p1.p1sym
    document.querySelector('.player-2-symbol').innerText = p2.p2sym

    document.querySelector('.chance-1').innerText = player1State.p1sym
    document.querySelector('.chance-2').innerText = player2State.p2sym
}

// *******************************************
// DEFAULT MODE
function initiateGame() {
    setGameState("init");
    // setCurrentTurn(player1State)
}
initiateGame();

// *************** ONGAME ********************

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]


function currentPlayerSym() {
    if (playerTurn % 2 == 0) {
        return player1State.p1sym
    }
    else {
        return player2State.p2sym
    }
}

let playerTurn = 0; // even: player 1; odd: player 2
const p1occupied = []
const p2occupied = []

function setOccupancy(index) {
    if (playerTurn % 2 == 0) {
        p1occupied.push(index);
        p1occupied.sort()
    }
    else {
        p2occupied.push(index);
        p2occupied.sort();
    }
}

function checkWinner() {
    let containsElement;
    if (p1occupied.length >= 3) {
        for (let combination of winningCombinations) {
            containsElement = combination.every(element => {
                element in p1occupied
            })
            if(containsElement){return player1State}
        }
    }
    if (p2occupied.length >= 3) {
        for (let combination of winningCombinations) {
            containsElement = combination.every(element => {
                element in p2occupied
            })
            if(containsElement){return player2State}
        }
    }
    return undefined
}

const gameGrid = document.querySelector('.game-grid')

gameGrid.addEventListener('click', (e) => {
    let cell = e.target
    if (cell.dataset.vac == "") {
        cell.innerText = currentPlayerSym()
        cell.dataset.vac = cell.innerText
        // console.log(cell.dataset.vac)
        setOccupancy(parseInt(cell.dataset.index))
        playerTurn++;
    }
    let winner = checkWinner()
    // console.log(winner)
    if(winner) { declareWinner(winner) }
})

function declareWinner(winner){
    setGameState('result');
    // console.log("winner declared")
}
