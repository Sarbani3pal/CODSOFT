let container = document.getElementById('container')

var turn = 0;
var numOfPlayers = 0
var position = []

const ladders = [[39, 79], [55, 66], [76, 95], [7, 46]]
const snake = [[43 , 14] , [91 , 33]]

const diceSound = new Audio('/sound/dice.mp3');
const jumpSound = new Audio('/sound/jump.mp3');
const winSound = new Audio('/sound/win.wav');
const resetSound = new Audio('/sound/reset.mp3');
const snakeBiteSound = new Audio('/sound/snakebite.mp3');



var flag = true
for (let i = 10; i >= 1; i--) {
    if (flag) {
        for (let j = 0; j <= 9; j++) {
            let item = document.createElement(`div`)
            item.id = `item${i * 10 - j}`
            item.className = 'item'
            item.innerText = i * 10 - j
            container.appendChild(item)
        }
        flag = false
    }
    else {
        for (let j = 9; j >= 0; j--) {
            let item = document.createElement(`div`)
            item.id = `item${i * 10 - j}`
            item.className = 'item'
            item.innerText = i * 10 - j
            container.appendChild(item)
        }
        flag = true
    }

}


const gitti = []
const color = ['Blue', 'Green', 'Yellow', 'Red']
const gitti0 = document.createElement('div')
const gitti1 = document.createElement('div')
const gitti2 = document.createElement('div')
const gitti3 = document.createElement('div')

gitti0.className = 'gitti0'            //blue
gitti1.className = 'gitti1'            //green
gitti2.className = 'gitti2'            //yellow
gitti3.className = 'gitti3'            // red
gitti.push(gitti0)
gitti.push(gitti1)
gitti.push(gitti2)
gitti.push(gitti3)


function handleClick() {
    diceSound.load();
    diceSound.play()
    let rand = (Math.random() * 100) % 7
    let num = Math.floor(rand)
    if (num === 0) num = 1
    const prevPosition = document.getElementById(`item${position[turn]}`)
    prevPosition.className = 'item'
    prevPosition.innerText = position[turn]

    if (position[turn] + num == 100) {
        winSound.play()
        const winner = color[turn]
        handleReset();
        setTimeout(() => {
            alert(` ${winner} wins`);
        }, 100);
        
        return
    }
    else if (position[turn] + num < 100) {
        position[turn] += num
        position[turn] = checkLadder(position[turn]);
        position[turn] = checkSnake(position[turn]);
    }

    const number = document.getElementById('number')
    number.innerText = num

    const currentPosition = document.getElementById(`item${position[turn]}`)
    currentPosition.innerText = ''
    currentPosition.appendChild(gitti[turn])
    currentPosition.className = 'currentPosition item'
    turn = (turn + 1) % numOfPlayers;
    const playerTurn = document.getElementById('player-turn')
    playerTurn.className = `gitti${turn}`
}


function handleReset() {
    turn = 0
    resetSound.load();
    resetSound.play();
    // console.log(numOfPlayers)
    for (let i = 0; i < numOfPlayers; i++) {
        const prevPosition = document.getElementById(`item${position[i]}`)
        prevPosition.className = 'item'
        prevPosition.innerText = position[i]
    }

    // for (let i = 0; i < numOfPlayers; i++)
    //     position[i] = 1
    position.length = 0

    const number = document.getElementById('number')
    number.innerText = '_'

    // for (let i = 0; i < numOfPlayers; i++) {
    //     const currentPosition = document.getElementById(`item${position[i]}`)
    //     currentPosition.className = 'currentPosition'
    // }
    const playerTurn = document.getElementById('player-turn')
    playerTurn.className = `gitti0`

    const dicebox  =  document.getElementById('dice-box')
    dicebox.className = 'hide' 

    const form = document.getElementById('form')
    form.className = 'form'

}

function checkLadder(pos) {
    for (var i = 0; i < ladders.length; i++) {
        if (ladders[i][0] == pos) {
            jumpSound.play()
            return ladders[i][1];
        }
    }
    return pos;
}

function checkSnake(pos) {
    for (var i = 0; i < snake.length; i++) {
        if (snake[i][0] == pos) {
            snakeBiteSound.play()
            return snake[i][1];
        }
    }
    return pos;
}

function startHandler(){
    resetSound.load();
    resetSound.play();
    const nop = document.getElementById('numofplayers')
    numOfPlayers = nop.value 
    
    for (let i = 0; i < numOfPlayers; i++) {
        position.push(1);
    }

    const dicebox  =  document.getElementById('dice-box')
    dicebox.className = 'dice-box'

    const form = document.getElementById('form')
    form.className = 'hide'
}