export class Sound {
    constructor() {
        this.correct = new Audio("./dist/sound/correct.mp3");
        this.incorrect = new Audio("./dist/sound/incorrect.wav");
        this.newGame = new Audio("./dist/sound/newGame.wav");
        this.endGame = new Audio("./dist/sound/endGame.wav");
        this.bgm = new Audio("./dist/sound/bgm.ogg");
        this.bgmVolume = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
        this.seVolume = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1);
        this.setVolume();
    }
    setVolume() {
        this.bgm.volume = this.bgmVolume;
        this.correct.volume = this.seVolume;
        this.incorrect.volume = this.seVolume;
        this.newGame.volume = this.seVolume;
        this.endGame.volume = this.seVolume;
    }
    playCorreto() {
        this.correct.play();
    }
    playIncorreto() {
        this.incorrect.play();
    }
    playNovoJogo() {
        this.newGame.play();
    }
    playEndGame() {
        this.endGame.play();
    }
    playBgm() {
        this.bgm.play();
        this.bgm.loop = true;
    }
    pauseBgm() {
        this.bgm.pause();
        this.bgm.loop = false;
    }
}
