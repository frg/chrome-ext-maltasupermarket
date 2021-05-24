/* in-content.js
*
* This file has an example on how to communicate with other parts of the extension through a long lived connection (port) and also through short lived connections (chrome.runtime.sendMessage).
*
* Note that in this scenario the port is open from the popup, but other extensions may open it from the background page or not even have either background.js or popup.js.
* */

import "arrive";

import * as constants from "./lib/constants.js";
import * as selectors from "./lib/dom-selectors.js";
import { getOrderSettingAsync, setOrderSetting } from "./lib/persistence.js";
import { setSortOptionsSelection, generateSortOptionsEl } from "./lib/dom.js";

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
        }
        // Identify if any sort options were clicked
        else if (event.target.matches(selectors.sortByOptionsExceptOurs)) {
            setOrderSetting(constants.order.none);
        }
    }
});

// On page load, load preset sort order
(async () => {
    var setting = await getOrderSettingAsync();

    document
        .arrive(
            selectors.itemsContainer,
            { onceOnly: true, existing: true },
            () => {
                console.info("🔰 Detected items in DOM");

                switch (setting.sortOrder) {
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