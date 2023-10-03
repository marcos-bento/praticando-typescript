import { createCards } from "./createCards.js";
import { GameLogic } from "./gameLogic.js";
import { newGame } from "./newGame.js";
import { embaralhar } from "./shuffleCards.js";
const modo = window.localStorage.getItem("modo");
const cardContainer = document.querySelector(".card__container");
const cards = embaralhar(newGame(2));
const logic = new GameLogic(cards);
createCards(cards, cardContainer);
logic.modoDeJogo(modo);
console.table(cards);
if (cardContainer) {
    cardContainer.addEventListener("click", (event) => {
        event.preventDefault();
        logic.start(event);
    });
}
;
const btnHome = document.querySelector(".btn_home");
if (btnHome) {
    btnHome.addEventListener("click", () => window.location.href = "index.html");
}
;
