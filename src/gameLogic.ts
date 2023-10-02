import { Card } from "./cards.js";

export class GameLogic{
    private pontuacao: HTMLElement;
    private cards: Card[];
    private etapa: number = 0;
    private pontos: number = 0;
    private primeiraEscolha: string;
    private segundaEscolha: string;

    constructor(_cards: Card[]){
        this.cards = _cards;
        this.pontuacao = document.querySelector(".principal__score") as HTMLElement;
    };
    
    public async start(event: any){
        if (event.target.classList.contains("card")){
            if (this.etapa === 0){ // Se for a primeira carta a ser virada
                this.primeiraEscolha = this.recuperaElemento(event);
                this.etapa = 1;
            } else { // Se for a segunda carta a ser virada
                if (!event.target.classList.contains("virado")){ // Verifica se a segunda carta clicada é exata mesma que a primeira
                    this.segundaEscolha = this.recuperaElemento(event);
                    await this.sleep(750); // Aguardar 750 ms para saber se acertou ou não
                    if (this.valida(this.primeiraEscolha, this.segundaEscolha)){
                        alert("PONTO");
                        this.pontuar(10);
                        this.desviraCards(true);
                    } else {
                        this.desviraCards();
                    }
                    this.etapa = 0;
                };
            };
        };
    };

    private valida(primeiro: string, segundo: string): boolean{
        return primeiro === segundo
    };

    private pontuar(score: number): void{
        this.pontos += score;
        this.pontuacao.innerHTML = `Pontos: ${this.pontos} pts`
    }

    private desviraCards(pontos?: boolean): void{
        const colecaoElementos = document.querySelectorAll(".virado") as NodeListOf<HTMLButtonElement>;
        if (pontos){
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado");
                elemento.disabled = true;
            });
        } else {
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado");
                elemento.style.backgroundImage = `url("../../dist/img/temaOceano/cardCover.jpg")`;
            });
        }
  
    }

    private recuperaElemento(event: any): string{
        const cardID:number = parseInt(event.target.getAttribute("id"));
        const elementoBotao: HTMLElement = document.getElementById(cardID.toString()) as HTMLElement;
        const cardCorrespondente:Card = this.cards.find(elemento => elemento._cardNumber === cardID) as Card;
        elementoBotao.classList.add("virado");
        elementoBotao.style.backgroundImage = `url("../../dist/img/temaOceano/${cardCorrespondente?._cardName.toString()}.jpg")`;
        return cardCorrespondente?._cardName.toString();
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
