import {
    Area
} from './Area';

class WallArea extends Area {

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
        //先将当前结点放在它的所有子结点组成区域的 左上角 来布局
        let counter = 0;
        children.forEach((child) => {
            const idx = parseInt(counter / 2);
            const remainder = counter % 2;

            child.x = (child.width + info.intervalX) * idx + child.width / 2;

            if (0 == remainder) {
                child.y = child.height / 2 + info.intervalY;
            } else {
                child.y = child.height / 2;
            }
            counter++;
        });

        this.moveToCenter(-1, -1, this.calcWH(info));
    }

    layoutUp(info) {
        const children = this.children;
        //先将当前结点放在它的所有子结点组成区域的 右下角 来布局
        let counter = 0;
        children.forEach((child) => {
            const idx = parseInt(counter / 2);
            const remainder = counter % 2;

            child.x = -(child.width + info.intervalX) * idx - child.width / 2;

            if (0 == remainder) {
                child.y = -child.height / 2;
            } else {
                child.y = -child.height / 2 - info.intervalY;
            }
            counter++;
        });

        this.moveToCenter(1, 1, this.calcWH(info));
    }

    layoutRight(info) {
        const children = this.children;
        //先将当前结点放在它的所有子结点组成区域的 左下角 来布局
        let counter = 0;
        children.forEach((child) => {
            const idx = parseInt(counter / 2);
            const remainder = counter % 2;

            child.x = child.width / 2;
            child.y = -(child.height + info.intervalY) * idx - child.height / 2;

            if (0 != remainder) {
                child.y += info.intervalY;
            }
            counter++;
        });
        for (let i = 0; i < children.length; i += 2) {
            if (i + 1 >= children.length) {
                break;
            }
            const t = children[i];
            children[i] = children[i + 1];
            children[i + 1] = t;
        }
        children.reverse();

        this.moveToCenter(-1, 1, this.calcWH(info));
    }

    layoutLeft(info) {
        const children = this.children;
        //先将当前结点放在它的所有子结点组成区域的 右上角 来布局
        let counter = 0;
        children.forEach((child) => {
            const idx = parseInt(counter / 2);
            const remainder = counter % 2;

            child.x = child.width / 2;
            child.y = (child.height + info.intervalY) * idx + child.height / 2;

            if (0 == remainder) {
                child.y -= info.intervalY;
            }

            counter++;
        });

        this.moveToCenter(1, -1, this.calcWH(info));
    }

}

export {
    WallArea
};
