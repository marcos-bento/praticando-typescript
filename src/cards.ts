export class Card{
    private cardNumber: number;
    private cardName: string;

    constructor(_cardNumber: number, _cardName: string){
        this.cardNumber = _cardNumber;
        this.cardName   = _cardName;
    }

    get _cardNumber(){
        return this.cardNumber;
    }

    get _cardName(){
        return this.cardName;
    }

}