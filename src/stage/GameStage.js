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
import {
    PileArea
} from '../component/PileArea';
import {
    GameTimer
} from '../component/GameTimer';
import {
    App
} from '../App';
import {
    Net
} from '../service/Net';

const MJ_TILES_JSON = './asset/img/mjtiles.json';
const MJ_TIMER_NUMBERS_JSON = './asset/img/numbers.json';

class GameStage extends BaseStage {

    constructor(renderer) {
        super(renderer)
        this.resArray = [
            MJ_TILES_JSON,
            MJ_TIMER_NUMBERS_JSON,
            Constant.RES.BG_GAME,
            Constant.RES.USER_HEADER_DEFAULT,
            Constant.RES.USER_HEADER_BG,
            Constant.RES.SUIT_DOT,
            Constant.RES.SUIT_BAMBOO,
            Constant.RES.SUIT_CHARACTER
        ];
        this.getTilesDown = this.getTilesDown.bind(this);
        this.updateTilesDown = this.updateTilesDown.bind(this);
        this.updateTilesRight = this.updateTilesRight.bind(this);
        this.updateTilesUp = this.updateTilesUp.bind(this);
        this.updateTilesLeft = this.updateTilesLeft.bind(this);
        Net.getInstance().onRoom.add(this.onRoomEvent.bind(this));

        this.loadComponents(this);
        this.loadRes(this.resArray);
    }

    onResLoadFinish() {
        super.onResLoadFinish();

        this.playerID = 0;
        /*
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
                }, {
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
                }, {
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
                }, {
                    "suit": 2,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 3
                }, {
                    "suit": 3,
                    "rank": 4
                }, {
                    "suit": 3,
                    "rank": 4
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
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
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
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 2,
                    "rank": 4
                }, {
                    "suit": 1,
                    "rank": 9
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 2,
                    "rank": 4
                }, {
                    "suit": 1,
                    "rank": 9
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 2,
                    "rank": 4
                }, {
                    "suit": 1,
                    "rank": 9
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 2,
                    "rank": 4
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
                }, {
                    "suit": 2,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 3
                }, {
                    "suit": 3,
                    "rank": 4
                }, {
                    "suit": 2,
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
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 2
                }, {
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
                }, {
                    "suit": 2,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 3
                }, {
                    "suit": 3,
                    "rank": 4
                }, {
                    "suit": 2,
                    "rank": 2
                }],
                "meldcards": [{
                    "type": 1,
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
                }, {
                    "suit": 2,
                    "rank": 2
                }, {
                    "suit": 1,
                    "rank": 3
                }, {
                    "suit": 3,
                    "rank": 4
                }, {
                    "suit": 2,
                    "rank": 2
                }],
                "meldcards": [{
                    "type": 1,
                    "tiles": [{
                        "suit": 3,
                        "rank": 4
                    }, {
                        "suit": 3,
                        "rank": 4
                    }, {
                        "suit": 3,
                        "rank": 4
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
            }],
            "players": [{
                "playerID": 1,
                "nickName": "User1"
            }, {
                "playerID": 2,
                "nickName": "User2"
            }],
            "seatTable": [
                1,
                2,
                3,
                4
            ],
            "countDown": 23
        };
        */

        this.mjTilesTextures = PIXI.loader.resources[MJ_TILES_JSON].textures
        this.updateScene();
    }

    setPlayer(pid, seatTables) {
        this.playerID = pid;
        if ('undefined' == typeof this.sceneData) {
            this.sceneData = {};
        }
        this.sceneData.seatTable = seatTables;
    }

    loadComponents() {
        this.components.push(new GameTimer(this));
    }

    onMouseDown() {
        if (!this.visible) {
            return true;
        }
    }

