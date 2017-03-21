import * as PIXI from 'pixi.js';
import {
    Input
} from '../component/Input';

class BaseStage extends PIXI.Container {

    constructor(renderer) {
        super();
        this.stage = this;
        this.renderer = renderer;
        this.onMouseDown = this.onMouseDown.bind(this);
        Input.getInstance().observer(Input.EVENT.MOUSE_DOWN, this.onMouseDown);
        this.components = new Array();
    }

    loadRes(resArray, onFinish) {
        let onLoad = onFinish
        if (null == onLoad) {
            onLoad = this.onResLoadFinish.bind(this)
        }

        let arr = new Array();
        for (let i = 0; i < resArray.length; i++) {
            if (null == PIXI.loader.resources[resArray[i]]) {
                arr.push(resArray[i]);
            }
        }

        if (0 == arr.length) {
            onLoad();
        }

        PIXI.loader
            .add(arr)
            .load(onLoad);
    }

    onResLoadFinish() {
        this.winSize = {
            width: this.renderer.width,
            height: this.renderer.height
        };
    }

    update(time) {
        this.components.forEach((comp) => {
            comp.update(time);
        })
    }

    onMouseDown(evt) {}

    release() {
        Input.getInstance().unobserver(Input.EVENT.MOUSE_DOWN, this.onMouseDown);
    }
}

export {
    BaseStage
}
