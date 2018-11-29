const KEY_CODES = {
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    ESC: 27
};

export default class SokobanEventLoop {
    constructor(handlers) {
        this._checkHandlersNotNull(handlers);
        this._checkAllHandlersImplemented(handlers);

        this.handlers = handlers;
    }

    _checkHandlersNotNull(handlers) {
        if(!handlers) throw new Error("You have to pass handlers");
    }

    _checkAllHandlersImplemented(handlers) {
        const mustHaveHandlers = ['left', 'up', 'right', 'down', 'exit'];

        for(let handler of mustHaveHandlers)
            if(! (handler in handlers))
                throw new Error(`"${handler}" handler isn't implemented!`);
    }

    start() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    stop() {
        document.removeEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(e) {
        switch(e.keyCode) {
            case KEY_CODES.ARROW_LEFT:
                this.handlers.left(); return true;

            case KEY_CODES.ARROW_UP:
                this.handlers.up(); return true;

            case KEY_CODES.ARROW_RIGHT:
                this.handlers.right(); return true;

            case KEY_CODES.ARROW_DOWN:
                this.handlers.down(); return true;

            case KEY_CODES.ESC:
                this.handlers.exit(); return true;

            default:
                return false;
        }
    }
}