    update(time) {
        super.update(time);

        this.removeChildren();
        this.updateScene();
    }
    updateScene() {
        if ('undefined' == typeof(this.winSize)) {
            return
        }
        const winSize = this.winSize;

        // background
        let sp = Utils.createSprite(Constant.RES.BG_GAME);
        Utils.fillbg(sp, this.renderer)
        Utils.center(sp, this.renderer)
        this.stage.addChild(sp);
        if ('undefined' == typeof(this.sceneData.phase)) {
            return
        }
        this.setMySeatID();

        //user header
        const users = this.sceneData.users;
        for (let seatID = 0; seatID < users.length; seatID++) {
            const v = (seatID + 4 - this.seatID) % 4;
            const pid = users[seatID];
            if (0 == pid) {
                continue;
            }

            const header = new PIXI.Container();
            const bg = Utils.createSprite(Constant.RES.USER_HEADER_BG);
            const icon = Utils.createSprite(Constant.RES.USER_HEADER_DEFAULT);
            header.addChild(bg);
            header.addChild(icon);

            this.stage.addChild(header);
            if (0 == v) {
                header.position.set(50, winSize.height - 50);
                icon.rotation = 0;
            } else if (1 == v) {
                header.position.set(winSize.width - 50, winSize.height - 50);
                icon.rotation = -Math.PI / 2;
            } else if (2 == v) {
                header.position.set(winSize.width - 50, 50);
                icon.rotation = Math.PI;
            } else if (3 == v) {
                header.position.set(50, 50);
                icon.rotation = Math.PI / 2;
            }
        }

        const sceneData = this.sceneData;
        switch (sceneData.phase) {
            case GameStage.Phase.roomPhaseWaiting: // waiting
                {
                    break;
                }
            case GameStage.Phase.roomPhaseShuffle: // shuffle
                {
                    break;
                }
            case GameStage.Phase.roomPhaseDealing: // dealing
                {
                    break;
                }
            case GameStage.Phase.roomPhaseMakeAAbandon: // dealing
                {
                    const tag = 'selectableSuits';
                    let suits = null;
                    this.stage.children.forEach((child) => {
                        if (tag == child.tag) {
                            suits = child;
                        }
                    });
                    if (null == suits) {
                        suits = this.createSuits()
                        suits.position.set(winSize.width / 2, winSize.height - 200);
                        suits.tag = 'selectableSuits';
                        this.stage.addChild(suits);
                    } else {
                        suits.visible = true;
                    }
                    break;
                }
            case GameStage.Phase.roomPhasePlaying: // playing
                {
                    const tiles = sceneData.tiles;
                    for (let i = 0; i < 4; i++) {
                        const updateFunc = this.getSuitableUpdateFunc(i, this.seatID)
                        if (updateFunc) {
                            const container = updateFunc(tiles, i);
                            if (container) {
                                this.stage.addChild(container);
                            }
                        }
                    }
                    break;
                }
            case GameStage.Phase.roomPhaseSettle: // settle
                {
                    break;
                }
            default:
                {
                    console.log('GameStage unknow scene phase');
                    break;
                }
        }

        this.stage.addChild(this.updateTimer(sceneData.countDown));
    }

    createSuits() {
        const c = new PIXI.Container();
        const dot = Utils.createSprite(Constant.RES.SUIT_DOT);
        const bamboo = Utils.createSprite(Constant.RES.SUIT_BAMBOO);
        const character = Utils.createSprite(Constant.RES.SUIT_CHARACTER);

        dot.tag = GameStage.CardSuitType.SUIT_DOT;
        bamboo.tag = GameStage.CardSuitType.SUIT_BAMBOO;
        character.tag = GameStage.CardSuitType.SUIT_CHARACTER;

        dot.position.set(-100, 0);
        character.position.set(100, 0);

        c.addChild(dot);
        c.addChild(bamboo);
        c.addChild(character);

        return c;
    }

