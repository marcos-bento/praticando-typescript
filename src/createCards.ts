// Create elements in HTML

import { Card } from "./cards.js";

export function createCards(cards: Card[], cardContainer: HTMLElement): void{
    for (const card of cards){
        cardContainer.innerHTML += `<button id="${card._cardNumber}" class="card card_${card._cardName}"></button>`;
    }
}
