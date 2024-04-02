const cardArrayLevel1 = [
  {
    name: "tiger",
    img: "images/tiger.jpg",
  },
  {
    name: "dog",
    img: "images/dog.png",
  },
  {
    name: "cow",
    img: "images/cow.png",
  },
  {
    name: "polarbear",
    img: "images/polarbear.png",
  },
  {
    name: "bird",
    img: "images/bird.png",
  },
  {
    name: "rabbit",
    img: "images/rabbit.png",
  },
  {
    name: "tiger",
    img: "images/tiger.jpg",
  },
  {
    name: "dog",
    img: "images/dog.png",
  },
  {
    name: "cow",
    img: "images/cow.png",
  },
  {
    name: "polarbear",
    img: "images/polarbear.png",
  },
  {
    name: "bird",
    img: "images/bird.png",
  },
  {
    name: "rabbit",
    img: "images/rabbit.png",
  },
];

const cardArrayLevel2 = [
  {
    name: "tiger",
    img: "images/tiger.jpg",
  },
  {
    name: "dog",
    img: "images/dog.png",
  },
  {
    name: "cow",
    img: "images/cow.png",
  },
  {
    name: "polarbear",
    img: "images/polarbear.png",
  },
  {
    name: "bird",
    img: "images/bird.png",
  },
  {
    name: "rabbit",
    img: "images/rabbit.png",
  },
  {
    name: "panda",
    img: "images/panda.jpg",
  },
  {
    name: "cat",
    img: "images/cat.jpg",
  },
  {
    name: "tiger",
    img: "images/tiger.jpg",
  },
  {
    name: "dog",
    img: "images/dog.png",
  },
  {
    name: "cow",
    img: "images/cow.png",
  },
  {
    name: "polarbear",
    img: "images/polarbear.png",
  },
  {
    name: "bird",
    img: "images/bird.png",
  },
  {
    name: "rabbit",
    img: "images/rabbit.png",
  },
  {
    name: "panda",
    img: "images/panda.jpg",
  },
  {
    name: "cat",
    img: "images/cat.jpg",
  },
];

let currentLevel = 1;
let cardArray;

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
  gridDisplay.innerHTML = "";
  cardArray.forEach((card, i) => {
    const cardElement = document.createElement("img");
    cardElement.setAttribute("src", "images/bg.png");
    cardElement.setAttribute("data-id", i);
    cardElement.addEventListener("click", flipCard);
    gridDisplay.appendChild(cardElement);
  });
}

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  if (cardsChosen[0] == cardsChosen[1]) {
    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/bg.png");
    cards[optionTwoId].setAttribute("src", "images/bg.png");
  }

  resultDisplay.textContent = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations, you found them all!";
    setTimeout(transitionToNextLevel, 1000);
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  const card = cardArray[cardId];

  cardsChosen.push(card.name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", card.img);

  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function transitionToNextLevel() {
  currentLevel++;
  if (currentLevel <= 2) {
    cardArray = currentLevel === 1 ? cardArrayLevel1 : cardArrayLevel2;
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
    cardsWon.length = 0;
    resultDisplay.textContent = "";
  } else {
    resultDisplay.textContent = "Congratulations, you completed all levels!";
    // Handle game completion here
  }
}

document.querySelector("#newgame").addEventListener("click", () => {
  currentLevel = 1;
  cardArray = cardArrayLevel1;
  cardArray.sort(() => 0.5 - Math.random());
  createBoard();
  cardsWon.length = 0;
  resultDisplay.textContent = "";
});

// Initial setup
cardArray = cardArrayLevel1;
cardArray.sort(() => 0.5 - Math.random());
createBoard();
