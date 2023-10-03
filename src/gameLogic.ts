import { Card } from "./cards.js";
import { Player } from "./player.js";

export class GameLogic{
    private scoreBoard: HTMLElement;                        // Atributo HTML do container de pontuações
    private player1: Player;                                // Instancia uma classe Player para salvar o score do player 1
    private player2: Player | null = null;                  // Instancia uma classe Player para salvar o score Se existir player 2
    private player1Score: HTMLElement;                      // Atributo HTML do player 1
    private player2Score: HTMLElement | null = null;        // Atributo HTML do player 2 se existir
    private cards: Card[];                                  // Instancia um deck de cartas
    private rodada: number = 1;                             // Marca a rodada do player 1 e do player 2
    private etapa: number = 0;                              // Marca a primeira e a segunda carta selecionada
    private primeiraEscolha: string;                        // Salva a primeira carta selecionada
    private segundaEscolha: string;                         // Salva a segunda carta selecionada

    constructor(_cards: Card[]){
        this.cards = _cards;
        this.scoreBoard = document.querySelector(".scoreBoard") as HTMLElement;
        this.player1 = new Player();
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
                        this.pontuar(10, this.rodada); // Acertou: Aumenta 10 pontos para o jogador da rodada
                        this.desviraCards(true);
                    } else {
                        this.desviraCards();
                    }
                    this.etapa = 0;
                };
            };
        };
    };

    public modoDeJogo(qtdJogadores: string): void{
        if (qtdJogadores === "1 jogador"){
            this.scoreBoard.innerHTML = `<h2 class="principal__score">Jogador 1: 0 pts</h2>`;
            this.player1Score = document.querySelector(".principal__score") as HTMLElement;
        } else {
            this.scoreBoard.innerHTML = `<h2 class="player1_score active_player">Jogador 1: 0 pts</h2> <h2 class="player2_score">Jogador 2: 0 pts</h2>`;
            this.player1Score = document.querySelector(".player1_score") as HTMLElement;
            this.player2Score = document.querySelector(".player2_score") as HTMLElement;
            this.player2 = new Player();
        };
    };

    private valida(primeiro: string, segundo: string): boolean{
        return primeiro === segundo
    };

    private pontuar(score: number, rodada: number): void{
        if (rodada === 1){
            this.player1.score += score;
            this.player1Score.innerHTML = `Jogador 1: ${this.player1.score} pts`
        } else {
            if (this.player2Score){
                this.player2.score += score;
                this.player2Score.innerHTML = `Jogador 2: ${this.player2.score} pts`
            };
        };
    }

    private desviraCards(pontos?: boolean): void{
        const colecaoElementos = document.querySelectorAll(".virado") as NodeListOf<HTMLButtonElement>;
        if (pontos){
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado");
                elemento.disabled = true;
                elemento.style.opacity = "50%";
            });
        } else {
            if (this.player2){ // Se existir 2 players, passa Rodada
                this.passaRodada();
            };
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado");
                elemento.style.backgroundImage = `url("../../dist/img/temaOceano/cardCover.jpg")`;
            });
        };
    }

    private passaRodada(): void{
        if (this.rodada === 1){
            this.player1Score.classList.remove("active_player");
            this.player2Score?.classList.add("active_player");
            this.rodada = 2;
        } else {
            this.player2Score?.classList.remove("active_player");
            this.player1Score.classList.add("active_player");
            this.rodada = 1;
        };
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
