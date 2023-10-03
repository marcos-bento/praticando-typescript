export class Sound{
    public correct:HTMLAudioElement = new Audio("./dist/sound/correct.mp3");
    public incorrect:HTMLAudioElement = new Audio("./dist/sound/incorrect.wav");
    public newGame:HTMLAudioElement = new Audio("./dist/sound/newGame.wav");
    public endGame: HTMLAudioElement = new Audio("./dist/sound/endGame.wav");

    public playCorreto(){
        this.correct.play();
    }

    public playIncorreto(){
        this.incorrect.play();
    }

    public playNovoJogo(){
        this.newGame.play();
    }

    public playEndGame(){
        this.endGame.play();
    }
}
