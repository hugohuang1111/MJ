import {
    Container
} from 'pixi.js';

class Area extends Container {

    constructor() {
        super();
    }

    /*
    * info {
        interval: 0,
        width: 0,
        height: 0,
        direction: 'down', 'right', 'up', 'left'
    }
    *
    */
    layout(info) {
        const d = info.direction
        if ('down' == d) {
            this.layoutDown(info);
        } else if ('up' == d) {
            this.layoutUp(info);
        } else if ('right' == d) {
            this.layoutRight(info);
        } else if ('left' == d) {
            this.layoutLeft(info);
        }
    }

    layoutDown(info) {}
    layoutUp(info) {}
    layoutRight(info) {}
    layoutLeft(info) {}

    calcWH(info) {
        return {
            width: info.width || this.width,
            height: info.height || this.height
        }
    }

    moveToCenter(x, y, wh) {
        const children = this.children;
        const offsetX = wh.width / 2 * x;
        const offsetY = wh.height / 2 * y;
        children.forEach((child) => {
            child.x += offsetX;
            child.y += offsetY;
        });
    }

    showEdge() {
        let rect = null;
        this.children.forEach((child) => {
            let r = new PIXI.Rectangle(child.x - child.width * child.anchor.x,
                child.y - child.height * child.anchor.y,
                child.width, child.height);
            if (null == rect) {
                rect = r;
            } else {
                rect.enlarge(r);
            }
        })

        if (null == this.edge) {
            this.edge = new PIXI.Graphics();
            this.edge.lineStyle(1, 0xFF3300, 1);
            this.addChild(this.edge);
        }
        this.edge.drawRect(rect.x, rect.y, rect.width, rect.height);
    }

}

export {
    Area
};
