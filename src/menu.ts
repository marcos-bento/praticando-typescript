// ##########################################################################
// BOTÃO PARA 1 JOGADOR
// ##########################################################################
 
import { ModoDeJogo } from "./enum/modoDeJogo.js";
const botao1Jogador: HTMLElement = document.querySelector(".btn_1jogador") as HTMLElement;

botao1Jogador.addEventListener("click", ()=>{
    window.localStorage.setItem("modo", ModoDeJogo.UmJogador);
    window.location.href = "game.html";
});

// ##########################################################################
// BOTÃO PARA 2 JOGADORES
// ##########################################################################

const botao2Jogadores: HTMLElement  = document.querySelector(".btn_2jogadores") as HTMLElement;

botao2Jogadores.addEventListener("click", ()=>{
    window.localStorage.setItem("modo", ModoDeJogo.DoisJogadores);
    window.location.href = "game.html";
});


// ##########################################################################
// BOTÃO PARA ABRIR O MODAL DE CONFIGURAÇÕES
// ##########################################################################

import gameConfig, { mudaTema } from "./gameConfig.js";
const botaoConfig: HTMLElement  = document.querySelector(".btn_config") as HTMLElement;

botaoConfig?.addEventListener("click", ()=>{
    gameConfig("menu");
});

document.addEventListener("DOMContentLoaded", function() {
    const novoTema = window.localStorage.getItem("temaDasCartas");
    if (novoTema){
        mudaTema(novoTema);
    };
});

// ##########################################################################
// BOTÃO PARA IR A PÁGINA ABOUT.HTML
// ##########################################################################

const informacoes: HTMLElement = document.querySelector(".btn_sobre") as HTMLElement;

if (informacoes){
    informacoes.addEventListener("click", ()=>{
        window.location.href="about.html"
    });
}
