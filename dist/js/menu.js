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
    const modal = document.getElementById("modal");
    let bgmVolume = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
    let seVolume = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1);
    if (modal) {
        modal.innerHTML = `
        <div class="modal-content">
            <h1>Configurações</h1>
            <h2>Volume:</h2>
            <div class="modal_volume">
                <p>Música de fundo: <input type="range" min="0" max="10" value="${bgmVolume * 10}" id="bgmVolume"></input></p>
                <p>Efeitos sonoros: <input type="range" min="0" max="10" value="${seVolume * 10}" id="seVolume"></input></p>
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
        `;
        modal.style.display = 'block';
        const closeButton = modal.querySelector(".close-button");
        const saveButton = modal.querySelector(".save-button");
        const bgmRange = modal.querySelector("#bgmVolume");
        const seRange = modal.querySelector("#seVolume");
        if (saveButton) {
            saveButton.addEventListener("click", () => {
                window.localStorage.setItem("bgmvolume", ((parseInt(bgmRange.value)) / 10).toString());
                window.localStorage.setItem("sevolume", ((parseInt(seRange.value)) / 10).toString());
                modal.style.display = "none";
            });
        }
        ;
        if (closeButton) {
            closeButton.addEventListener("click", () => modal.style.display = "none");
        }
        ;
    }
});
