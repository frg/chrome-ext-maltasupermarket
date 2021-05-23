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

// Extension port to communicate with the popup, also helps detecting when it closes
let port = null;

// Send messages to the open port (Popup)
const sendPortMessage = data => port.postMessage(data);

// Handle incoming popup messages
const popupMessageHandler = message => console.log("in-content.js - message from popup:", message);

// Start scripts after setting up the connection to popup
chrome.runtime.onConnect.addListener(popupPort => {
    // Listen for popup messages
    popupPort.onMessage.addListener(popupMessageHandler);
    // Set listener for disconnection (aka. popup closed)
    popupPort.onDisconnect.addListener(() => {
        console.log("in-content.js - disconnected from popup");
    });
    // Make popup port accessible to other methods
    port = popupPort;
    // Perform any logic or set listeners
    sendPortMessage("message from in-content.js");
});

// Response handler for short lived messages
const handleBackgroundResponse = response =>
    console.log("in-content.js - Received response:", response);

// Send a message to background.js
chrome.runtime.sendMessage("Message from in-content.js!", handleBackgroundResponse);

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