'use strict';
var count = 0;
var i = [];
const cards = document.querySelectorAll('.card');
const allCards = [...cards];
const openCards = [];
const restartGame = document.querySelectorAll('.restart');
var moves = 0;
const gameMoves = document.querySelector('.moves');
const gameStars = document.querySelectorAll('.stars');
var hour = 0;
var minute = 0;
var second = 1;
const t = document.querySelector('.timer');
t.innerHTML = '0hours 0minutes 0seconds';
var timer;
var starsNo = 3;

//Shuffle cards
function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = allCards[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function shuffleCards() {
    const deck = document.querySelectorAll('.deck');
    var shuffledCards = shuffle(allCards);
    for (var n = 0; n < shuffledCards.length; n++) {
        [].forEach.call(shuffledCards, function(item) {
            deck[0].appendChild(item);
        })
    }
}

shuffleCards();

//if cards do not match run this function
function unmatched () {
    setTimeout(function() {
        openCards[i-1].classList.remove('open');
        openCards[i-1].classList.remove('show');
        openCards[i-1].classList.remove('disabled');
        openCards[i].classList.remove('open');
        openCards[i].classList.remove('show');
        openCards[i].classList.remove('disabled');
        openCards.pop(this);
        openCards.pop(openCards[0]);
    }, 500);
}

//Timer
function startingTime () {
    t.innerHTML = hour + 'hours ' + minute +'minutes '+ second + 'seconds';
    second++;
    if (second === 60) {
        minute++;
        second = 0;
    }
    if (minute === 60) {
        hour++;
        minute = 0;
    }
}

function time () {
    timer = setInterval(startingTime, 1000);
}

//Start timer and hide stars
function allMoves () {
    moves++;
    gameMoves.innerHTML = moves;
    if (moves === 1) {
        time ();
    }
    if (moves > 16 && moves <= 20) {
        gameStars[0].children[2].style.display = 'none';
        starsNo = 2;
    }
    if (moves > 20 && moves <= 24) {
        gameStars[0].children[1].style.display = 'none';
        starsNo = 1;
    }
    else if (moves > 24) {
        starsNo = 1;
    }
}

//Show alert at the end of the game
function gameOver () {
    if (openCards.length === 16) {
        clearInterval(timer);
        setTimeout(function() {
            window.alert('Congratulations! You won!' + '\n' + 'Your time is ' + t.innerHTML + '\n' + 'You made ' + moves + ' moves and got ' + starsNo + ' stars.');
        }, 500);
    }
    else {
    
    }
}

//Restart game after selecting the button
restartGame.forEach(function(restart) {
    restart.addEventListener('click', function (event) {
        for (var j = 0; j < openCards.length; j++) {
            openCards[j].classList.remove('match');
            openCards[j].classList.remove('disabled');
            openCards[j].classList.remove('open');
            openCards[j].classList.remove('show');
            }
        openCards.pop();
        openCards.length = 0;
        count = 0;
        i = 1;
        gameMoves.innerHTML = 0;
        moves = 0;
        clearInterval(timer);
        t.innerHTML = '0hours 0minutes 0seconds';
        hour = 0;
        minute = 0;
        second = 0;
        gameStars[0].children[0].style.display = '';
        gameStars[0].children[1].style.display = '';
        gameStars[0].children[2].style.display = '';
        shuffleCards();
    })
})

//Open 2 cards and check if they're matching
cards.forEach(function(card) {
    count = 0;
    card.addEventListener('click', function(e) {
        count++;
        i = 0;
        allMoves();
            if (count === 1) {
                card.classList.toggle('open');
                card.classList.toggle('show');
                card.classList.toggle('disabled');
                openCards.push(this);
                console.log(count);
            }
            else if (count === 2) {
                i =  openCards.length;
                card.classList.toggle('open');
                card.classList.toggle('show');
                card.classList.toggle('disabled');
                openCards.push(this);
                if (openCards[i-1].innerHTML === openCards[i].innerHTML) {
                    card.classList.add('match');
                    card.classList.remove('open');
                    card.classList.remove('show');
                    openCards[i-1].classList.add('match');
                    openCards[i-1].classList.remove('open');
                    openCards[i-1].classList.remove('show');
                    console.log(count);
                    count = 0;
                }
                else {
                    unmatched();
                    count = 0;
                }
            }
    gameOver();
    })
})
