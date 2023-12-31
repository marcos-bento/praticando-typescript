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
    private primeiraEscolha: string;                        // Salva a primeira carta selecionada
    private segundaEscolha: string;                         // Salva a segunda carta selecionada
    private sons: Sound;                                    // Instancia uma classe Sound para reproduzir efeitos sonoros
    private cardTheme: string;                              // Salva o tema das cartas
    private cartasViradas: number;                          // Variável auxiliar para contar quantas cartas foram viradas
    private tempoParaDesvirar: number;                      // Salva o tempo predefinido para desvirar uma carta

    constructor(_cards: Card[]){
        this.cards = _cards;
        this.scoreBoard = document.querySelector(".scoreBoard") as HTMLElement;
        this.player1 = new Player();
        this.sons = new Sound();
        this.cardTheme = (window.localStorage.getItem("temaDasCartas") ? window.localStorage.getItem("temaDasCartas") : "temaOceano");
        this.cartasViradas = 0;
        this.tempoParaDesvirar = (window.localStorage.getItem("tempoParaDesvirar") ? parseInt(window.localStorage.getItem("tempoParaDesvirar"))*1000 : 1000);
    };

    get _cardTheme(){
        return this.cardTheme;
    }
    
    public start(event: any): void{
        if (event.target.classList.contains("card")){
            if (this.cartasViradas != 2){ // Controle para não permitir mais do que 2 cartas viradas ao mesmo tempo!
                if (this.cartasViradas === 0){ // Se for a primeira carta a ser virada
                    this.primeiraEscolha = this.recuperaElemento(event);
                    this.cartasViradas +=1;
                } else { // Se for a segunda carta a ser virada
                    if (!event.target.classList.contains("virado")){ // Verifica se a segunda carta clicada é exata mesma que a primeira
                        this.segundaEscolha = this.recuperaElemento(event);
                        this.valida(this.primeiraEscolha, this.segundaEscolha);
                        this.cartasViradas +=1;
                    };
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
        this.sons.playBgm();
    };

    private async valida(primeiro: string, segundo: string): Promise<void>{
        if (primeiro === segundo){
            await this.sleep(600); // Aguardar 600ms para saber se acertou ou não
            this.sons.playCorreto();
            this.desviraCards(true);
            this.pontuar(10, this.rodada); // Acertou: Aumenta 10 pontos para o jogador da rodada
        } else {
            await this.sleep(this.tempoParaDesvirar); // Aguardar X ms para saber se acertou ou não
            this.sons.playIncorreto();
            this.desviraCards();
        };
    };

    public ingameConfig(): void{ // Função que atualiza as configurações do jogo dentro do próprio jogo (pois as configurações acontecem 1 vez no construtor)
        this.tempoParaDesvirar = (window.localStorage.getItem("tempoParaDesvirar") ? parseInt(window.localStorage.getItem("tempoParaDesvirar"))*1000 : 1000);
        const newBGMVolume = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
        const newSEVolume = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1); 
        this.sons.setVolume(newBGMVolume, newSEVolume);
        this.sons.playNovoJogo();
    }

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
            this.sons.pauseBgm();
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
        if (modal) { // Constroi o Modal de fim de jogo!
            modal.innerHTML = `
                <div class="modal-content">
                    <h1>${vencedor}!</h1>
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
            window.location.reload();
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
        elemento.style.backgroundImage = `url("../../dist/img/${this.cardTheme}/${cardCorrespondente?._cardName.toString()}.jpg")`;
    };

    private async startRotation(elemento: HTMLElement): Promise<void> { // Animação de carta girando
        elemento.classList.add('rotating'); // Efeito Rotating = A parte de trás da carta gira de 0 até 90 Graus no eixo Y
        await this.sleep(300) // Aguarda 300ms para adicionar o efeito Rotating2.
        elemento.classList.add('rotating2'); // Efeito Rotating2 = A parte da frente da carta gira de 90 até 0 Graus no eixo Y
        // Remover as classes 'rotating' e 'rotating2' após a animação terminar
        elemento.addEventListener('animationend', function () {
          elemento.classList.remove('rotating', 'rotating2');
        });
    };

    private desviraCards(pontos?: boolean): void{
        const colecaoElementos = document.querySelectorAll(".virado") as NodeListOf<HTMLButtonElement>;
        this.cartasViradas = 0;
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
                this.endRotating(elemento);
                elemento.classList.remove("virado");
                elemento.style.backgroundImage = `url("../../dist/img/${this.cardTheme}/cardCover.jpg")`;
            });
        };
    };

    private endRotating(elemento: HTMLElement): void { // Animação de carta girando
        elemento.classList.add('desvira'); // Efeito Rotating = A parte de trás da carta gira de 0 até 90 Graus no eixo Y
        // Remover as classes 'desvira' após a animação terminar
        elemento.addEventListener('animationend', function () {
          elemento.classList.remove('desvira');
        });
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
