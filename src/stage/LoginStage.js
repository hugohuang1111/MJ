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
    LobbyStage
} from './LobbyStage';
import {
    Input
} from '../component/Input'

class LoginStage extends BaseStage {

    constructor(renderer) {
        super(renderer);

        this.resArray = [
            Constant.RES.BG,
            Constant.RES.LOGO,
            Constant.RES.BTN_START
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

        //logo
        sp = Utils.createSprite(Constant.RES.LOGO);
        sp.position.set(winSize.width / 2, winSize.height / 3);
        this.stage.addChild(sp);

        //login button
        sp = Utils.createSprite(Constant.RES.BTN_START);
        sp.position.set(winSize.width / 2, winSize.height - 100);
        this.stage.addChild(sp);
        this.btnLogin = sp;

        //Render the stage
        this.show();
    }

    onMouseDown(evt) {
        if (!Utils.touchInSprite(evt.position, this.btnLogin)) {
            return false
        }

        const lobby = new LobbyStage(this.renderer);
        App.getInstance().show(lobby);
    }

}

export {
    LoginStage
}
