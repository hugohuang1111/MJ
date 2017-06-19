import * as PIXI from 'pixi.js';

class Utils {

    static setCookie(cname, cvalue, exdays = 365) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            /*
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            */
            c = c.trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

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
        let startPoint = sp.toGlobal(new PIXI.Point(0, 0));
        const anchorX = ('undefined' == typeof sp.anchor || null == sp.anchor) ? 0.5 : sp.anchor.x
        const anchorY = ('undefined' == typeof sp.anchor || null == sp.anchor) ? 0.5 : sp.anchor.y
        return {
            x: startPoint.x - anchorX * sp.width,
            y: startPoint.y - anchorY * sp.height,
            width: sp.width,
            height: sp.height
        }
    }

    static touchInSprite(position, sp) {
        if (!sp) {
            return false;
        }
        const r = Utils.getRect(sp)
        if (position.x > r.x && position.x < (r.x + r.width) && position.y > r.y && position.y < (r.y + r.height)) {
            return true;
        } else {
            return false;
        }
    }

    static cloneSprite(sp) {
        if (!sp) {
            return;
        }
        return new PIXI.Sprite(sp.texture.clone());
    }
}

export {
    Utils
}
