const Signal = require('signals');

let gInstance = null;

class Input {

    static getInstance() {
        if (null == gInstance) {
            gInstance = new Input();
        }

        return gInstance;
    }

    constructor() {
        if (null == gInstance) {
            gInstance = this;

            this.position = {
                x: 0,
                y: 0
            };
            this.button = 0; //0: none 1: left 2: right 4: middle
            this.mouseDownSig = new Signal();
            this.mouseUpSig = new Signal();
            document.body.onmousedown = this.onMouseDown.bind(this);
            document.body.onmouseup = this.onMouseUp.bind(this);
        }

        return gInstance;
    }

    observer(event, cb) {
        switch (event) {
            case Input.EVENT.MOUSE_DOWN:
                {
                    this.mouseDownSig.add(cb);
                    break;
                }
            case Input.EVENT.MOUSE_UP:
                {
                    this.mouseUpSig.add(cb);
                    break;
                }
            default:
                {
                    break;
                }
        }
    }

    unobserver(event, cb) {
        switch (event) {
            case Input.EVENT.MOUSE_DOWN:
                {
                    this.mouseDownSig.remove(cb);
                    break;
                }
            case Input.EVENT.MOUSE_UP:
                {
                    this.mouseUpSig.remove(cb);
                    break;
                }
            default:
                {
                    break;
                }
        }
    }

    onMouseDown(evt) {
        this.mouseDownSig.dispatch(this.combinEvent(evt));
    }

    onMouseUp(evt) {
        this.mouseUpSig.dispatch(this.combinEvent(evt));
    }

    combinEvent(evt) {
        return {
            position: {
                x: evt.x,
                y: evt.y
            },
            button: evt.button
        }
    }

}

Input.EVENT = {
    MOUSE_DOWN: "evt_mouse_down",
    MOUSE_UP: "evt_mouse_up"
}

export {
    Input
}
