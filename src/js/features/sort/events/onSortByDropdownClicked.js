import mitt from "mitt";
import {on, off} from "delegated-events";

import * as selectors from "../dom-selectors.js";

const eventName = "onSortByDropdownClicked";
const emitter = mitt();

const handler = (event) => {
    emitter.emit(eventName, event);
};

const addListener = () => {
    on("click", selectors.sortByDropdownClickables, handler);
};

const removeListener = () => {
    off("click", selectors.sortByDropdownClickables, handler);
};

export const onSortByDropdownClicked = {
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
