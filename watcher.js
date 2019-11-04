export const watchers = new Map();

export const handler = {
    get: function(target, name){
        if (name in target) {
            return typeof target[name] === 'function' ? target[name]() : target[name];
        }
        return undefined;
    },
    set(target, prop, value){
        if ((target[prop] !== undefined || target[prop] !== null) &&
            (prop >= 'a' && prop <= 'z')) {
            let oldVal = target[prop];
            let newVal = value;
            target[prop] = value;
            if (watchers.get(target) && watchers.get(target)[prop] && watchers.get(target)[prop].length > 0) {
                watchers.get(target)[prop].forEach(fn => {
                    if (fn instanceof Function) {
                        fn(oldVal, newVal);
                    }
                });
            }
            return true;
        }
        else {
            throw new ReferenceError(prop + ' cannot be set');
        }
    },
};

export const subscribe = (parent) => {
    return (prop, handler)=>{
        if (!watchers.get(parent)) {
            watchers.set(parent, {});
        }
        if (!watchers.get(parent)[prop]) {
            watchers.get(parent)[prop] = [];
        }
        watchers.get(parent)[prop].push(handler);
    };
};

export const unsubscribe = (parent) => {
    return (prop, handler)=>{
        if (watchers.get(parent)[prop]) {
            let index = watchers.get(parent)[prop].indexOf(handler);
            if (index !== -1) {
                watchers.get(parent)[prop].splice(index, 1);
            }
        }
    };
};