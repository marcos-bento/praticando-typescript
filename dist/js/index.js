import { createCards } from "./createCards.js";
import { GameLogic } from "./gameLogic.js";
import { newGame } from "./newGame.js";
import { embaralhar } from "./shuffleCards.js";
const cardContainer = document.querySelector(".card__container");
const cards = embaralhar(newGame(3));
createCards(cards, cardContainer);
console.table(cards);
const logic = new GameLogic(cards);
if (cardContainer) {
    cardContainer.addEventListener("click", (event) => {
        event.preventDefault();
        logic.start(event);
    });
}
