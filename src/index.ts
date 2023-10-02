import { Card } from "./cards.js";
import { createCards } from "./createCards.js";
import { GameLogic } from "./gameLogic.js";
import { newGame } from "./newGame.js";
import { embaralhar } from "./shuffleCards.js";

const cardContainer: HTMLElement = document.querySelector(".card__container") as HTMLElement;

const cards:Card[] = embaralhar(newGame(5));
createCards(cards, cardContainer);

console.table(cards);

const logic = new GameLogic(cards);

if (cardContainer){
    cardContainer.addEventListener("click", (event: any)=>{
        event.preventDefault();
        logic.start(event);
    });
}
