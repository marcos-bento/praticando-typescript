export class Card {
    constructor(_cardNumber, _cardName) {
        this.cardNumber = _cardNumber;
        this.cardName = _cardName;
    }
    get _cardNumber() {
        return this.cardNumber;
    }
    get _cardName() {
        return this.cardName;
    }
}
