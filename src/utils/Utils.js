import * as PIXI from 'pixi.js';

class Utils {
    static createSprite(img) {
        const sp = new PIXI.Sprite(
            PIXI.loader.resources[img].texture
        )
        sp.anchor.set(0.5, 0.5)

        return sp
    }

    static fillbg(sp, renderer) {
        const wRadio = sp.width / renderer.width
        const hRadio = sp.height / renderer.height
        let scale = 1
        if (wRadio > hRadio) {
            scale = 1 / hRadio;
        } else {
            scale = 1 / wRadio;
        }
        sp.scale.set(scale, scale)
    }

    static center(sp, renderer) {
        sp.position.set(renderer.width / 2, renderer.height / 2)
    }

    static getRect(sp) {
        return {
            x: sp.position.x - sp.anchor.x * sp.width,
            y: sp.position.y - sp.anchor.y * sp.height,
            width: sp.width,
            height: sp.height
        }
    }

    static touchInSprite(position, sp) {
        const r = Utils.getRect(sp)
        if (position.x > r.x && position.x < (r.x + r.width) && position.y > r.y && position.y < (r.y + r.height)) {
            return true;
        } else {
            return false;
        }
    }
}

export {
    Utils
}
