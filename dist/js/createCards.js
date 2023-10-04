import { tema } from "./enum/tema.js";
export function createCards(cards, cardContainer, cardTheme) {
    for (const card of cards) {
        cardContainer.innerHTML += `<button id="${card._cardNumber}" class="card card_${card._cardName} oculto"></button>`;
    }
    ;
    if (cardTheme != tema.oceano) {
        const htmlCollection = document.querySelectorAll(".card");
        htmlCollection.forEach(elemento => {
            elemento.style.backgroundImage = `url("../../dist/img/${cardTheme}/cardCover.jpg")`;
        });
    }
    ;
}
