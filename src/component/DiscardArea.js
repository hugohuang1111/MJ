import {
    Area
} from './Area';

class DiscardArea extends Area {

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

}

export {
    DiscardArea
};
