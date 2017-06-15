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
import {
    Net
} from '../service/Net'

class LoginStage extends BaseStage {

    constructor(renderer) {
        super(renderer);

        this.resArray = [
            Constant.RES.BG,
            Constant.RES.LOGO,
            Constant.RES.BTN_START
        ];

        this.loadRes(this.resArray);
        Net.getInstance().onRegister.add(this.registerResp.bind(this));
        Net.getInstance().onLogin.add(this.loginResp.bind(this));
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
    }

    onMouseDown(evt) {
        if (!this.visible) {
            return true;
        }

        if (!Utils.touchInSprite(evt.position, this.btnLogin)) {
            return;
        }

        const account = Utils.getCookie('userName');
        const password = Utils.getCookie('password');
        console.log('Account:' + account + ' Password:' + password);
        if (!account || !password) {
            this.registerReq();
            return;
        }

        this.loginReq(account, password);
    }

    registerReq() {
        console.log('to register');
        Net.getInstance().register();
    }

    registerResp(resp) {
        console.log('register resp:%O', resp);
        if (0 != resp.error) {
            console.log('register failed:', resp.description);
            return
        }
        Utils.setCookie('userName', resp.user);
        Utils.setCookie('password', resp.passwd);
    }

    loginReq(account, password) {
        Net.getInstance().login(account, password);
    }

    loginResp(resp) {
        if (0 == resp.error) {
            const app = App.getInstance();
            const user = app.getOrCreateCurUser();
            user.setName(resp.user);
            user.setID(resp.userID);
            const lobby = new LobbyStage(this.renderer);
            app.pushStage(lobby);
        } else {
            console.log('login fail:' + resp.description)
        }
    }

}

export {
    LoginStage
}
