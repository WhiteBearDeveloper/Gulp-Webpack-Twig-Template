export default class Core {
    constructor() {
        this.stack = [];
        this.sorted = false;

        this.init();
    }

    init() {
        window.core = this;
    }

    load() {
        this.sort();
        this.stack.forEach((elem, index) => {
            elem.callback.call(this);
        })
    }

    reload(namespace) {
        this.stack.map(stack => {
            if (stack.namespace.includes(namespace)) {
                stack.callback.call(this, namespace);
            }
        });
    }

    add(callback, namespace, order = 0) {
        this.stack.push({callback, namespace, order});
    }

    sort() {
        if (this.sorted) return false;
        this.stack.sort((a, b) => {
            return a.order - b.order;
        });
        this.sorted = true;
    }
}