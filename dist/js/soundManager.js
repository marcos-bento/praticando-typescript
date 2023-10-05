export class Sound {
    constructor() {
        this.correct = new Audio("./dist/sound/correct.mp3");
        this.incorrect = new Audio("./dist/sound/incorrect.wav");
        this.newGame = new Audio("./dist/sound/newGame.wav");
        this.endGame = new Audio("./dist/sound/endGame.wav");
        this.bgm = new Audio("./dist/sound/bgm.ogg");
        this.bgmVolume = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
        this.seVolume = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1);
        this.setVolume(this.bgmVolume, this.seVolume);
    }
    setVolume(newBGMVolume, newSEVolume) {
        this.bgm.volume = newBGMVolume;
        this.correct.volume = newSEVolume;
        this.incorrect.volume = newSEVolume;
        this.newGame.volume = newSEVolume;
        this.endGame.volume = newSEVolume;
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
