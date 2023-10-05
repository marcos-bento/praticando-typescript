import { createCards } from "./createCards.js";
import { GameLogic } from "./gameLogic.js";
import { newGame } from "./newGame.js";
import { embaralhar } from "./shuffleCards.js";
const modo = window.localStorage.getItem("modo");
const cardContainer = document.querySelector(".card__container");
const cards = embaralhar(newGame(6));
const logic = new GameLogic(cards);
createCards(cards, cardContainer, logic._cardTheme);
logic.modoDeJogo(modo);
if (cardContainer) {
    cardContainer.addEventListener("click", (event) => {
        event.preventDefault();
        logic.start(event);
    });
}
;
const btnHome = document.querySelector(".btn_home");
if (btnHome) {
    btnHome.addEventListener("click", () => window.location.href = "index.html");
}
;
const btnOpcoes = document.querySelector(".btn_ingame_config");
if (btnOpcoes) {
    btnOpcoes.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        let bgmVolume = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
        let seVolume = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1);
        if (modal) {
            modal.innerHTML = `
            <div class="modal-content">
                <h1>Configurações</h1>
                <h2>Volume:</h2>
                <div class="modal_volume">
                    <p>Música de fundo:</p>
                    <input type="range" min="0" max="10" value="${bgmVolume * 10}" id="bgmVolume"></input>
                    <p>Efeitos sonoros:</p>
                    <input type="range" min="0" max="10" value="${seVolume * 10}" id="seVolume"></input>
                </div>
                </br>
                <div>
                    <h2>Tempo para cartas desvirar:</h2>
                    <select class="modal_select_box" name="tema" id="tempoParaDesvirar">
                        <option selected value="1">1 Segundo</option>
                        <option value="2">2 Segundos</option>
                        <option value="3">3 Segundos</option>
                    </select>
                </div>
                <button class="close-button">Fechar</button>
                <button class="save-button">Salvar</button>
            </div>
            `;
            modal.style.display = 'block';
            const closeButton = modal.querySelector(".close-button");
            const saveButton = modal.querySelector(".save-button");
            const bgmRange = modal.querySelector("#bgmVolume");
            const seRange = modal.querySelector("#seVolume");
            const tempoParaDesvirar = modal.querySelector("#tempoParaDesvirar");
            if (saveButton) {
                saveButton.addEventListener("click", () => {
                    window.localStorage.setItem("bgmvolume", ((parseInt(bgmRange.value)) / 10).toString());
                    window.localStorage.setItem("sevolume", ((parseInt(seRange.value)) / 10).toString());
                    window.localStorage.setItem("tempoParaDesvirar", tempoParaDesvirar.value);
                    modal.style.display = "none";
                    logic.ingameConfig();
                });
            }
            ;
            if (closeButton) {
                closeButton.addEventListener("click", () => modal.style.display = "none");
            }
            ;
        }
        ;
    });
}
;
