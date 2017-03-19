import {
    Constant
} from '../utils/Constant';
import {
    Utils
} from '../utils/Utils';
import {
    BaseStage
} from './BaseStage';
import {
    PileTiles
} from '../component/PileTiles';
import {
    DiscardArea
} from '../component/DiscardArea';
import {
    WallArea
} from '../component/WallArea';
import {
    QueueArea
} from '../component/QueueArea';

const MJ_TILES_JSON = './asset/img/mjtiles.json';

class GameStage extends BaseStage {

    constructor(renderer) {
        super(renderer)
        this.resArray = [MJ_TILES_JSON, Constant.RES.BG_GAME];
        this.getTilesDown = this.getTilesDown.bind(this);
        this.updateTilesDown = this.updateTilesDown.bind(this);
        this.updateTilesRight = this.updateTilesRight.bind(this);
        this.updateTilesUp = this.updateTilesUp.bind(this);
        this.updateTilesLeft = this.updateTilesLeft.bind(this);

        this.loadRes(this.resArray);
    }

    onResLoadFinish() {
        super.onResLoadFinish();

        this.playerID = 0;
        this.sceneData = {
            "tiles": [{
                "playerID": 0,
                "seatID": 0,
                "isBanker": true,
                "holdcards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 2,
                    "rank": 3
                }, {
                    "suit": 3,
                    "rank": 6
                }, {
                    "suit": 3,
                    "rank": 9
                }, {
                    "suit": 1,
                    "rank": 8
                }],
                "discards": [{
                    "suit": 2,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 3
                }, {
                    "suit": 3,
                    "rank": 4
                }],
                "meldcards": [{
                    "type": 1,
                    "tiles": [{
                        "suit": 1,
                        "rank": 4
                    }, {
                        "suit": 1,
                        "rank": 4
                    }, {
                        "suit": 1,
                        "rank": 4
                    }, {
                        "suit": 1,
                        "rank": 4
                    }]
                }, {
                    "type": 2,
                    "tiles": [{
                        "suit": 2,
                        "rank": 7
                    }, {
                        "suit": 2,
                        "rank": 7
                    }, {
                        "suit": 2,
                        "rank": 7
                    }]
                }],
                "wallcards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }]
            }, {
                "playerID": 1,
                "seatID": 1,
                "isBanker": true,
                "holdcards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 2,
                    "rank": 4
                }, {
                    "suit": 1,
                    "rank": 9
                }],
                "discards": [{
                    "suit": 3,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 3
                }, {
                    "suit": 1,
                    "rank": 4
                }],
                "meldcards": [{
                    "suit": 1,
                    "rank": 2
                }],
                "wallcards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }]
            }, {
                "playerID": 2,
                "seatID": 2,
                "isBanker": true,
                "holdcards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }],
                "discards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 2,
                    "rank": 3
                }, {
                    "suit": 3,
                    "rank": 4
                }],
                "meldcards": [{
                    "suit": 1,
                    "rank": 2
                }],
                "wallcards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }]
            }, {
                "playerID": 3,
                "seatID": 3,
                "isBanker": true,
                "holdcards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }],
                "discards": [{
                    "suit": 1,
                    "rank": 3
                }, {
                    "suit": 3,
                    "rank": 6
                }, {
                    "suit": 2,
                    "rank": 9
                }],
                "meldcards": [{
                    "suit": 1,
                    "rank": 2
                }],
                "wallcards": [{
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }]
            }],
            "countDown": 23
        };

        this.mjTilesTextures = PIXI.loader.resources[MJ_TILES_JSON].textures
        this.updateScene();
        this.show();
    }

    onMouseDown() {}

    updateScene() {
        let sp = Utils.createSprite(Constant.RES.BG_GAME);
        Utils.fillbg(sp, this.renderer)
        Utils.center(sp, this.renderer)
        this.stage.addChild(sp);

        this.setMySeatID();
        const sceneData = this.sceneData;
        for (var i = 0; i < sceneData.tiles.length; i++) {
            const tiles = sceneData.tiles[i];
            const updateFunc = this.getSuitableUpdateFunc(tiles.seatID, this.seatID)
            if (updateFunc) {
                const container = updateFunc(tiles)
                if (container) {
                    this.stage.addChild(container);
                }
            }
        }
    }

    getSuitableUpdateFunc(seatID, mySeatID) {
        const i = (seatID + 4 - mySeatID) % 4;
        let f = null;
        if (0 == i) {
            //f = this.getTilesDown;
            f = this.updateTilesDown;
        } else if (1 == i) {
            f = this.updateTilesRight;
        } else if (2 == i) {
            f = this.updateTilesUp;
        } else if (3 == i) {
            f = this.updateTilesLeft;
        } else {
            console.log("can't get suitable update function");
        }

        return f;
    }

    updateTilesDown(tiles) {
        let x = this.winSize.width / 2;
        let y = this.winSize.height / 2 + 200;
        const c = new PIXI.Container();
        // c.addChild(this.updateDiscardAreaDown(tiles.discards));
        // c.addChild(this.updateWallcardAreaDown(tiles.wallcards));
        c.addChild(this.updateHoldcardAreaDown(tiles.holdcards));
        c.position.set(x, y);

        return c;
    }
    updateTilesRight(tiles) {
        const c = new PIXI.Container();
        // c.addChild(this.updateDiscardAreaRight(tiles.discards));
        // c.addChild(this.updateWallcardAreaRight(tiles.wallcards));
        c.addChild(this.updateHoldcardAreaRight(tiles.holdcards));
        c.position.set(this.winSize.width / 2 + 200, this.winSize.height / 2);
        return c;
    }
    updateTilesUp(tiles) {
        const c = new PIXI.Container();
        // c.addChild(this.updateDiscardAreaUp(tiles.discards));
        // c.addChild(this.updateWallcardAreaUp(tiles.wallcards));
        c.addChild(this.updateHoldcardAreaUp(tiles.holdcards));
        c.position.set(this.winSize.width / 2, this.winSize.height / 2 - 200);
        return c;
    }
    updateTilesLeft(tiles) {
        const c = new PIXI.Container();
        // c.addChild(this.updateDiscardAreaLeft(tiles.discards));
        // c.addChild(this.updateWallcardAreaLeft(tiles.wallcards));
        c.addChild(this.updateHoldcardAreaLeft(tiles.holdcards));
        c.position.set(this.winSize.width / 2 - 200, this.winSize.height / 2);
        return c;
    }

    updateDiscardAreaDown(tiles) {
        const c = new DiscardArea();
        const tileInfo = {};
        tileInfo.showFace = true;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Down;
        tiles.forEach((tile) => {
            tileInfo.suit = tile.suit;
            tileInfo.rank = tile.rank;
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -7,
            intervalY: -34,
            width: 500,
            direction: 'down'
        });

        return c;
    }
    updateDiscardAreaRight(tiles) {
        const c = new DiscardArea();
        const tileInfo = {};
        tileInfo.showFace = true;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Right;
        tiles.forEach((tile) => {
            tileInfo.suit = tile.suit;
            tileInfo.rank = tile.rank;
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -7,
            intervalY: -36,
            height: 500,
            direction: 'right'
        });
        return c;
    }
    updateDiscardAreaUp(tiles) {
        const c = new DiscardArea();
        const tileInfo = {};
        tileInfo.showFace = true;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Up;
        tiles.forEach((tile) => {
            tileInfo.suit = tile.suit;
            tileInfo.rank = tile.rank;
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -7,
            intervalY: -34,
            width: 500,
            direction: 'up'
        });
        return c;
    }
    updateDiscardAreaLeft(tiles) {
        const c = new DiscardArea();
        const tileInfo = {};
        tileInfo.showFace = true;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Left;
        tiles.forEach((tile) => {
            tileInfo.suit = tile.suit;
            tileInfo.rank = tile.rank;
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -7,
            intervalY: -36,
            height: 500,
            direction: 'left'
        });
        return c;
    }

    updateWallcardAreaDown(tiles) {
        const c = new WallArea();
        const tileInfo = {};
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Down;
        tiles.forEach((tile) => {
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -6,
            intervalY: 30,
            width: 500,
            direction: 'down'
        });

        return c;
    }
    updateWallcardAreaRight(tiles) {
        const c = new WallArea();
        const tileInfo = {};
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Right;
        tiles.forEach((tile) => {
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: 0,
            intervalY: -34,
            height: 500,
            direction: 'right'
        });

        return c;
    }
    updateWallcardAreaUp(tiles) {
        const c = new WallArea();
        const tileInfo = {};
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Up;
        tiles.forEach((tile) => {
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -6,
            intervalY: 34,
            width: 500,
            direction: 'up'
        });
        return c;
    }
    updateWallcardAreaLeft(tiles) {
        const c = new WallArea();
        const tileInfo = {};
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Left;
        tiles.forEach((tile) => {
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -7,
            intervalY: -34,
            height: 500,
            direction: 'left'
        });
        return c;
    }

    updateHoldcardAreaDown(tiles) {
        const c = new QueueArea();
        const tileInfo = {};
        tileInfo.showFace = true;
        tileInfo.tileDir = GameStage.TileDir.Vertical;
        tileInfo.locationDir = GameStage.SeatDirection.Down;
        tiles.forEach((tile) => {
            tileInfo.suit = tile.suit;
            tileInfo.rank = tile.rank;
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -6,
            direction: 'down'
        });

        return c;
    }
    updateHoldcardAreaRight(tiles) {
        const c = new QueueArea();
        const tileInfo = {};
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Vertical;
        tileInfo.locationDir = GameStage.SeatDirection.Right;
        tiles.forEach((tile) => {
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalY: -74,
            direction: 'right'
        });

        this.showNodeInfo(c, 'right:')

        return c;
    }
    updateHoldcardAreaUp(tiles) {
        const c = new QueueArea();
        const tileInfo = {};
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Vertical;
        tileInfo.locationDir = GameStage.SeatDirection.Up;
        tiles.forEach((tile) => {
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalX: -6,
            direction: 'up'
        });
        return c;
    }
    updateHoldcardAreaLeft(tiles) {
        const c = new QueueArea();
        const tileInfo = {};
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Vertical;
        tileInfo.locationDir = GameStage.SeatDirection.Left;
        tiles.forEach((tile) => {
            c.addChild(this.getTileSprite(tileInfo));
        });
        c.layout({
            intervalY: -74,
            direction: 'left'
        });
        return c;
    }



    showNodeInfo(node, s) {
        if (null == s) {
            s = 'unknow:'
        }
        console.log(`${s}:${node.x},${node.y},${node.width},${node.height}`)
    }

    getMeldCardsDown(meldcards) {
        const container = new PileTiles();

        meldcards.forEach((meld) => {
            container.addChild(this.getMeldTilesDown(meld.tiles));
        })
        container.pile(PileTiles.Type.Line_H);

        return container;
    }

    getMeldTilesDown(cards) {
        if (cards.length < 1) {
            return;
        }
        const scaleFactor = 0.1;
        const tilesContainer = new PileTiles();
        const tileInfo = {};
        // tileInfo.scale = scaleFactor;
        tileInfo.showFace = true;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Down;
        cards.forEach((card) => {
            tileInfo.suit = card.suit;
            tileInfo.rank = card.rank;
            tilesContainer.addChild(this.getTileSprite(tileInfo));
        })
        tilesContainer.pile(PileTiles.Type.Pile_H);

        return tilesContainer;
    }

    getWallTilesDown(cards) {
        if (cards.length < 1) {
            return;
        }
        const scaleFactor = 0.1;
        const tilesContainer = new PileTiles();
        const tileInfo = {};
        // tileInfo.scale = scaleFactor;
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Down;
        cards.forEach((card) => {
            tilesContainer.addChild(this.getTileSprite(tileInfo));
        })
        tilesContainer.pile(PileTiles.Type.Line_2_H, {
            space: -5,
            x: -500
        });

        return tilesContainer;
    }

    getDiscardTilesDown(tiles) {
        if (cards.length < 1) {
            return;
        }
        const scaleFactor = 0.1;
        const container = new PileTiles();
        const tileInfo = {};
        // tileInfo.scale = scaleFactor;
        tileInfo.showFace = false;
        tileInfo.tileDir = GameStage.TileDir.Horizontal;
        tileInfo.locationDir = GameStage.SeatDirection.Down;
        cards.forEach((card) => {
            container.addChild(this.getTileSprite(tileInfo));
        })
        container.pile(PileTiles.Type.Line_2_H, {
            space: -5,
            width: 1000
        });

        return container;
    }

    getTilesDown(tiles) {
        const holdContainer = new PileTiles()
        holdContainer.addChild(this.getMeldCardsDown(tiles.meldcards));
        holdContainer.addChild(this.getHandTilesDown(tiles.holdcards));

        holdContainer.pile(PileTiles.Type.Line_H, {
            space: 50
        });

        const wallContainer = this.getWallTilesDown(tiles.wallcards);
        const discardContainer = this.getDiscardTilesDown(tiles.discards);

        const downContainer = new PileTiles();
        downContainer.addChild(discardContainer);
        downContainer.addChild(wallContainer);
        downContainer.addChild(holdContainer);
        downContainer.pile(PileTiles.Type.Line_V, {
            space: 50
        });

        downContainer.x = this.winSize.width / 2;
        downContainer.y = this.winSize.height - 200;

        return downContainer;
    }

    /*
     * Card { int value, int type }
     * 显示下方的所有手牌
     */
    getHandTilesDown(cards) {
        if (null == cards) {
            return;
        }
        if (cards.length < 1) {
            return;
        }
        const scaleFactor = 0.1;
        const holdTiles = new PileTiles();
        const tileInfo = {};
        // tileInfo.scale = scaleFactor;
        tileInfo.showFace = true;
        tileInfo.tileDir = GameStage.TileDir.Vertical;
        tileInfo.locationDir = GameStage.SeatDirection.Down;
        let tileSprite = null;
        cards.forEach((card) => {
            tileInfo.suit = card.suit;
            tileInfo.rank = card.rank;
            tileSprite = this.getTileSprite(tileInfo);
            holdTiles.addChild(tileSprite);
        });
        holdTiles.pile(PileTiles.Type.Line_H, {
            space: -6
        });

        return holdTiles;
    }

    /*
     * @param tile 一张牌的信息 {int value, int type}
     * @param position 牌应该显示的位置
     * @description 显示下方的一张手牌
     *
     */
    getHandTileDown(tile, position, scaleFactor) {
        const resName = this.getTextureNameByTile(tile, GameStage.SeatDirection.Down);
        const sp = new PIXI.Sprite(
            this.textureCache[Constant.RES[resName]].texture
        )
        sp.anchor.set(0.5, 0.5);
        sp.position.set(position.x, position.y);
        sp.scale.set(scaleFactor, scaleFactor);

        return sp;
    }

    /*
    * 取一张牌的 sprite
    *
    * @param tile
    {
        suit: 1, //牌的花色, 1筒的筒
        rank: 2, //牌的值, 2万的2
        locationDir: 2, //牌所在方向
        showFace: true, //牌面是否可见, 自己的牌，所有有已打出的牌，牌面是可见的
        tileDir: 1, //牌本身的方向，坚(立)着，还是横(扣)着的
        x: 0, //设置 sp 的位置 X
        y: 0, //设置 sp 的位置 Y
        scale: 1, //设置 sp 的缩放
    }
    *
    *
    */
    getTileSprite(tileInfo) {
        let resName = 'TILE';

        if (GameStage.SeatDirection.Down == tileInfo.locationDir) {
            resName += '_DOWN';
        } else if (GameStage.SeatDirection.Up == tileInfo.locationDir) {
            resName += '_UP';
        } else if (GameStage.SeatDirection.Right == tileInfo.locationDir) {
            resName += '_RIGHT';
        } else if (GameStage.SeatDirection.Left == tileInfo.locationDir) {
            resName += '_LEFT';
        }

        if (!tileInfo.showFace) {
            resName += '_BACK';
        }
        if (GameStage.TileDir.Horizontal == tileInfo.tileDir) {
            resName += '_H';
        } else if (GameStage.TileDir.Vertical == tileInfo.tileDir) {
            resName += '_V'
        }

        if (tileInfo.showFace) {
            resName += '_';
            resName += tileInfo.rank;
            if (GameStage.CardSuitType.Dot == tileInfo.suit) {
                resName += 'B';
            } else if (GameStage.CardSuitType.Bamboo == tileInfo.suit) {
                resName += 'T';
            } else if (GameStage.CardSuitType.Character == tileInfo.suit) {
                resName += 'W';
            }
        }

        console.log('ResName:' + resName);
        const sp = new PIXI.Sprite(
            this.mjTilesTextures[Constant.RES[resName]]
        )
        sp.anchor.set(0.5, 0.5);
        if (tileInfo.x) {
            sp.position.x = tileInfo.x;
        }
        if (tileInfo.y) {
            sp.position.y = tileInfo.y;
        }
        if (tileInfo.scale) {
            sp.scale.x = tileInfo.scale;
            sp.scale.y = tileInfo.scale;
        }

        return sp;
    }

    /*
     *

    {
        "scene": {
            "cards": [{
                "playerID": 0,
                "isBanker": true,
                "holdcards": [{"suit": 1, "rank": 2}],
                "discards": [{"suit": 1, "rank": 2}],
                "meldcards": [{"suit": 1, "rank": 2}],
                "wallcards": [{"suit": 1, "rank": 2}]
            }, ... ],
            "countDown": 23,

        }
    }
    *
    */


    setMySeatID() {
        const tiles = this.sceneData.tiles;

        for (var i = 0; i < tiles.length; i++) {
            const t = tiles[i];
            if (t.playerID == this.playerID) {
                this.seatID = t.playerID;
            }
        }
    }

    getTextureNameByTile(tile, dir) {
        let name = 'CARD';

        if (GameStage.SeatDirection.Down == dir) {
            name += '_DOWN_';
        } else if (GameStage.SeatDirection.Up == dir) {
            name += '_UP_';
        } else if (GameStage.SeatDirection.Right == dir) {
            name += '_RIGHT_';
        } else if (GameStage.SeatDirection.Left == dir) {
            name += '_LEFT_';
        } else {
            console.log('unknow dir');
        }

        name += tile.rank;
        if (GameStage.CardSuitType.Dot == tile.suit) {
            name += 'B';
        } else if (GameStage.CardSuitType.Bamboo == tile.suit) {
            name += 'T';
        } else if (GameStage.CardSuitType.Character == tile.suit) {
            name += 'W';
        } else {
            name = null;
        }

        return name;
    }

    getSeatDirection(seatID) {
        const i = (seatID + 4 - this.seatID) % 4;
        return i;
    }

}

/*
 * 牌的类型, 筒, 条, 万
 */
GameStage.CardSuitType = {
    Dot: 1,
    Bamboo: 2,
    Character: 3
}

/*
 * 坐位方向: 下 右 上 左
 */
GameStage.SeatDirection = {
    Down: 0,
    Right: 1,
    Up: 2,
    Left: 3
}

/*
 * 组牌类型: 碰, 杠, 吃
 */
GameStage.MeldType = {
    Pong: 1, //碰
    Kong: 2, //杠
    Chow: 3 //吃
}

/*
 * 牌本身的方向: 竖(立), 横(躺)
 */
GameStage.TileDir = {
    Horizontal: 1,
    Vertical: 2
}

export {
    GameStage
}