    createUserHeader(name) {
        const c = new PIXI.Container();
        const bg = Utils.createSprite(Constant.RES.USER_HEADER_BG);
        const icon = Utils.createSprite(Constant.RES.USER_HEADER_DEFAULT);

        c.addChild(bg);
        c.addChild(icon);

        return c;
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

    updateTilesDown(tiles, i) {
        let x = this.winSize.width / 2;
        let y = this.winSize.height / 2 + 160;

        const c = new QueueArea();
        let area = this.updateDiscardAreaDown(tiles.discardTiles[i]);
        if (null != area) {
            c.addChild(area);
            area.position.set(x, y);
        }
        area = this.updateWallcardAreaDown(tiles.wallTiles[i]);
        y += 100;
        if (null != area) {
            c.addChild(area);
            area.position.set(x, y);
        }

        area = new QueueArea();
        const meldArea = this.updateMeldcardAreaDown(tiles.meldTiles[i]);
        if (null != meldArea) {
            area.addChild(meldArea);
        }
        area.addChild(this.updateHoldcardAreaDown(tiles.holdTiles[i]));
        area.layout({
            intervalX: 40,
            direction: 'down'
        });
        c.addChild(area);
        y = this.winSize.height - 50;
        area.position.set(x, y);
        return c;
    }
    updateTilesRight(tiles, i) {
        let x = this.winSize.width / 2 + 160;
        let y = this.winSize.height / 2;

        const c = new QueueArea();
        let area = this.updateDiscardAreaRight(tiles.discardTiles[i]);
        if (null != area) {
            c.addChild(area);
            area.position.set(x, y);
        }
        area = this.updateWallcardAreaRight(tiles.wallTiles[i]);
        x += 100;
        if (null != area) {
            c.addChild(area);
            area.position.set(x, y);
        }

        area = new QueueArea();
        const meldArea = this.updateMeldcardAreaRight(tiles.meldTiles[i]);
        if (null != meldArea) {
            area.addChild(meldArea);
        }
        area.addChild(this.updateHoldcardAreaRight(tiles.holdTiles[i]));
        area.layout({
            intervalY: 40,
            direction: 'right'
        });
        c.addChild(area);
        x = this.winSize.width - 50;
        area.position.set(x, y);
        return c;
    }
    updateTilesUp(tiles, i) {
        let x = this.winSize.width / 2;
        let y = this.winSize.height / 2 - 160;

        const c = new QueueArea();
        let area = this.updateDiscardAreaUp(tiles.discardTiles[i]);
        if (null != area) {
            c.addChild(area);
            area.position.set(x, y);
        }
        area = this.updateWallcardAreaUp(tiles.wallTiles[i]);
        y -= 100;
        if (null != area) {
            c.addChild(area);
            area.position.set(x, y);
        }

        area = new QueueArea();
        const meldArea = this.updateMeldcardAreaUp(tiles.meldTiles[i]);
        if (null != meldArea) {
            area.addChild(meldArea);
        }
        area.addChild(this.updateHoldcardAreaUp(tiles.holdTiles[i]));
        area.layout({
            intervalX: 40,
            direction: 'up'
        });
        c.addChild(area);
        y = 50;
        area.position.set(x, y);

        return c;
    }
    updateTilesLeft(tiles, i) {
        let x = this.winSize.width / 2 - 160;
        let y = this.winSize.height / 2;

        const c = new QueueArea();
        let area = this.updateDiscardAreaLeft(tiles.discardTiles[i]);
        if (null != area) {
            c.addChild(area);
            area.position.set(x, y);
        }
        area = this.updateWallcardAreaLeft(tiles.wallTiles[i]);
        x -= 100;
        if (null != area) {
            c.addChild(area);
            area.position.set(x, y);
        }

        area = new QueueArea();
        const meldArea = this.updateMeldcardAreaLeft(tiles.meldTiles[i]);
        if (null != meldArea) {
            area.addChild(meldArea);
        }
        area.addChild(this.updateHoldcardAreaLeft(tiles.holdTiles[i]));
        area.layout({
            intervalY: 40,
            direction: 'left'
        });
        c.addChild(area);
        x = 50;
        area.position.set(x, y);

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
            width: 300,
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
            height: 200,
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
            width: 300,
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
            height: 200,
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

        // c.showEdge();
        // this.showNodeInfo(c, 'down:')

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

    updateMeldcardAreaDown(melds) {
        if (null == melds) {
            return;
        }
        const c = new QueueArea();
        melds.forEach((meld) => {
            const area = this.updatePilecardAreaDown(meld.tiles);
            if (null != area) {
                c.addChild(area);
            }
        });
        c.layout({
            intervalX: 10,
            direction: 'down'
        })
        return c;
    }
    updateMeldcardAreaRight(melds) {
        if (null == melds) {
            return;
        }
        const c = new QueueArea();
        melds.forEach((meld) => {
            const area = this.updatePilecardAreaRight(meld.tiles);
            if (null != area) {
                c.addChild(area);
            }
        });
        c.layout({
            intervalX: 10,
            direction: 'right'
        })
        return c;
    }
    updateMeldcardAreaUp(melds) {
        if (null == melds) {
            return;
        }
        const c = new QueueArea();
        melds.forEach((meld) => {
            const area = this.updatePilecardAreaUp(meld.tiles);
            if (null != area) {
                c.addChild(area);
            }
        });
        c.layout({
            intervalX: 10,
            direction: 'up'
        })
        return c;
    }
    updateMeldcardAreaLeft(melds) {
        if (null == melds) {
            return;
        }
        const c = new QueueArea();
        melds.forEach((meld) => {
            const area = this.updatePilecardAreaLeft(meld.tiles);
            if (null != area) {
                c.addChild(area);
            }
        });
        c.layout({
            intervalX: 10,
            direction: 'left'
        })
        return c;
    }
    updatePilecardAreaDown(tiles) {
        if (null == tiles) {
            return;
        }
        const c = new PileArea();
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
            intervalX: -6,
            intervalY: -31,
            direction: 'down'
        });

        return c;
    }
    updatePilecardAreaRight(tiles) {
        if (null == tiles) {
            return;
        }
        const c = new PileArea();
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
            intervalX: -25,
            intervalY: -36,
            direction: 'right'
        });
        return c;
    }
    updatePilecardAreaUp(tiles) {
        if (null == tiles) {
            return;
        }
        const c = new PileArea();
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
            intervalX: -6,
            intervalY: -31,
            direction: 'up'
        });
        return c;
    }
    updatePilecardAreaLeft(tiles) {
        if (null == tiles) {
            return;
        }
        const c = new PileArea();
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
            intervalX: 10,
            intervalY: -36,
            direction: 'left'
        });
        return c;
    }

    updateTimer(seconds) {
        const c = new QueueArea();
        const numbers = new Array();
        while (seconds > 0) {
            numbers.push(seconds % 10);
            seconds = Math.floor(seconds / 10);
        }
        numbers.reverse();
        if (0 == numbers.length) {
            numbers.push(0);
        }

        const textures = PIXI.loader.resources[MJ_TIMER_NUMBERS_JSON].textures
        numbers.forEach((n) => {
            c.addChild(new PIXI.Sprite(textures[`number${n}`]));
        })
        c.layout({
            intervalX: 0,
            direction: 'down'
        })
        c.position.set(this.winSize.width / 2, this.winSize.height / 2);

        return c;
    }

    updateUserHeader() {
        const n = new PIXI.Container();
        const bg = new PIXI.Sprite(
            this.mjTilesTextures[Constant.RES.USER_HEADER_BG]
        );
        const header = new PIXI.Sprite(
            this.mjTilesTextures[Constant.RES.USER_HEADER_DEFAULT]
        );
        n.addChild(bg);
        n.addChild(header);

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

        // console.log('ResName:' + resName);
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
        } else if (Constant.TileScale) {
            sp.scale.x = Constant.TileScale;
            sp.scale.y = Constant.TileScale;
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
        const seatTable = this.sceneData.users;
        const curPlayerID = App.getInstance().getOrCreateCurUser().id;

        let seatDown = false;
        for (var i = 0; i < seatTable.length; i++) {
            if (seatTable[i] == curPlayerID) {
                this.seatID = i;
                seatDown = true;
                break;
            }
        }

        if (!seatDown) {
            console.log('ERROR, user not sit down');
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

    onRoomEvent(resp) {
        const cmds = resp.type.split(':');
        switch (cmds[0]) {
            case 'room':
                {
                    switch (cmds[1]) {
                        case 'users':
                            {
                                if ('undefined' == typeof this.sceneData) {
                                    this.sceneData = {};
                                }
                                this.sceneData.seatTable = resp.users;
                                break;
                            }
                        case 'scene':
                            {
                                this.sceneData = resp
                                break;
                            }
                        default:
                            {
                                console.log('GameStage unknow cmd:' + cmds[1]);
                                break;
                            }
                    }
                    break;
                }
            default:
                {
                    break;
                }
        }
    }

    onMouseDown(evt) {
        if (!this.visible) {
            return true;
        }

        const tag = 'selectableSuits';
        let suits = null;
        this.stage.children.forEach((child) => {
            if (tag == child.tag) {
                suits = child;
            }
        });
        if (Utils.touchInSprite(evt.position, suits)) {
            suits.children.forEach((child) => {
                if (Utils.touchInSprite(evt.position, child)) {
                    switch (child.tag) {
                        case GameStage.CardSuitType.SUIT_DOT:
                            {
                                console.log('touch on dot');
                                break;
                            }
                        case GameStage.CardSuitType.SUIT_BAMBOO:
                            {
                                console.log('touch on bamboo');
                                break;
                            }
                        case GameStage.CardSuitType.SUIT_CHARACTER:
                            {
                                console.log('touch on character');
                                break;
                            }
                        default:
                            {
                                break;
                            }
                    }
                }
            });
        }
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

GameStage.Phase = {
    roomPhaseWaiting: 0,
    roomPhaseShuffle: 1,
    roomPhaseDealing: 2,
    roomPhaseMakeAAbandon: 3,
    roomPhasePlaying: 4,
    roomPhaseSettle: 5
}


export {
    GameStage
}
