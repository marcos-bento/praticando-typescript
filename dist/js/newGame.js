import { Card } from "./cards.js";
export function newGame(maxCards) {
    let cards = [];
    let aux = 0;
    for (let i = 0; i < maxCards; i++) {
        cards[aux] = new Card(aux + 1, `carta_${i + 1}`);
        aux++;
        cards[aux] = new Card(aux + 1, `carta_${i + 1}`);
        aux++;
    }
    ;
    return cards;
}
