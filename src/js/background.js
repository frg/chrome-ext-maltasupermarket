/* background.js
 *
 * This file has an example of how to make variables accessible to other scripts of the extension.
 *
 * It also shows how to handle short lived messages from other scripts, in this case, from in-content.js
 *
 * Note that not all extensions need of a background.js file, but extensions that need to persist data after a popup has closed may need of it.
 */

try {
    // Set active icon when correct domain is active
    chrome.tabs.onActivated.addListener((activeInfo) => {
        console.info("🔰 Detected active tab change");
        
        chrome.tabs.get(activeInfo.tabId, async (tab) => {
            console.info(`🔰 Active domain: '${tab.url}'`);

            const url = new URL(tab.url);
            const domainRegex = new RegExp(/(?:[a-zA-Z0-9]*\.)*([a-zA-Z0-9]+)\.[a-zA-Z0-9]+/, "g");
            const domainMatch = [...(url.host).matchAll(domainRegex)];
            const domain = domainMatch.length === 0 ? url.host : domainMatch[0][1] ?? url.host;

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

