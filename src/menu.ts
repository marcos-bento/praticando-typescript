const botao1Jogador: HTMLElement = document.querySelector(".btn_1jogador") as HTMLElement;
const botao2Jogadores: HTMLElement  = document.querySelector(".btn_2jogadores") as HTMLElement;
const botaoConfig: HTMLElement  = document.querySelector(".btn_config") as HTMLElement;

botao1Jogador?.addEventListener("click", ()=>{
    window.localStorage.setItem("modo", "1 jogador");
    window.location.href = "game.html";
});

botao2Jogadores?.addEventListener("click", ()=>{
    window.localStorage.setItem("modo", "2 jogadores");
    window.location.href = "game.html";
});

botaoConfig?.addEventListener("click", ()=>{
    console.log("Config");
});
