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
import {
    UserInfo
} from './component/UserInfo';

let gInstance = null;

class App extends PIXI.Application {

    static getInstance() {
        if (null == gInstance) {
            gInstance = new App();
        }

        return gInstance;
    }

    constructor() {
        if (null == gInstance) {
            super();
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
        const renderer = this.renderer;
        //Add the canvas to the HTML document
        document.body.appendChild(this.renderer.view);

        //whold view
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";
        renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);

        this.pushStage(new LoginStage(this.renderer));

        this.ticker.add((time) => {
            this.stage.children.forEach((child) => {
                if (child.visible) {
                    child.update(time);
                }
            })
            renderer.render(this.stage);
        });
    }

    pushStage(stage) {
        if (this.stage.children.length > 0) {
            this.stage.children[this.stage.children.length - 1].visible = false;
        }
        this.stage.addChild(stage);
    }

    popStage() {
        if (1 == this.stage.children.length) {
            console.log('only one child exist');
            return;
        }
        this.removeChildAt(-1);
        this.stage.children[-1].visible = true;
    }

    loadComponents() {
        Input.getInstance();
    }

    getWinSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
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

    getOrCreateCurUser() {
        if ('undefined' == typeof this.curUser) {
            this.curUser = new UserInfo();
        }
        return this.curUser;
    }

}

App.gInstance = null

export {
    App
}
