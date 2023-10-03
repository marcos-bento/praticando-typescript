const botao1Jogador = document.querySelector(".btn_1jogador");
const botao2Jogadores = document.querySelector(".btn_2jogadores");
const botaoConfig = document.querySelector(".btn_config");
botao1Jogador === null || botao1Jogador === void 0 ? void 0 : botao1Jogador.addEventListener("click", () => {
    window.localStorage.setItem("modo", "1 jogador");
    window.location.href = "game.html";
});
botao2Jogadores === null || botao2Jogadores === void 0 ? void 0 : botao2Jogadores.addEventListener("click", () => {
    window.localStorage.setItem("modo", "2 jogadores");
    window.location.href = "game.html";
});
botaoConfig === null || botaoConfig === void 0 ? void 0 : botaoConfig.addEventListener("click", () => {
    console.log("Config");
});
