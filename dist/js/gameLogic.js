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
export class GameLogic {
    constructor(_cards) {
        this.player2 = null;
        this.player2Score = null;
        this.rodada = 1;
        this.etapa = 0;
        this.cards = _cards;
        this.scoreBoard = document.querySelector(".scoreBoard");
        this.player1 = new Player();
    }
    ;
    start(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (event.target.classList.contains("card")) {
                if (this.etapa === 0) {
                    this.primeiraEscolha = this.recuperaElemento(event);
                    this.etapa = 1;
                }
                else {
                    if (!event.target.classList.contains("virado")) {
                        this.segundaEscolha = this.recuperaElemento(event);
                        yield this.sleep(750);
                        if (this.valida(this.primeiraEscolha, this.segundaEscolha)) {
                            alert("PONTO");
                            this.pontuar(10, this.rodada);
                            this.desviraCards(true);
                        }
                        else {
                            this.desviraCards();
                        }
                        this.etapa = 0;
                    }
                    ;
                }
                ;
            }
            ;
        });
    }
    ;
    modoDeJogo(qtdJogadores) {
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
    }
    ;
    valida(primeiro, segundo) {
        return primeiro === segundo;
    }
    ;
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
    }
    desviraCards(pontos) {
        const colecaoElementos = document.querySelectorAll(".virado");
        if (pontos) {
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado");
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
                elemento.classList.remove("virado");
                elemento.style.backgroundImage = `url("../../dist/img/temaOceano/cardCover.jpg")`;
            });
        }
        ;
    }
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
    recuperaElemento(event) {
        const cardID = parseInt(event.target.getAttribute("id"));
        const elementoBotao = document.getElementById(cardID.toString());
        const cardCorrespondente = this.cards.find(elemento => elemento._cardNumber === cardID);
        elementoBotao.classList.add("virado");
        elementoBotao.style.backgroundImage = `url("../../dist/img/temaOceano/${cardCorrespondente === null || cardCorrespondente === void 0 ? void 0 : cardCorrespondente._cardName.toString()}.jpg")`;
        return cardCorrespondente === null || cardCorrespondente === void 0 ? void 0 : cardCorrespondente._cardName.toString();
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
