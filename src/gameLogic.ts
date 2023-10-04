import { Card } from "./cards.js";
import { Player } from "./player.js";
import { Sound } from "./soundManager.js";

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
    private sons: Sound;                                    // Instancia uma classe Sound para reproduzir efeitos sonoros

    constructor(_cards: Card[]){
        this.cards = _cards;
        this.scoreBoard = document.querySelector(".scoreBoard") as HTMLElement;
        this.player1 = new Player();
        this.sons = new Sound();
    };
    
    public async start(event: any): Promise<void>{
        if (event.target.classList.contains("card")){
            if (this.etapa === 0){ // Se for a primeira carta a ser virada
                this.primeiraEscolha = this.recuperaElemento(event);
                this.etapa = 1;
            } else { // Se for a segunda carta a ser virada
                if (!event.target.classList.contains("virado")){ // Verifica se a segunda carta clicada é exata mesma que a primeira
                    this.segundaEscolha = this.recuperaElemento(event);
                    await this.sleep(1000); // Aguardar 1000 ms para saber se acertou ou não
                    if (this.valida(this.primeiraEscolha, this.segundaEscolha)){
                        this.sons.playCorreto();
                        this.desviraCards(true);
                        this.pontuar(10, this.rodada); // Acertou: Aumenta 10 pontos para o jogador da rodada
                    } else {
                        this.sons.playIncorreto();
                        this.desviraCards();
                    }
                    this.etapa = 0;
                };
            };
        };
    };

    public async modoDeJogo(qtdJogadores: string): Promise<void>{ // Função que desenha a tela se for 1 ou 2 jogadores
        if (qtdJogadores === "1 jogador"){
            this.scoreBoard.innerHTML = `<h2 class="principal__score">Jogador 1: 0 pts</h2>`;
            this.player1Score = document.querySelector(".principal__score") as HTMLElement;
        } else {
            this.scoreBoard.innerHTML = `<h2 class="player1_score active_player">Jogador 1: 0 pts</h2> <h2 class="player2_score">Jogador 2: 0 pts</h2>`;
            this.player1Score = document.querySelector(".player1_score") as HTMLElement;
            this.player2Score = document.querySelector(".player2_score") as HTMLElement;
            this.player2 = new Player();
        };
        this.sons.playNovoJogo();
        await this.sleep(1000); // Aguarda 1000 ms para tocar o próx arquivo de audio;
        // this.sons.playBgm();
    };

    private valida(primeiro: string, segundo: string): boolean{
        return primeiro === segundo
    };

    private pontuar(score: number, rodada: number): void{
        if (rodada === 1){ // Verifica qual o jogador acertou a pontuação
            this.player1.score += score;
            this.player1Score.innerHTML = `Jogador 1: ${this.player1.score} pts`
        } else {
            if (this.player2Score){
                this.player2.score += score;
                this.player2Score.innerHTML = `Jogador 2: ${this.player2.score} pts`
            };
        };
        this.verificaFimDoJogo();
    };
    
    private async verificaFimDoJogo(): Promise<void>{ // Valida se ainda existem cartas com a classe Oculta ou se pode acabar o jogo
        const colecaoElementos = document.querySelectorAll(".oculto") as NodeListOf<HTMLButtonElement>
        if(colecaoElementos.length === 0){
            await this.sleep(1000); // Aguarda 1000ms para finalizar o jogo
            // this.sons.pauseBgm();
            await this.sleep(500); // Aguarda 500ms para finalizar o jogo
            this.sons.playEndGame();
            if (this.player2){
                this.FimDoJogo(this.player1.score > this.player2.score ? "Jogador 1" : this.player1.score === this.player2.score ? "Empate": "jogador 2");
            } else {
                this.FimDoJogo("Jogador");
            }
        }
    };

    private FimDoJogo(vencedor: string) {
        const modal: HTMLElement = document.getElementById("modal") as HTMLElement;
        const icon: string = (vencedor != "Empate" ? "trofeu" : "empate")
        if (modal) {
            modal.innerHTML = `
                <div class="modal-content">
                    <h1>${vencedor}!
                    <h2>O Jogo Acabou!</h2>
                    <img class="modal_img" src="./dist/img/${icon}.png">
                    <p>Parabéns! Você concluiu o jogo.</p>
                    <!-- Botão para fechar o modal -->
                    <button class="close-button" onclick="fecharModal()">Menu</button>
                    <button class="restart-button" onclick="reiniciar()">Reiniciar</button>
                </div>`;
            modal.style.display = 'block';
            const closeButton: HTMLElement = modal.querySelector(".close-button") as HTMLElement;
            const restartButton: HTMLElement = modal.querySelector(".restart-button") as HTMLElement;
            if (closeButton) {
                closeButton.addEventListener("click", this.fecharModal);
            }
            if (restartButton){
                restartButton.addEventListener("click", this.reiniciar);
            }
        }
    };

    private fecharModal(): void{
        const modal: HTMLElement = document.getElementById("modal") as HTMLElement;
        if (modal) {
            modal.style.display = 'none';
            window.location.href = "index.html";
        };
    };

    private reiniciar(): void {
        const modal: HTMLElement = document.getElementById("modal") as HTMLElement;
        if (modal) {
            modal.style.display = 'none';
            window.location.href = "game.html";
        };
    };

    private recuperaElemento(event: any): string{
        const cardID:number = parseInt(event.target.getAttribute("id"));
        const elementoBotao: HTMLElement = document.getElementById(cardID.toString()) as HTMLElement;
        const cardCorrespondente:Card = this.cards.find(elemento => elemento._cardNumber === cardID) as Card;
        this.viraCards(elementoBotao, cardCorrespondente);
        return cardCorrespondente?._cardName.toString();
    };

    private async viraCards(elemento: HTMLElement, cardCorrespondente: Card): Promise<void>{
        elemento.classList.add("virado");
        this.startRotation(elemento);
        await this.sleep(300) // Aguarda 300ms para trocar a imagem abaixo.
        elemento.style.backgroundImage = `url("../../dist/img/temaSelva/${cardCorrespondente?._cardName.toString()}.jpg")`;
    };

    private async startRotation(elemento: HTMLElement): Promise<void> { // Animação de carta girando
        elemento.classList.add('rotating');
        await this.sleep(300) // Aguarda 300ms para trocar a imagem abaixo.
        elemento.classList.add('rotating2');
        // Remover a classe 'rotating' após a animação terminar
        elemento.addEventListener('animationend', function () {
          elemento.classList.remove('rotating', 'rotating2');
        });
    };

    private desviraCards(pontos?: boolean): void{
        const colecaoElementos = document.querySelectorAll(".virado") as NodeListOf<HTMLButtonElement>;
        if (pontos){
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado", "oculto");
                elemento.disabled = true;
                elemento.style.opacity = "50%";
            });
        } else {
            if (this.player2){ // Se existir 2 players, passa Rodada
                this.passaRodada();
            };
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado");
                elemento.style.backgroundImage = `url("../../dist/img/temaSelva/cardCover.jpg")`;
            });
        };
    };

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
    };

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

}
