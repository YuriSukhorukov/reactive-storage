import {handler, subscribe, unsubscribe} from './watcher';

export default class Storage {
    constructor(data) {
        this._data = new Proxy(data, handler);
        this.subscribe = subscribe(data);
        this.unsubscribe = unsubscribe(data);

        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get () {
                    return this._data[key];
                },
                set (val) {
                    this._data[key] = val;
                }
            })
        });
    }
}