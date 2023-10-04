// Create elements in HTML

import { Card } from "./cards.js";
import { tema } from "./enum/tema.js";

export function createCards(cards: Card[], cardContainer: HTMLElement, cardTheme: string): void{
    
    for (const card of cards){
        cardContainer.innerHTML += `<button id="${card._cardNumber}" class="card card_${card._cardName} oculto"></button>`;
    };

    if (cardTheme != tema.oceano){
        const htmlCollection:NodeListOf<HTMLElement> = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
        htmlCollection.forEach(elemento =>{
            elemento.style.backgroundImage = `url("../../dist/img/${cardTheme}/cardCover.jpg")`
        });
    };
}
