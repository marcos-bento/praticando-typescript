import { Card } from "./cards.js";
import { createCards } from "./createCards.js";
import { GameLogic } from "./gameLogic.js";
import { newGame } from "./newGame.js";
import { embaralhar } from "./shuffleCards.js";

const modo:string = window.localStorage.getItem("modo") as string | "1 jogador";
const cardContainer: HTMLElement = document.querySelector(".card__container") as HTMLElement;
const cards:Card[] = embaralhar(newGame(6));
const logic = new GameLogic(cards);

createCards(cards, cardContainer, logic._cardTheme);
logic.modoDeJogo(modo);

console.table(cards);

// ###########################################################
// AO CLICAR EM ALGUM CARD
// ###########################################################

if (cardContainer){
    cardContainer.addEventListener("click", (event: any)=>{
        event.preventDefault();
        logic.start(event);
    });
};

// ###########################################################
// BOTÃO VOLTAR AO MENU PRINCIPAL
// ###########################################################

const btnHome: HTMLElement = document.querySelector(".btn_home") as HTMLElement;

if (btnHome){
    btnHome.addEventListener("click", () => window.location.href= "index.html");
};
