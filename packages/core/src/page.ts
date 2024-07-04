import {ActionContainer} from './action.js';
import {InformationContainer} from './information.js';

export class Page {
    information = new InformationContainer();

    action = new ActionContainer();

    private active = true;

    setActive(active = true) {
        this.active = active;
    }

    isActive() {
        return this.active;
    }

    toContext() {
        return [
            ...this.information.toArray(),
            ...this.action.toArray(),
        ];
    }

    destroy() {
        this.active = false;

        this.information.clear();
        this.action.clear();
    }
}
