import "arrive";

import * as constants from "./lib/sort/constants.js";
import * as selectors from "./lib/sort/dom-selectors.js";
import * as persistence from "./lib/persistence.js";
import { setSortOptionsSelection, generateSortOptionsEl } from "./lib/sort/dom.js";

console.info("🔰 Loading");

// If non existent append sort option to dropdown list. This is done through a listener because the element is dynamically generated.
document.addEventListener("click", event => {
    if (event.target) {
        // Identify if the sort options dropdown was clicked
        if (event.target.matches(selectors.sortByDropdownClickables)) {
            console.info("🔰 Sort options dropdown clicked");
            const optionsUl = event.target.parentElement.querySelector(`ul.sbOptions:not(.${constants.extensionClass})`);
            if (optionsUl !== null) {
                console.info("🔰 Detected sort option not injected yet");
                // optionsUl.prepend(generateSortOptionsEl(constants.order.desc));
                optionsUl.prepend(generateSortOptionsEl(constants.order.asc));
                optionsUl.classList.add(constants.extensionClass);
            }
        } else if (event.target.matches(selectors.sortByOptionsExceptOurs)) {
            // Identify if any sort options were clicked
            persistence.set(constants.settingKeys.sortOrder, constants.order.none);
        }
    }
});

// On page load, load preset sort order
(async () => {
    var sortOrder = await persistence.getAsync(constants.settingKeys.sortOrder);

    document
        .arrive(
            selectors.itemsContainer,
            { onceOnly: true, existing: true },
            () => {
                console.info("🔰 Detected items in DOM");

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
            });
})();
