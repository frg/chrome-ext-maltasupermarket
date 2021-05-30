import mitt from "mitt";
import {on, off} from "delegated-events";

import * as selectors from "../dom-selectors.js";

const eventName = "onSortyByOptionClicked";
const emitter = mitt();

const handler = (event) => {
    emitter.emit(eventName, event);
};

const addListener = () => {
    on("click", selectors.sortByOptionsExceptOurs, handler);
};

const removeListener = () => {
    off("click", selectors.sortByOptionsExceptOurs, handler);
};

export const onSortyByOptionClicked = {
    addListener: (callback) => {
        if (emitter.all.size === 0) {
            addListener();
        }

        emitter.on(eventName, callback);
    },
    removeListener: (callback) => {
        emitter.off(eventName, callback);

        if (emitter.all.size === 0) {
            removeListener();
        }
    },
};
