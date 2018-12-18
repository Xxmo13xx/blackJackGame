//Card Variables
let suits = ['Spades', 'Diamonds', 'Club', 'Hearts'];
let numbers = ['Ace', 'King', 'Queen', 'Jack', 'Ten',
               'Nine', 'Eight', 'Seven', 'Six', 'Five',
               'Four', 'Three' , 'Two'];


// DOM variables
let textArea = document.getElementById('text_area');
let newGameButton = document.getElementById('new_game_button');
let hitButton = document.getElementById('hit_button');
let stayButton = document.getElementById('stay_button');

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];


hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    console.log(hitButton.style.display);
    stayButton.style.display = 'inline';
    showStatus();
});

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  updateScores();
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();

});


function createDeck(){
  let deck = [];
  for(let suitIndex = 0; suitIndex < suits.length; suitIndex++){
    for (let numberIndex = 0; numberIndex < numbers.length; numberIndex++){
      let card = {
        suit: suits[suitIndex],
        number: numbers[numberIndex]
      };
      deck.push(card);
    }
  }
  return deck;
}

function cardToString(card){
  return card.number + " of " + card.suit;
}

function showStatus(){
  if(!gameStarted){
    textArea.innerText = "Welcome to Blackjack";
    return;
  }

  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++){
    dealerCardString += cardToString(dealerCards[i]) + '\n';
  }
  let playerCardString = ''
  for (let i = 0; i < playerCards.length; i++){
    playerCardString += cardToString(playerCards[i]) + '\n';
  }

  updateScores();

  textArea.innerText =
    "Dealer has:\n" +
    dealerCardString +
    '(Score is: ' + dealerScore + ')\n\n' +

    "Player has:\n" +
    playerCardString +
    '(Score is: ' + playerScore + ')\n\n';


    if(gameOver){
      if(playerWon){
        textArea.innerText += "You Win";
      } else {
        textArea.innerText += "Dealer Won";
      }
      console.log(gameOver);
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';

    }


}

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;

  for (let i = 0; i < cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.number === 'Ace'){
      hasAce = true;
    }
  }

  if(hasAce && score + 10 <= 21){
    return score + 10;
  }
  return score;
}

function checkForEndOfGame(){
  updateScores();

  if(gameOver){
    //let the dealer take cards
    console.log("Dealer has" + dealerScore);
    console.log("Player has" + playerScore);
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <=21){
      console.log("Getting dealer cards now");
      dealerCards.push(getNextCard());
      updateScores();
    }

    if (playerScore > 21){
      playerWon = false;
      gameOver = true;
    } else if (dealerScore > 21){
      playerWon = true;
      gameOver = true;
    } else {
      playerWon = false;
    }

  }
}

function shuffleDeck(deck){
  for (let i = 0; i < deck.length; i++){
    let swapIndex = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIndex];
    deck[swapIndex] = deck[i];
    deck[i] = tmp;
  }
}

function getCardNumericValue(card){
  switch(card.number){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}


function getNextCard(){
  return deck.shift();
}
//shows what cards have been dealt,

