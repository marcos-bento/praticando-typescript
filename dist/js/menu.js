import { ModoDeJogo } from "./enum/modoDeJogo.js";
const botao1Jogador = document.querySelector(".btn_1jogador");
botao1Jogador.addEventListener("click", () => {
    window.localStorage.setItem("modo", ModoDeJogo.UmJogador);
    window.location.href = "game.html";
});
const botao2Jogadores = document.querySelector(".btn_2jogadores");
botao2Jogadores.addEventListener("click", () => {
    window.localStorage.setItem("modo", ModoDeJogo.DoisJogadores);
    window.location.href = "game.html";
});
import gameConfig, { mudaTema } from "./gameConfig.js";
const botaoConfig = document.querySelector(".btn_config");
botaoConfig === null || botaoConfig === void 0 ? void 0 : botaoConfig.addEventListener("click", () => {
    gameConfig("menu");
});
document.addEventListener("DOMContentLoaded", function () {
    const novoTema = window.localStorage.getItem("temaDasCartas");
    if (novoTema) {
        mudaTema(novoTema);
    }
    ;
});
const informacoes = document.querySelector(".btn_sobre");
if (informacoes) {
    informacoes.addEventListener("click", () => {
        window.location.href = "about.html";
    });
}
