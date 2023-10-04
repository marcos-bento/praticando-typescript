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
    let bgmVolume:number = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
    let seVolume:number = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1);

    if (modal) {
        modal.innerHTML =`
        <div class="modal-content">
            <h1>Configurações</h1>
            <h2>Volume:</h2>
            <div class="modal_volume">
                <p>Música de fundo: <input type="range" min="0" max="10" value="${bgmVolume*10}" id="bgmVolume"></input></p>
                <p>Efeitos sonoros: <input type="range" min="0" max="10" value="${seVolume*10}" id="seVolume"></input></p>
            </div>
            
            <h2>Escolha o tema:</h2>
            <select class="modal_select_box" name="tema" id="">
                <option selected disabled hidden>Fundo do Mar</option>
                <option value="1">Fundo do Mar</option>
                <option value="2">Selva</option>
                <option value="3">Dinossauros</option>
            </select>
            </br>

            <button class="close-button">Fechar</button>
            <button class="save-button">Salvar</button>
        </div>
        `
        modal.style.display = 'block';
        const closeButton: HTMLElement = modal.querySelector(".close-button") as HTMLElement;
        const saveButton: HTMLElement = modal.querySelector(".save-button") as HTMLElement;
        const bgmRange: HTMLInputElement = modal.querySelector("#bgmVolume") as HTMLInputElement;
        const seRange: HTMLInputElement = modal.querySelector("#seVolume") as HTMLInputElement;

        if (saveButton){
            saveButton.addEventListener("click", ()=> {
                window.localStorage.setItem("bgmvolume", ((parseInt(bgmRange.value))/10).toString());
                window.localStorage.setItem("sevolume", ((parseInt(seRange.value))/10).toString());
                modal.style.display = "none";
            });
        };

        if (closeButton){
            closeButton.addEventListener("click", ()=> modal.style.display = "none");
        };
    }
    
});
