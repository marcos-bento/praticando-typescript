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
    const modal: HTMLElement = document.getElementById("modal") as HTMLElement;
        
    if (modal) {
        modal.innerHTML =`
        <div class="modal-content">
            <h1>Configurações</h1>
            <h2>Volume:</h2>
            <div class="modal_volume">
            <p>Música de fundo: <input type="range" min="0" max="10" value="5" id="bgmVolume"></input></p>
            <p>Efeitos sonoros: <input type="range" min="0" max="10" value="5" id="seVolume"></input></p>
            </div>
            
            <h2>Escolha o tema:</h2>
            <select class="modal_select_box" name="tema" id="">
                <option selected disabled hidden>Fundo do Mar</option>
                <option value="1">Fundo do Mar</option>
                <option value="2">Selva</option>
                <option value="3">Dinossauros</option>
            </select>
            </br>

            <button class="close-button" onclick="fecharModal()">Fechar</button>
            <button class="save-button" onclick="save()">Salvar</button>
        </div>
        `
        modal.style.display = 'block';
        const closeButton: HTMLElement = modal.querySelector(".close-button") as HTMLElement;
        const saveButton: HTMLElement = modal.querySelector(".save-button") as HTMLElement;

        if (closeButton){
            closeButton.addEventListener("click", ()=> modal.style.display = "none");
        };
    }
    
});
