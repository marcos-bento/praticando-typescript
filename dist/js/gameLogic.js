var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class GameLogic {
    constructor(_cards) {
        this.etapa = 0;
        this.pontos = 0;
        this.cards = _cards;
        this.pontuacao = document.querySelector(".principal__score");
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
                            this.pontuar(10);
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
    valida(primeiro, segundo) {
        return primeiro === segundo;
    }
    ;
    pontuar(score) {
        this.pontos += score;
        this.pontuacao.innerHTML = `Pontos: ${this.pontos} pts`;
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
            colecaoElementos.forEach(elemento => {
                elemento.classList.remove("virado");
                elemento.style.backgroundImage = `url("../../dist/img/temaOceano/cardCover.jpg")`;
            });
        }
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
