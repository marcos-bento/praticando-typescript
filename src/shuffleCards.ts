import { Card } from "./cards.js";

export function embaralhar(object: Card[]): Card[] {
    for (let i = object.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório
        [object[i], object[j]] = [object[j], object[i]]; // Troca os elementos
    }
    return object;
}
