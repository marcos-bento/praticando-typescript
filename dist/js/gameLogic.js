var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Player } from "./player.js";
import { Sound } from "./soundManager.js";
export class GameLogic {
    constructor(_cards) {
        this.player2 = null;
        this.player2Score = null;
        this.rodada = 1;
        this.cards = _cards;
        this.scoreBoard = document.querySelector(".scoreBoard");
        this.player1 = new Player();
        this.sons = new Sound();
        this.cardTheme = (window.localStorage.getItem("temaDasCartas") ? window.localStorage.getItem("temaDasCartas") : "temaOceano");
        this.cartasViradas = 0;
        this.tempoParaDesvirar = (window.localStorage.getItem("tempoParaDesvirar") ? parseInt(window.localStorage.getItem("tempoParaDesvirar")) * 1000 : 1000);
    }
    ;
    get _cardTheme() {
        return this.cardTheme;
    }
    start(event) {
        if (event.target.classList.contains("card")) {
            if (this.cartasViradas != 2) {
                if (this.cartasViradas === 0) {
                    this.primeiraEscolha = this.recuperaElemento(event);
                    this.cartasViradas += 1;
                }
                else {
                    if (!event.target.classList.contains("virado")) {
                        this.segundaEscolha = this.recuperaElemento(event);
                        this.valida(this.primeiraEscolha, this.segundaEscolha);
                        this.cartasViradas += 1;
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
    }
    ;
    modoDeJogo(qtdJogadores) {
        return __awaiter(this, void 0, void 0, function* () {
            if (qtdJogadores === "1 jogador") {
                this.scoreBoard.innerHTML = `<h2 class="principal__score">Jogador 1: 0 pts</h2>`;
                this.player1Score = document.querySelector(".principal__score");
            }
            else {
                this.scoreBoard.innerHTML = `<h2 class="player1_score active_player">Jogador 1: 0 pts</h2> <h2 class="player2_score">Jogador 2: 0 pts</h2>`;
                this.player1Score = document.querySelector(".player1_score");
                this.player2Score = document.querySelector(".player2_score");
                this.player2 = new Player();
            }
            ;
            this.sons.playNovoJogo();
            yield this.sleep(1000);
            this.sons.playBgm();
        });
    }
    ;
    valida(primeiro, segundo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (primeiro === segundo) {
                yield this.sleep(600);
                this.sons.playCorreto();
                this.desviraCards(true);
                this.pontuar(10, this.rodada);
            }
            else {
                yield this.sleep(this.tempoParaDesvirar);
                this.sons.playIncorreto();
                this.desviraCards();
            }
            ;
        });
    }
    ;
    ingameConfig() {
        this.tempoParaDesvirar = (window.localStorage.getItem("tempoParaDesvirar") ? parseInt(window.localStorage.getItem("tempoParaDesvirar")) * 1000 : 1000);
        const newBGMVolume = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
        const newSEVolume = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1);
        this.sons.setVolume(newBGMVolume, newSEVolume);
        this.sons.playNovoJogo();
    }
    pontuar(score, rodada) {
        if (rodada === 1) {
            this.player1.score += score;
            this.player1Score.innerHTML = `Jogador 1: ${this.player1.score} pts`;
        }
        else {
            if (this.player2Score) {
                this.player2.score += score;
                this.player2Score.innerHTML = `Jogador 2: ${this.player2.score} pts`;
            }
            ;
        }
        ;
        this.verificaFimDoJogo();
    }
    ;
    verificaFimDoJogo() {
        return __awaiter(this, void 0, void 0, function* () {
            const colecaoElementos = document.querySelectorAll(".oculto");
            if (colecaoElementos.length === 0) {
                yield this.sleep(1000);
                this.sons.pauseBgm();
                yield this.sleep(500);
                this.sons.playEndGame();
                if (this.player2) {
                    this.FimDoJogo(this.player1.score > this.player2.score ? "Jogador 1" : this.player1.score === this.player2.score ? "Empate" : "jogador 2");
                }
                else {
                    this.FimDoJogo("Jogador");
                }
            }
        });
    }
    ;
    FimDoJogo(vencedor) {
        const modal = document.getElementById("modal");
        const icon = (vencedor != "Empate" ? "trofeu" : "empate");
        if (modal) {
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
            const closeButton = modal.querySelector(".close-button");
            const restartButton = modal.querySelector(".restart-button");
            if (closeButton) {
                closeButton.addEventListener("click", this.fecharModal);
            }
            if (restartButton) {
                restartButton.addEventListener("click", this.reiniciar);
            }
        }
    }
    ;
    fecharModal() {
        const modal = document.getElementById("modal");
        if (modal) {
            modal.style.display = 'none';
            window.location.href = "index.html";
        }
        ;
    }
    ;
    reiniciar() {
        const modal = document.getElementById("modal");
        if (modal) {
            modal.style.display = 'none';
            window.location.reload();
        }
        ;
    }
    ;
    recuperaElemento(event) {
        const cardID = parseInt(event.target.getAttribute("id"));
        const elementoBotao = document.getElementById(cardID.toString());
        const cardCorrespondente = this.cards.find(elemento => elemento._cardNumber === cardID);
        this.viraCards(elementoBotao, cardCorrespondente);
        return cardCorrespondente === null || cardCorrespondente === void 0 ? void 0 : cardCorrespondente._cardName.toString();
    }
    ;
    viraCards(elemento, cardCorrespondente) {
        return __awaiter(this, void 0, void 0, function* () {
            elemento.classList.add("virado");
            this.startRotation(elemento);
            yield this.sleep(300);
            elemento.style.backgroundImage = `url("../../dist/img/${this.cardTheme}/${cardCorrespondente === null || cardCorrespondente === void 0 ? void 0 : cardCorrespondente._cardName.toString()}.jpg")`;
        });
    }
    ;
    startRotation(elemento) {
        return __awaiter(this, void 0, void 0, function* () {
            elemento.classList.add('rotating');
            yield this.sleep(300);
            elemento.classList.add('rotating2');
            elemento.addEventListener('animationend', function () {
                elemento.classList.remove('rotating', 'rotating2');
            });
        });
    }
    ;
    desviraCards(pontos) {
        const colecaoElementos = document.querySelectorAll(".virado");
        this.cartasViradas = 0;
        if (pontos) {
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado", "oculto");
                elemento.disabled = true;
                elemento.style.opacity = "50%";
            });
        }
        else {
            if (this.player2) {
                this.passaRodada();
            }
            ;
            colecaoElementos.forEach(elemento => {
                this.endRotating(elemento);
                elemento.classList.remove("virado");
                elemento.style.backgroundImage = `url("../../dist/img/${this.cardTheme}/cardCover.jpg")`;
            });
        }
        ;
    }
    ;
    endRotating(elemento) {
        elemento.classList.add('desvira');
        elemento.addEventListener('animationend', function () {
            elemento.classList.remove('desvira');
        });
    }
    ;
    passaRodada() {
        var _a, _b;
        if (this.rodada === 1) {
            this.player1Score.classList.remove("active_player");
            (_a = this.player2Score) === null || _a === void 0 ? void 0 : _a.classList.add("active_player");
            this.rodada = 2;
        }
        else {
            (_b = this.player2Score) === null || _b === void 0 ? void 0 : _b.classList.remove("active_player");
            this.player1Score.classList.add("active_player");
            this.rodada = 1;
        }
        ;
    }
    ;
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    ;
}
