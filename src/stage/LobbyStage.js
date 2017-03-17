import * as PIXI from 'pixi.js';
import {
    Constant
} from '../utils/Constant';
import {
    Utils
} from '../utils/Utils';
import {
    App
} from '../App';
import {
    BaseStage
} from './BaseStage';
import {
    GameStage
} from './GameStage';
import {
    Input
} from '../component/Input'

class LobbyStage extends BaseStage {

    constructor(renderer) {
        super(renderer);

        this.resArray = [
            Constant.RES.BTN_ENTRY,
            Constant.RES.BTN_CREATE
        ];

        this.loadRes(this.resArray);

    }

    onResLoadFinish() {
        const winSize = {
            width: this.renderer.width,
            height: this.renderer.height
        };

        //background
        let sp = Utils.createSprite(Constant.RES.BG);
        Utils.fillbg(sp, this.renderer)
        Utils.center(sp, this.renderer)
        this.stage.addChild(sp);

        //create room button
        sp = Utils.createSprite(Constant.RES.BTN_CREATE);
        sp.position.set(winSize.width / 2, winSize.height / 3);
        this.stage.addChild(sp);
        this.btnCreate = sp;

        //entry room button
        sp = Utils.createSprite(Constant.RES.BTN_ENTRY);
        sp.position.set(winSize.width / 2, winSize.height - 100);
        this.stage.addChild(sp);
        this.btnEntry = sp;

        //Render the stage
        this.show();
    }

    onMouseDown(evt) {
        if (Utils.touchInSprite(evt.position, this.btnCreate)) {
            console.log('create room')
        } else if (Utils.touchInSprite(evt.position, this.btnEntry)) {
            console.log('entry room')
            const stage = new GameStage(this.renderer);
            App.getInstance().show(stage);
        }
    }
}

export {
    LobbyStage
}
