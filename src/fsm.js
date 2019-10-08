class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw Error();
        this._config = config;
        this._history = [config.initial];
        this._temp = config.states[config.initial];
        this._step = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._history[this._step];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this._config.states[state]) throw Error();

        this._step++;
        this._history[this._step] = state;
        this._temp = this._config.states[state];
        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this._temp.transitions[event]) throw Error();

        this.changeState(this._temp.transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._history = [this._config.initial];
        this._temp = this._config.states[this._config.initial];
        this._step = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this._config.states);
        } else {
            let result = [];

            for (const state in this._config.states) {
                for (const transition in this._config.states[state].transitions) {
                    if (transition === event) {
                        result.push(state);
                    }
                }
            }
            return result;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this._step < 1) return false;

        const state = this._history[this._step - 1];
        this._step -= 2;
        this.changeState(state);

        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this._history.length == this._step + 1) return false;

        const state = this._history[this._step + 1];
        this.changeState(state);

        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        const initial = this._history[this._step];
        this._history = [initial];
        this._step = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
