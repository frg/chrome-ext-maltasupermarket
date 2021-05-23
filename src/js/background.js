/* background.js
 *
 * This file has an example of how to make variables accessible to other scripts of the extension.
 *
 * It also shows how to handle short lived messages from other scripts, in this case, from in-content.js
 *
 * Note that not all extensions need of a background.js file, but extensions that need to persist data after a popup has closed may need of it.
 */

try {
    // A sample object that will be exposed further down and used on popup.js
    const sampleBackgroundGlobal = { // eslint-disable-line no-unused-vars
        message: "This object comes from background.js",
    };

    // Listen to short lived messages from in-content.js
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Perform any ther actions depending on the message
        console.log("background.js - received message from in-content.js:", message);
        // Respond message
        sendResponse("👍");
    });

    // Set active icon when correct domain is active
    chrome.tabs.onActivated.addListener((activeInfo) => {
        console.info("🔰 Detected active tab change");
        chrome.tabs.get(activeInfo.tabId, async (tab) => {
            console.info(`🔰 Active domain: '${tab.url}'`);

            const domain = (new URL(tab.url)).host.split(".")[1];
            console.info(`🔰 Parsed active domain: '${domain}'`);
            
            if (domain === "maltasupermarket") {
                chrome.action.setIcon({path: "/16x16.png"});
            } else {
                chrome.action.setIcon({path: "/grayscale-16x16.png"});
            }
        });
    });
} catch (e) {
    // Without doing this, a failure on registration will give us no useful message
    console.error(e);
}

