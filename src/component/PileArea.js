import {
    Area
} from './Area';

class PileArea extends Area {

    layoutDown(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        let i = 0;
        let rect = null;
        //先将当前结点放在它的所有子结点组成区域的 左上角 来布局
        children.forEach((child) => {
            if (i + 1 == children.length) {
                child.x = rect.x + rect.width / 2;
                child.y = rect.y + rect.height / 2 + info.intervalY;
            } else {
                child.x = x + child.width / 2;
                child.y = y + child.height / 2;

                x += child.width;
                x += info.intervalX;
                i++;

                let r = new PIXI.Rectangle(child.x - child.width * child.anchor.x,
                    child.y - child.height * child.anchor.y,
                    child.width, child.height);
                if (null == rect) {
                    rect = r;
                } else {
                    rect.enlarge(r);
                }
            }
        });

        this.moveToCenter(-1, -1, this.calcWH(info));
    }
    layoutUp(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        let i = 0;
        let rect = null;
        //先将当前结点放在它的所有子结点组成区域的 右下角 来布局
        children.forEach((child) => {
            if (i + 1 == children.length) {
                child.x = rect.x + rect.width / 2;
                child.y = rect.y + rect.height / 2 + info.intervalY;
            } else {
                child.x = x - child.width / 2;
                child.y = y - child.height / 2;

                x -= child.width;
                x -= info.intervalX;
                i++;

                let r = new PIXI.Rectangle(child.x - child.width * child.anchor.x,
                    child.y - child.height * child.anchor.y,
                    child.width, child.height);
                if (null == rect) {
                    rect = r;
                } else {
                    rect.enlarge(r);
                }
            }
        });
        // children.reverse();

        this.moveToCenter(1, 1, this.calcWH(info));
    }
    layoutRight(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        let i = 0;
        let rect = null;
        //先将当前结点放在它的所有子结点组成区域的 左下角 来布局
        children.forEach((child) => {
            if (i + 1 == children.length) {
                child.x = rect.x + rect.width / 2;
                child.y = -rect.height / 2 + info.intervalX;
            } else {
                child.x = x + child.width / 2;
                child.y = y - child.height / 2;

                y -= child.height;
                y -= info.intervalY;
                i++;

                let r = new PIXI.Rectangle(child.x - child.width * child.anchor.x,
                    child.y - child.height * child.anchor.y,
                    child.width, child.height);
                if (null == rect) {
                    rect = r;
                } else {
                    rect.enlarge(r);
                }
            }
        });
        const lastChild = this.removeChildAt(children.length - 1);
        // children[2].visible = false;
        children.reverse();
        this.addChild(lastChild);


        this.moveToCenter(-1, 1, this.calcWH(info));
    }
    layoutLeft(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        let i = 0;
        let rect = null;
        //先将当前结点放在它的所有子结点组成区域的 右上角 来布局
        children.forEach((child) => {
            if (i + 1 == children.length) {
                child.x = rect.x + rect.width / 2;
                child.y = child.height / 2 + info.intervalX;
            } else {
                child.x = x - child.width / 2;
                child.y = y + child.height / 2;

                y += child.height;
                y += info.intervalY;
                i++;

                let r = new PIXI.Rectangle(child.x - child.width * child.anchor.x,
                    child.y - child.height * child.anchor.y,
                    child.width, child.height);
                if (null == rect) {
                    rect = r;
                } else {
                    rect.enlarge(r);
                }
            }
        });
        // children[2].visible = false;

        this.moveToCenter(1, -1, this.calcWH(info));
    }

}

export {
    PileArea
}
