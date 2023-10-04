export class Sound{
    public correct:HTMLAudioElement;
    public incorrect:HTMLAudioElement;
    public newGame:HTMLAudioElement;
    public endGame: HTMLAudioElement;
    public bgm: HTMLAudioElement;
    private bgmVolume: number;
    private seVolume: number;

    constructor(){
        this.correct = new Audio("./dist/sound/correct.mp3");
        this.incorrect = new Audio("./dist/sound/incorrect.wav");
        this.newGame = new Audio("./dist/sound/newGame.wav");
        this.endGame = new Audio("./dist/sound/endGame.wav");
        this.bgm = new Audio("./dist/sound/bgm.ogg");

        this.bgmVolume = (window.localStorage.getItem("bgmvolume") ? parseFloat(window.localStorage.getItem("bgmvolume")) : 1);
        this.seVolume = (window.localStorage.getItem("sevolume") ? parseFloat(window.localStorage.getItem("sevolume")) : 1); 

        this.setVolume();
    }

    private setVolume(): void{
        this.bgm.volume = this.bgmVolume;
        this.correct.volume = this.seVolume;
        this.incorrect.volume = this.seVolume;
        this.newGame.volume = this.seVolume;
        this.endGame.volume = this.seVolume;
    }
    

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

    public playBgm(){
        this.bgm.play();
        this.bgm.loop = true;
    }

    public pauseBgm(){
        this.bgm.pause();
        this.bgm.loop = false;
    }
}
