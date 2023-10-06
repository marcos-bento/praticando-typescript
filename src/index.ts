import { Card } from "./cards.js";
import { createCards } from "./createCards.js";
import { GameLogic } from "./gameLogic.js";
import { newGame } from "./newGame.js";
import { embaralhar } from "./shuffleCards.js";

const modo:string = window.localStorage.getItem("modo") as string | ModoDeJogo.UmJogador;
const cardContainer: HTMLElement = document.querySelector(".card__container") as HTMLElement;
const cards:Card[] = embaralhar(newGame(6));
const logic = new GameLogic(cards);

createCards(cards, cardContainer, logic._cardTheme);
logic.modoDeJogo(modo);

// ###########################################################
// AO CLICAR EM ALGUM CARD
// ###########################################################

if (cardContainer){
    cardContainer.addEventListener("click", (event: any)=>{
        event.preventDefault();
        logic.start(event);
    });
};

// ###########################################################
// BOTÃO VOLTAR AO MENU PRINCIPAL
// ###########################################################

const btnHome: HTMLElement = document.querySelector(".btn_home") as HTMLElement;

if (btnHome){
    btnHome.addEventListener("click", () => window.location.href= "index.html");
};

// ###########################################################
// BOTÃO OPÇÕES
// ###########################################################

const btnOpcoes: HTMLElement = document.querySelector(".btn_ingame_config") as HTMLElement;

if (btnOpcoes){
    btnOpcoes.addEventListener("click", () => {
        const modal: HTMLElement = document.getElementById("modal") as HTMLElement;
        let bgmVolume:number = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
        let seVolume:number = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1);

        if (modal) {
            modal.innerHTML =`
            <div class="modal-content">
                <h1>Configurações</h1>
                <h2>Volume:</h2>
                <div class="modal_volume">
                    <p>Música de fundo:</p>
                    <input type="range" min="0" max="10" value="${bgmVolume*10}" id="bgmVolume"></input>
                    <p>Efeitos sonoros:</p>
                    <input type="range" min="0" max="10" value="${seVolume*10}" id="seVolume"></input>
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
            `

            modal.style.display = 'block';

            const closeButton: HTMLElement = modal.querySelector(".close-button") as HTMLElement;
            const saveButton: HTMLElement = modal.querySelector(".save-button") as HTMLElement;
            const bgmRange: HTMLInputElement = modal.querySelector("#bgmVolume") as HTMLInputElement;
            const seRange: HTMLInputElement = modal.querySelector("#seVolume") as HTMLInputElement;
            const tempoParaDesvirar: HTMLInputElement = modal.querySelector("#tempoParaDesvirar") as HTMLInputElement;

            if (saveButton){
                saveButton.addEventListener("click", ()=> {
                    window.localStorage.setItem("bgmvolume", ((parseInt(bgmRange.value))/10).toString());
                    window.localStorage.setItem("sevolume", ((parseInt(seRange.value))/10).toString());
                    window.localStorage.setItem("tempoParaDesvirar", tempoParaDesvirar.value);
                    modal.style.display = "none";
                    logic.ingameConfig();
                });
            };

            if (closeButton){
                closeButton.addEventListener("click", ()=> modal.style.display = "none");
            };
        };
    });
};
