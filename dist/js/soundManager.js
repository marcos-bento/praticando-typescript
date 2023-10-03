export class Sound {
    constructor() {
        this.correct = new Audio("./dist/sound/correct.mp3");
        this.incorrect = new Audio("./dist/sound/incorrect.wav");
        this.newGame = new Audio("./dist/sound/newGame.wav");
        this.endGame = new Audio("./dist/sound/endGame.wav");
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
}
