export class Sound {
    constructor() {
        this.correct = new Audio("./dist/sound/correct.mp3");
        this.incorrect = new Audio("./dist/sound/incorrect.wav");
        this.newGame = new Audio("./dist/sound/newGame.wav");
        this.endGame = new Audio("./dist/sound/endGame.wav");
        this.bgm = new Audio("./dist/sound/bgm.ogg");
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
