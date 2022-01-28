//card array of objects
const cardArray = [
  { name: "cat", img: "img/cat.png" },
  { name: "dog", img: "img/dog.png" },
  { name: "frog", img: "img/frog.png" },
  { name: "hippo", img: "img/hippo.png" },
  { name: "monkey", img: "img/monkey.png" },
  { name: "mouse", img: "img/mouse.png" },
  { name: "owl", img: "img/owl.png" },
  { name: "penguin", img: "img/penguin.png" },
  { name: "duck", img: "img/duck.png" },
  { name: "lamb", img: "img/lamb.png" },
  { name: "cat", img: "img/cat.png" },
  { name: "dog", img: "img/dog.png" },
  { name: "frog", img: "img/frog.png" },
  { name: "hippo", img: "img/hippo.png" },
  { name: "monkey", img: "img/monkey.png" },
  { name: "mouse", img: "img/mouse.png" },
  { name: "owl", img: "img/owl.png" },
  { name: "penguin", img: "img/penguin.png" },
  { name: "duck", img: "img/duck.png" },
  { name: "lamb", img: "img/lamb.png" },
];

//cards.sort(() => 0.5 - Math.random())
//Better to use the Fisher-Yates shuffle function
function shuffle(cardArray) {
  let currentIndex = cardArray.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cardArray[currentIndex], cardArray[randomIndex]] = [
      cardArray[randomIndex],
      cardArray[currentIndex],
    ];
  }

  return cardArray;
}
shuffle(cardArray);

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "img/back.jpg");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
    let image = document.createElement("image");
  }
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  this.classList.add("flip");
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  if (optionOneId == optionTwoId) {
    // alert("You have clicked the same picture!");
    cards[optionOneId].setAttribute("src", "img/back.jpg");
    cards[optionTwoId].setAttribute("src", "img/back.jpg");
  } else if (cardsChosen[0] === cardsChosen[1]) {
    alert("You have found a Match!");
    cards[optionOneId].setAttribute("src", "img/blank.jpg");
    cards[optionTwoId].setAttribute("src", "img/blank.jpg");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "img/back.jpg");
    cards[optionTwoId].setAttribute("src", "img/back.jpg");
    //alert("Try Again!");
  }
  cardsChosen = [];
  cardsChosenIds = [];
  resultDisplay.textContent = cardsWon.length;
  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "Well done, you have won!";
    clearInterval(cancel);
  }
}

function myButton() {
  location.reload();
}

createBoard();

//Timer
let seconds = 0;
let el = document.getElementById("seconds-counter");

function incrementSeconds() {
  seconds += 1;
  el.innerText = "You have been here for " + seconds + " seconds.";
}

let cancel = setInterval(incrementSeconds, 1000);
