import SokobanEventLoop from './EventLoop';
import SokobanHTMLTableRenderer from './renderers/HTMLTableRenderer';
import SokobanGameEngine from './GameEngine';
import { levels } from './levels';


class SokobanApp {
    constructor() {
        this.storage = {
            levels: levels,
            currentLevel: levels[0]
        };
        this.history = [];

        this.renderer = new SokobanHTMLTableRenderer(
            document.getElementById('canvas'),
            this.storage.currentLevel
        );
        this.gameEngine = new SokobanGameEngine(
            this.storage.currentLevel,
            this.renderer.render.bind(this.renderer),
            this.renderer.finishGame.bind(this.renderer)
        );
        this.eventLoop = new SokobanEventLoop({
            left: this.gameEngine.goLeft.bind(this.gameEngine),
            up: this.gameEngine.goUp.bind(this.gameEngine),
            right: this.gameEngine.goRight.bind(this.gameEngine),
            down: this.gameEngine.goDown.bind(this.gameEngine),
            exit: this.gameEngine.exitGame.bind(this.gameEngine)
        });

        this.eventLoop.start();
    }

    exitGame() {
        this.renderer.showExitScreen();
    }
}

new SokobanApp();