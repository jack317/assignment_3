const suits = ['Diamonds <span>&#9830</span>', 'Hearts <span>&#9829</span>', 'Spades <span>&#9824</span>', 'Clubs <span>&#9827</span>'];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
var deck = new Array();
// Starting bank of $1000
startingBank = [1000];
var bet = 0;


window.onload = function () {
    var hit = document.getElementById("hit");
    var stay = document.getElementById("stay");
    var error = document.getElementById("error");
    var restart = document.getElementById("restart");
    var message = document.getElementById("message");
    var bank = document.getElementById("bank");
    bank.innerHTML = `$${startingBank[0]}`
    // Hide hit, stay, errors, and restart until the game has started
    hit.style.display = "none";
    stay.style.display = "none";
    error.style.display = "none";
    restart.style.display = "none";
    document.getElementById("play").addEventListener('click', () => startGame());
    document.getElementById("hit").addEventListener('click', () => hitPlayer(deck));
    document.getElementById("stay").addEventListener('click', () => standPlayer(deck));
    document.getElementById("restart").addEventListener('click', () => restartGame());
}

function startGame() {
    bet = document.getElementById("bets").value;
    if (bet <= 0) {
        error.innerHTML = "Your bet must be greater than 1!";
        error.style.display = 'block';
        return
    }
    hit.style.display = 'block';
    stay.style.display = 'block';
    startingBank[0] = startingBank[0] - bet;
    bank.innerHTML = `$${startingBank[0]}`
    deck = createDeck();
    deck = shuffle(deck);
    hand = hands(deck);
    renderPlayerCards(playerHand);
    // render just one of the dealers cards
    renderFirstDealer(dealerHand);
    checkWinConditions(dealer);
    checkWinConditions(player);
}

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.name = `${value} of ${suit}`;
    }
    real_value(value) {
        if (this.value == "Jack" || this.value == "Queen" || this.value == "King")
            return 10
        else if (this.value == "Ace")
            return 11
        else
            return parseInt(this.value)
    }
}

function createDeck() {
    deck = new Array();
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            card = new Card(values[i], suits[j])
            card.real_value = card.real_value()
            deck.push(card);
        }
    }
    return deck
}

// Random Int between two values for shuffling function
// Credit to MDN web docks https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Shuffle function that randomly swaps positions of cards 1000 times
function shuffle(deck) {
    for (let i = 0; i < 1000; i++) {
        var randomPos1 = getRandomInt(0, 52);
        var randomPos2 = getRandomInt(0, 52);
        var temp = deck[randomPos1];
        deck[randomPos1] = deck[randomPos2];
        deck[randomPos2] = temp;
    };
    return deck
}


// Method to create player and dealer hands as well as object to keep track of points
function hands(deck) {
    player = {
        Points: 0
    }
    dealer = {
        Points: 0
    }
    dealerHand = new Array();
    playerHand = new Array();
    for (var i = 0; i < 2; i++) {
        playerHand.push(deck.pop());
        dealerHand.push(deck.pop());
        player.Points = player.Points + playerHand[i].real_value;
        dealer.Points = dealer.Points + dealerHand[i].real_value;
    }
    player.Hand = playerHand;
    dealer.Hand = dealerHand;
    return
}

// Renders the palyers cards
function renderPlayerCards(playerHand) {
    var cardArea = document.getElementById("player-card-area");
    while (cardArea.firstChild){
        cardArea.removeChild(cardArea.firstChild);
    }
    for (i = 0; i < playerHand.length; i++) {
        var cardArea = document.getElementById("player-card-area");
        var newCard = document.createElement('div');
        newCard.innerHTML = playerHand[i].name;
        cardArea.appendChild(newCard);
    }
}

function renderFirstDealer(dealerHand) {
    var cardArea = document.getElementById("dealer-card-area");
    var newCard = document.createElement('div');
    newCard.innerHTML = dealerHand[0].name;
    cardArea.appendChild(newCard);
}

function renderDealerCards(dealerHand) {
    var cardArea = document.getElementById("dealer-card-area");
    while (cardArea.firstChild){
        cardArea.removeChild(cardArea.firstChild);
    }
    for (i = 0; i < dealerHand.length; i++) {
        var cardArea = document.getElementById("dealer-card-area");
        var newCard = document.createElement('div');
        newCard.innerHTML = dealerHand[i].name;
        cardArea.appendChild(newCard);
    }
}

// Check the Blackjack win condition after the deal
function checkWinConditions(contestant) {
    if (contestant.Points > 21) {
        message.innerHTML = "BUSTED!";
        endGame();
        return "busted"
    }
    else if (contestant.Points === 21 && contestant.Hand.length === 2) {
        message.innerHTML = "BlackJack!";
        startingBank[0] = startingBank[0] + (bet * 2);
        endGame();
        return "blackjack"
    }
    return
}

// Give the player a card
function hitPlayer(deck) {
    var new_card = deck.pop();
    player.Hand.push(new_card)
    player.Points = player.Points + new_card.real_value;
    renderPlayerCards(player.Hand)
    checkWinConditions(player);
}

function standPlayer(deck) {
    dealerPlays(deck);
}

function dealerPlays(deck) {
    if (dealer.Points <= 16) {
        var new_card = deck.pop();
        dealer.Hand.push(new_card);
        dealer.Points = dealer.Points + new_card.real_value;
        renderDealerCards(dealer.Hand);
        if (checkWinConditions(dealer) === "blackjack") {
            message.innerHTML = "Dealer Wins";
            endGame();
            return
        } else if (checkWinConditions(dealer) === "busted") {
            message.innerHTML = "Player Wins!";
            startingBank[0] = startingBank[0] + (bet * 2);
            bank.innerHTML = `$${startingBank[0]}`;
            endGame();
            return
        }
        dealerPlays(deck);
    }
    else if (dealer.Points > 16) {
        if (dealer.Points > player.Points) {
            message.innerHTML = "Dealer Wins";
            endgame();
        } else {
            message.innerHTML = "Player Wins!";
            startingBank[0] = startingBank[0] + (bet * 2);
            bank.innerHTML = `$${startingBank[0]}`;
            endgame();
        }
    }
}

function endGame() {
    bank.innerHTML = `$${startingBank[0]}`
    restart.style.display = 'block';
    hit.style.display = 'none';
    stay.style.display = 'none';
}

function restartGame() {
    var deck = new Array();
    // Hide hit, stay, errors, and restart until the game has started
    hit.style.display = "none";
    stay.style.display = "none";
    error.style.display = "none";
    restart.style.display = "none";
    message.innerHTML = "";
    // clear card areas
    var cardArea = document.getElementById("player-card-area");
    while (cardArea.firstChild){
        cardArea.removeChild(cardArea.firstChild);
    }
    var cardArea = document.getElementById("dealer-card-area");
    while (cardArea.firstChild){
        cardArea.removeChild(cardArea.firstChild);
    }
}