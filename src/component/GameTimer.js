import {
    Component
} from './Component';

class GameTimer extends Component {

    constructor(entity) {
        super(entity);
        this.seconds = 0;
        this.ticker = 0;
    }

    update(time) {
        this.ticker += time;
        const i = Math.floor(this.ticker / 60);
        if (i > 0) {
            if (this.entity.sceneData.countDown > 0) {
                this.entity.sceneData.countDown--;
            }
            this.seconds += i;
            this.ticker = this.ticker % 60;
        }
    }



}

export {
    GameTimer
};
