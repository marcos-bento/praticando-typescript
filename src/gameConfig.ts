type ConfigCallback = () => void;

export default function gameConfig(origem?: string, callback?: ConfigCallback): void{
    const modal: HTMLElement = document.getElementById("modal") as HTMLElement;
    let bgmVolume:number = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
    let seVolume:number = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1);
    const temaHTMLContent: string = (origem ? `
    <h2>Escolha o tema:</h2>
    <select class="modal_select_box" name="tema" id="tema">
        <option selected value="temaOceano">Fundo do Mar</option>
        <option value="temaSelva">Selva</option>
        <option value="temaDinossauros">Dinossauros</option>
    </select>`: '');
    
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

            ${temaHTMLContent}
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
        const theme: HTMLInputElement | null = (origem ? modal.querySelector("#tema") as HTMLInputElement : null);
        const tempoParaDesvirar: HTMLInputElement = modal.querySelector("#tempoParaDesvirar") as HTMLInputElement;

        if (saveButton){
            saveButton.addEventListener("click", ()=> {
                window.localStorage.setItem("bgmvolume", ((parseInt(bgmRange.value))/10).toString());
                window.localStorage.setItem("sevolume", ((parseInt(seRange.value))/10).toString());
                window.localStorage.setItem("tempoParaDesvirar", tempoParaDesvirar.value);
                if (theme){
                    window.localStorage.setItem("temaDasCartas", theme.value);
                    mudaTema(theme.value);
                };
                if (callback) {
                    callback(); // Chame a função de callback, se fornecida.
                };
                modal.style.display = "none";
            });
        };

        if (closeButton){
            closeButton.addEventListener("click", ()=> modal.style.display = "none");
        };
    };
}

export function mudaTema(novoTema: string){
    const imagensGirando:NodeListOf<HTMLElement> = document.querySelectorAll(".menu_container_image") as NodeListOf<HTMLElement>;
    imagensGirando.forEach(imagem =>{
        imagem.style.backgroundImage = `url("../../dist/img/${novoTema}/cardCover.jpg")`;
    });
}
