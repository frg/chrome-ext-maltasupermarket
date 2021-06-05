import "arrive";
import mitt from "mitt";

import * as selectors from "../selectors.js";

const event = "onItemsLoaded";
const emitter = mitt();

const haveItemsLoadedAsync = new Promise((resolve) => {
    document
        .arrive(
            selectors.itemsContainer,
            { onceOnly: true, existing: true },
            () => {
                resolve();
            });
});

export const onItemsLoaded = {
    addListener: (callback) => {
        emitter.on(event, callback);
        (async () => {
            await haveItemsLoadedAsync;
            emitter.emit(event);
            emitter.off(event, callback);
        })();
    },
    removeListener: (callback) => {
        emitter.off(event, callback);
    },
};
