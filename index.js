const dataAPI = {
    _handlers: {},
    onMethod: (thisVue, methodName, callback, options = {}) => {
        if (!thisVue) return console.error('[Data API] thisVue must be a vue instance');
        if (!methodName) return console.error('[Data API] methodName must be a string');
        if (typeof callback !== 'function') return console.error('[Data API] callback must be a function');
        if (!dataAPI._handlers[methodName]) dataAPI._handlers[methodName] = [];

        const defaultOptions = {
            once: false,
            blocked: false,
        }

        options = {
            ...defaultOptions,
            ...options,
        }

        dataAPI._handlers[methodName].push({ thisVue, callback, options });
    },
    callMethod: (methodName, ...args) => {
        if (!dataAPI._handlers[methodName]) return console.warn(`[Data API] No handler for method ${methodName}`);
        let someHandlersBlocked = false;
        dataAPI._handlers[methodName].forEach((handler) => {
            if (handler.options.blocked) return;
            if (!handler.thisVue._mounted) {
                handler.options.blocked = true;
                someHandlersBlocked = true;
                return
            }

            handler.callback(...args);
            if (handler.options.once) {
                handler.options.blocked = true;
                someHandlersBlocked = true;
            }
        });

        if (someHandlersBlocked) dataAPI._handlers[methodName] = dataAPI._handlers[methodName].filter((handler) => !handler.options.blocked);
    },
    offMethodCallback: (methodName, callback) => {
        if (!dataAPI._handlers[methodName]) return console.warn(`[Data API] No handler for method ${methodName}`);
        dataAPI._handlers[methodName] = dataAPI._handlers[methodName].filter((handler) => handler.callback !== callback);
    },
    offMethod: (methodName) => {
        delete dataAPI._handlers[methodName];
    }
}

export default dataAPI;