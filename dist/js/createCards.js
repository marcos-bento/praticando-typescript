export function createCards(cards, cardContainer) {
    for (const card of cards) {
        cardContainer.innerHTML += `<button id="${card._cardNumber}" class="card card_${card._cardName} oculto"></button>`;
    }
    ;
}
