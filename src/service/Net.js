const Signal = require('signals');


let gInstance = null;
class Net {

    static getInstance() {
        if (null == gInstance) {
            gInstance = new Net();
            if (window.WebSocket == undefined) {
                alert("You Browser is not support WebSocket!");
            }
        }
        return gInstance;
    }

    constructor() {
        this.onRegister = new Signal();
        this.onLogin = new Signal();
        this.ws = new WebSocket('ws://localhost:8000')
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }

    onOpen(event) {
        console.log('ws open state:' + this.ws.readyState);

        /*
        CONNECTING  0
        OPEN    1
        CLOSING 2
        CLOSED  3
        */
    }

    onClose(event) {
        console.log('ws close:%O', event);
    }

    onMessage(event) {
        console.log('ws message:%O', event);
        const msg = JSON.parse(event.data);

        switch (msg.type) {
            case "register":
                this.onRegister.dispatch(msg);
                break;
            case "login":
                this.onLogin.dispatch(msg);
                break;
        }
    }

    onError(event) {
        console.log('ws error:%O', event);
        this.ws = null;
    }

    register(name, password) {
        const req = {
            version: 1,
            type: 'register',
            userName: name,
            password: password
        };
        this.sendMsg(req);
    }

    login(name, password) {
        const req = {
            version: 1,
            type: 'login',
            userName: name,
            password: password
        };
        this.sendMsg(req);
    }

    sendMsg(req) {
        if (null == this.ws) {
            return;
        }
        if (null == req) {
            return;
        }
        if (1 != this.ws.readyState) {
            console.log('WebSocket is not open');
            return;
        }
        const s = JSON.stringify(req);
        console.log('SEND:' + s)
        this.ws.send(s);
    }
}

export {
    Net
}
