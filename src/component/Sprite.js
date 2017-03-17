class Sprite {

    constructor(img) {
        const sp = new PIXI.Sprite(
            PIXI.loader.resources[img].texture
        )
        sp.anchor.set(0.5, 0.5)

        this.sprite = sp

        return sp
    }

    position(x, y) {
        this.sprite.position.set(x, y)
    }
}
