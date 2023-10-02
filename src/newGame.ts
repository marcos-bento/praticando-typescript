// Instancia novas cartas até X (maxCards) vezes

import { Card } from "./cards.js";

export function newGame(maxCards: number): Card[]{
    let cards: Card[] = [];
    let aux:number = 0;
    for (let i = 0; i<maxCards; i++){
        cards[aux] = new Card(aux+1, `carta_${i+1}`);
        aux ++;
        cards[aux] = new Card(aux+1, `carta_${i+1}`);
        aux ++;
    };
    return cards;
}
