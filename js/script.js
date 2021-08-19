const cards = document.querySelectorAll(".card");
let flippedTwoCards = false;
let firstCard = null;
let secondCard = null;
let matchingPairs = 0;

const gameOver = () => {
  setTimeout(() => {
    cards.forEach((card) => {
      card.addEventListener("mouseup", flipCard);
      card.classList.remove("flip");
    });
  }, 800);
  setTimeout(() => {
    shuffleCard();
    alert("You win!");
  }, 2000);
};

function flipCard() {
  if (firstCard == null) {
    firstCard = this;
    this.classList.add("flip");
  } else {
    if (secondCard == null && firstCard != this) {
      secondCard = this;
      flippedTwoCards = true;
      this.classList.add("flip");
    }
  }
  if (flippedTwoCards) {
    flippedTwoCards = false;
    if (firstCard.children[0].src === secondCard.children[0].src) {
      firstCard.removeEventListener("mouseup", flipCard);
      secondCard.removeEventListener("mouseup", flipCard);
      firstCard = null;
      secondCard = null;
      matchingPairs++;
      if (matchingPairs === 6) {
        gameOver();
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}

const shuffleCard = () => {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
};

shuffleCard();
cards.forEach((card) => card.addEventListener("mouseup", flipCard));
