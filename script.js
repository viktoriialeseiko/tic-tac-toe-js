const xClass = 'blue';
const oClass = 'red';

const cellElements = document.querySelectorAll('.cell');
const nextTurn = document.querySelector('.message');
const restartButton = document.querySelector('.restart');

restartButton.addEventListener('click', startGame);

const winningCombinations = [
    //horizotal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
]

let oTurn;

startGame()

function startGame(){
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove('red', 'blue');
        nextTurn.innerText = '';
        cell.addEventListener('click', handleClick);
    })
}

function handleClick(e){
    const cell = e.target;
    const currentClass = oTurn ? oClass : xClass;

    placeColor(cell, currentClass);
    if(checkWinner(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        switchTurn();
    }
}

function placeColor(cell, currentClass){
    cell.classList.add(currentClass);
    cell.removeEventListener('click', handleClick);
    nextTurn.innerText = oTurn ? "X's Turn" : "O's Turn";
}

function switchTurn(){
    oTurn = !oTurn;
}

function endGame(draw){
    if(draw){
        nextTurn.innerText = "Draw!";
    }else{
        nextTurn.innerText = `${oTurn ? "O's" : "X's"} Win!`;
    }
    cellElements.forEach(i=>{
        i.removeEventListener('click', handleClick);
    })
}

function checkWinner(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function isDraw(){
    return Array.from(cellElements).every(cell=>{
        return cell.classList.contains(xClass) || cell.classList.contains(oClass);
    })
}