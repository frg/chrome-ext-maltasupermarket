import "arrive";

import * as constants from "./constants.js";
import { setSortOptionsSelection, generateSortOptionsEl } from "./dom.js";
import * as persistence from "/src/js/lib/persistence.js";

const sortByOptionClickedHandler = () => {
    persistence.set(constants.settingKeys.sortOrder, constants.order.none);
};

const sortByDropdownClickedHandler = (event) => {
    console.info("🔰 Sort options dropdown clicked");
    const optionsUl = event.target.parentElement.querySelector(`ul.sbOptions:not(.${constants.extensionClass})`);
    if (optionsUl !== null) {
        console.info("🔰 Detected sort option not injected yet");
        // optionsUl.prepend(generateSortOptionsEl(constants.order.desc));
        optionsUl.prepend(generateSortOptionsEl(constants.order.asc));
        optionsUl.classList.add(constants.extensionClass);
    }
};

const itemsLoadHandler = async () => {
    console.info("🔰 Detected items in DOM");

    var sortOrder = await persistence.getAsync(constants.settingKeys.sortOrder);

    switch (sortOrder) {
        case constants.order.asc:
            setSortOptionsSelection(constants.order.asc);
            break;
        case constants.order.desc:
            setSortOptionsSelection(constants.order.desc);
            break;
        case constants.order.none:
        default:
            break;
    }
};

export {
    sortByDropdownClickedHandler,
    sortByOptionClickedHandler,
    itemsLoadHandler
};
