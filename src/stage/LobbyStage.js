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
import {
    Net
} from '../service/Net'

const MJ_TIMER_NUMBERS_JSON = './asset/img/numbers.json';

class LobbyStage extends BaseStage {

    constructor(renderer) {
        super(renderer);

        this.resArray = [
            Constant.RES.BTN_ENTRY,
            Constant.RES.BTN_CREATE,
            MJ_TIMER_NUMBERS_JSON
        ];

        this.loadRes(this.resArray);
        Net.getInstance().onRoom.add(this.roomListener.bind(this));
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
        // sp = Utils.createSprite(Constant.RES.BTN_CREATE);
        // sp.position.set(winSize.width / 2, winSize.height / 3);
        // this.stage.addChild(sp);
        // this.btnCreate = sp;

        let node = new PIXI.Container();
        node.position.set(winSize.width / 2, 200);
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0xDDDDDD);
        graphics.drawRect(-300, -50, 300, 100);
        node.addChild(graphics);
        this.inputDigits = graphics;

        //entry room button
        sp = Utils.createSprite(Constant.RES.BTN_ENTRY);
        sp.position.set(300, 0);
        sp.anchor.set(1, 0.5)
        node.addChild(sp)
        this.stage.addChild(node);
        this.btnEntry = sp;

        let numbers = new PIXI.Container();
        numbers.position.set(winSize.width / 2, 500);
        const textures = PIXI.loader.resources[MJ_TIMER_NUMBERS_JSON].textures
        for (let i = 0; i < 10; i++) {
            sp = new PIXI.Sprite(textures[`number${(i+1)%10}`]);
            sp.anchor.set(0.5, 0.5);
            sp.scale.set(2, 2);
            sp.digit = (i + 1) % 10;
            numbers.addChild(sp);
        }
        let unitWidth = 600 / 4;
        let unitHeight = 200;
        let i = 0;
        numbers.children.forEach((child) => {
            child.x = (i % 5) * unitWidth
            child.y = unitHeight * (Math.floor(i / 5) + 1 / 2);

            child.x -= 300;
            child.y -= 200;
            i++;
        });
        this.stage.addChild(numbers);
        this.numbersSP = numbers;
    }

    pushDigit(digit) {
        const max = 3;
        const len = this.inputDigits.children.length;
        if (max == len) {
            this.inputDigits.removeChildren();
        }
        digit.position.x = -300 + 300 / 3 * (1 / 2 + len % max);
        this.inputDigits.addChild(digit);
    }

    roomListener(msg) {
        if (!this.visible) {
            return true;
        }
        if ('entryRoom' == msg.type) {
            if (0 == msg.error) {
                const app = App.getInstance();
                const stage = new GameStage(this.renderer);
                stage.setPlayer(app.curUser.userID, msg.users);
                app.pushStage(stage);
            } else {
                console.log(msg.description);
            }
        }
    }

    onMouseDown(evt) {
        if (!this.visible) {
            return true;
        }
        if (Utils.touchInSprite(evt.position, this.btnCreate)) {
            console.log('create room')
        } else if (Utils.touchInSprite(evt.position, this.btnEntry)) {
            let roomNumber = 0;
            this.inputDigits.children.forEach((child) => {
                roomNumber *= 10;
                roomNumber += child.digit;
            });
            console.log(`entry room:%d`, roomNumber);
            Net.getInstance().entryRoom(roomNumber);
        } else {
            let i = 1;
            this.numbersSP.children.forEach((child) => {
                if (Utils.touchInSprite(evt.position, child)) {
                    const digit = Utils.cloneSprite(child);
                    digit.digit = child.digit;
                    digit.scale.set(2, 2);
                    digit.anchor.set(0.5, 0.5)
                    this.pushDigit(digit);
                }
                i++;
                i = i % 10;
            });
        }
    }
}

export {
    LobbyStage
}
