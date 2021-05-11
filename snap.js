const suits = ['❤️','♦️','♠️','♣️'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];
let cardPile = [];
let playerOneScore = 0;
let playerTwoScore = 0;
let previousCard = "";
let playerTurn;
let timer;

document.getElementById("startGameButton").addEventListener("click", startGame);

function createDeck() {
    for(i = 0; i < suits.length; i++){
        for(x = 0; x < values.length; x++){
            let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
        }
    }
    return deck
}

function shuffle(deck) {
    deck.sort(() => Math.random() - 0.5);
}

function hideElement(e) {
    document.getElementById(e).style.display = 'none'
}

function scorePoint() {
    let coinFlip = Math.random() < 0.5;
    if (coinFlip === true){
        playerOneScore++
    } else {
        playerTwoScore++
    }
}


function flipCard() {
    let currentCard = deck.pop();

    if(deck.length > 0){
        cardPile.push(currentCard);
    }

    if(cardPile.length >= 1){
        document.getElementById("currentCard").innerHTML = currentCard.Value + currentCard.Suit;
    }

    if(cardPile.length >= 2){
        snapCheck(currentCard, cardPile[cardPile.length - 2])
        document.getElementById("previousCard").innerHTML = cardPile[cardPile.length - 2].Value + cardPile[cardPile.length - 2].Suit;
    }

    if (deck.length === 0) {
        victoryCheck;
        clearInterval(timer)
    }
}

function victoryCheck() {
    if(playerOneScore === playerTwoScore){
        console.log('It\'s a tie!')
        document.getElementById("playerOneName").innerHTML = "Everybody wins!"
        document.getElementById("playerTwoName").innerHTML = "Everybody wins!"
    }
    if(playerOneScore > playerTwoScore) {
        document.getElementById("playerOneName").innerHTML = "You win! 🏆"
        document.getElementById("playerTwoName").innerHTML = "Not today 🤖 "
    } else {
        document.getElementById("playerOneName").innerHTML = "Not today 🤖 "
        document.getElementById("playerTwoName").innerHTML = "You win! 🏆"
    }
}

function snapCheck(currentCard, previousCard) {
    if(currentCard.Value === previousCard.Value || currentCard.Suit === previousCard.Suit) {
        scorePoint()
    }
    document.getElementById("playerOneScore").innerHTML = playerOneScore;
    document.getElementById("playerTwoScore").innerHTML = playerTwoScore;

    if(deck.length === 0){
        victoryCheck();
    }
}

function startGame() {
    hideElement('startGameButton')
    hideElement('welcomeMessage')
    createDeck()
    shuffle(deck)
    timer = setInterval(flipCard, 500);
}