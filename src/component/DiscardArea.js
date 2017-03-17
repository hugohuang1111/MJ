import {
    Container
} from 'pixi.js';

class DiscardArea extends Container {

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

    layoutDown(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        //先将当前结点放在它的所有子结点组成区域的 左上角 来布局
        children.forEach((child) => {
            if (x + child.width > info.width) {
                //需要换行了
                x = 0;
                y += child.height;
                y += info.intervalY;
            }
            child.x = x + child.width / 2;
            child.y = y + child.height / 2;

            x += child.width;
            x += info.intervalX;
        });

        this.moveToCenter(-1, -1, this.calcWH(info));
    }

    layoutUp(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        //先将当前结点放在它的所有子结点组成区域的 右下角 来布局
        children.forEach((child) => {
            if (x - child.width < -info.width) {
                //需要换行了
                x = 0;
                y -= child.height;
                y -= info.intervalY;
            }
            child.x = x - child.width / 2;
            child.y = y - child.height / 2;

            x -= child.width;
            x -= info.intervalX;
        });
        children.reverse();

        this.moveToCenter(1, 1, this.calcWH(info));
    }

    layoutRight(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        //先将当前结点放在它的所有子结点组成区域的 左下角 来布局
        children.forEach((child) => {
            if (y - child.height < -info.height) {
                //需要换行了
                y = 0;
                x += child.width;
                x += info.intervalX;
            }
            child.x = x + child.width / 2;
            child.y = y - child.height / 2;

            y -= child.height;
            y -= info.intervalY;
        });
        children.reverse();

        this.moveToCenter(-1, 1, this.calcWH(info));
    }

    layoutLeft(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        //先将当前结点放在它的所有子结点组成区域的 右上角 来布局
        children.forEach((child) => {
            if (y + child.height > info.height) {
                //需要换行了
                y = 0;
                x -= child.width;
                x -= info.intervalX;
            }
            child.x = x - child.width / 2;
            child.y = y + child.height / 2;

            y += child.height;
            y += info.intervalY;
        });

        this.moveToCenter(1, -1, this.calcWH(info));
    }

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
    DiscardArea
};
