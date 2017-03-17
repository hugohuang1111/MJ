import * as PIXI from 'pixi.js';

class PileTiles extends PIXI.Container {

    constructor() {
        super();
    }

    pile(type, info = {}) {
        if (this.children.length < 2) {
            // children count is 0 or 1, needn't
            return;
        }

        switch (type) {
            case PileTiles.Type.Line_H:
                {
                    this.pileLineH(info);
                    break;
                }
            case PileTiles.Type.Line_V:
                {
                    this.pileLineV(info);
                    break;
                }
            case PileTiles.Type.Line_2_H:
                {
                    this.pileLine2H(info);
                    break;
                }
            case PileTiles.Type.Line_2_V:
                {
                    this.pileLine2V(info);
                    break;
                }
            case PileTiles.Type.Pile_H:
                {
                    this.pileH(info);
                    break;
                }
            case PileTiles.Type.Pile_V:
                {
                    this.pileV(info);
                    break;
                }
            default:
                {
                    break;
                }
        }

    }

    pileLineH(info) {
        let spChildren = info.children || this.children;
        let x = 0;
        if (info.x) {
            x = info.x;
        } else {
            let totalWidth = 0;
            spChildren.forEach((child) => {
                totalWidth += child.width;
                totalWidth += info.space || 0;
            });
            x = -totalWidth / 2;
        }
        info.startX = x;
        spChildren.forEach((child) => {
            child.x = x + child.width / 2;
            x += child.width;
            x += info.space || 0;

            child.y = info.y || 0;
        });
    }

    pileLineV(info) {
        let totalHeight = 0;
        this.children.forEach((child) => {
            totalHeight += child.height;
            totalHeight += info.space || 0;
        })
        let y = -totalHeight / 2;
        this.children.forEach((child) => {
            child.y = y + child.height / 2;
            y += child.height;
            y += info.space || 0;
        })
    }

    pileLine2H(info) {
        const offset = 32;
        const mid = Math.ceil(this.children.length / 2); //理论上应该奇数在下层，偶数在上层，但是这里待摸的牌，看不见，所以可以直接分
        info.y = offset / 2;
        info.children = this.children.slice(0, mid);
        this.pileLineH(info);
        info.x = info.startX;
        info.y = -offset / 2;
        info.children = this.children.slice(mid);
        this.pileLineH(info);
    }

    pileLine2V() {
        let i = 0;
        let space = 0;
        const tileHeight = this.children[0].height;
        const count = Math.ceil(this.children.length / 2);
        const totalHeight = tileHeight * count;
        this.children.forEach((child) => {
            child.y = -totalHeight / 2 + tileHeight / 2 + tileHeight * i + space;
            i++;
            if (i == count) {
                i = 0;
                space = 10;
            }
        });
    }

    pileH(info) {
        if (this.children.length < 3 || this.children.length > 4) {
            console.log('pileH children length is not 3 or 4');
            return;
        }
        let i = 0;
        const tileWidth = this.children[0].width - 6;
        const totalWidth = tileWidth * (this.children.length - 1);
        this.children.forEach((child) => {
            if (this.children.length - 1 == i) {
                child.x = 0;
                child.y = -30; //最后一个在上面，往上移才有堆起来的感觉
            } else {
                child.x = -totalWidth / 2 + tileWidth / 2 + tileWidth * i;
            }
            i++;
        });
    }

    pileV() {
        if (this.children.length < 3 || this.children.length > 4) {
            console.log('pileV children length is not 3 or 4');
            return;
        }
        let i = 0;
        const tileHeight = this.children[0].height;
        const totalHeight = tileHeight * (this.children.length - 1);
        this.children.forEach((child) => {
            if (this.children.length - 1 == i) {
                child.x = 10; //最后一个在上面，往上移才有堆起来的感觉
                child.y = 0;
            } else {
                child.x = -totalHeight / 2 + tileHeight / 2 + tileHeight * i;
            }
            i++;
        });
    }

}

PileTiles.Type = {
    Line_H: 1, //水平布局, 上下两家手上的牌
    Line_V: 2, //垂直布局, 左右两家手上的牌
    Line_2_H: 3, //水平双层布局, 上下两家待摸的牌
    Line_2_V: 4, //垂直双层布局, 左右两家待摸的牌
    Pile_H: 5, //堆, 上一个，下两个或三个, 上下两家的碰, 吃, 杠
    Pile_V: 6, //堆, 上一个，下两个或三个, 左右两家的碰, 吃, 杠
    Rows_H: 7, //出牌布局, 横向
    Rows_V: 8, //出牌布局, 竖向
    Rows_H: 7, //出牌布局, 横向
    Rows_V: 8, //出牌布局, 竖向

    Wall_H: 9
}

export {
    PileTiles
};
