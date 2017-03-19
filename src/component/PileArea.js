import {
    Area
} from './Area';

class PileArea extends Area {

    layoutDown(info) {
        const children = this.children;
        let x = 0;
        let y = 0;
        let i = 0;
        //先将当前结点放在它的所有子结点组成区域的 左上角 来布局
        children.forEach((child) => {
            if (i + 1 == children.length) {
                child.x = 0;
                child.y = 0;
            } else {
                child.x = x + child.width / 2;
                child.y = y + child.height / 2;

                x += child.width;
                x += info.intervalX;
                i++;
            }
        });

        this.moveToCenter(-1, -1, this.calcWH(info));
    }
    layoutUp(info) {}
    layoutRight(info) {}
    layoutLeft(info) {}

}

export {
    PileArea
}
