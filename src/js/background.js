/* background.js
 *
 * This file has an example of how to make variables accessible to other scripts of the extension.
 *
 * It also shows how to handle short lived messages from other scripts, in this case, from in-content.js
 *
 * Note that not all extensions need of a background.js file, but extensions that need to persist data after a popup has closed may need of it.
 */

// A sample object that will be exposed further down and used on popup.js
const sampleBackgroundGlobal = {
    message: "This object comes from background.js",
};

// Listen to short lived messages from in-content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Perform any ther actions depending on the message
    console.log("background.js - received message from in-content.js:", message);
    // Respond message
    sendResponse("👍");
});

// Make variables accessible from chrome.extension.getBackgroundPage()
window.sampleBackgroundGlobal = sampleBackgroundGlobal;

// Set active icon when correct domain is active
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, async (tab) => {
        const domain = (new URL(tab.url)).host.split(".")[1];
        if (domain === "maltasupermarket") {
            chrome.browserAction.setIcon({path: "/16x16.png"});
        } else {
            chrome.browserAction.setIcon({path: "/grayscale-16x16.png"});
        }
    });
});