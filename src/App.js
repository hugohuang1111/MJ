import * as PIXI from 'pixi.js';
import {
    LoginStage
} from './stage/LoginStage';
import {
    GameStage
} from './stage/GameStage';
import {
    Input
} from './component/Input';

let gInstance = null;

class App {

    static getInstance() {
        if (null == gInstance) {
            gInstance = new App();
        }

        return gInstance;
    }

    constructor() {
        if (null == gInstance) {
            gInstance = this

            this.mouseDown = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.mouseDownCount = 0;
            // document.body.onmousedown = this.onMouseDown.bind(this);
            // document.body.onmouseup = this.onMouseUp.bind(this);

            this.loadComponents();
        }

        return gInstance
    }

    run() {
        //Create the renderer
        const renderer = PIXI.autoDetectRenderer();
        this.renderer = renderer;

        //Add the canvas to the HTML document
        document.body.appendChild(renderer.view);

        //Create a container object called the `stage`
        const stage = new GameStage(renderer);

        //whold view
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";
        renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);

        //Tell the `renderer` to `render` the `stage`
        this.show(stage)
    }

    show(stage) {
        if (null != this.curStage) {
            this.curStage.release();
        }
        stage.show(this.renderer);
        this.curStage = stage;
    }

    loadComponents() {
        Input.getInstance();

    }

    getWinSize() {
        return {
            width: this.renderer.width,
            height: this.renderer.height
        }
    }

    onMouseDown(evt) {
        ++this.mouseDown[evt.button];
        ++this.mouseDownCount;
    }

    onMouseUp(evt) {
        --this.mouseDown[evt.button];
        --this.mouseDownCount;
    }

}

App.gInstance = null

export {
    App
}
