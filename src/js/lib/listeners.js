let currentUrl = null;
const hasUrlChanged = (url) => {
    if (currentUrl !== url) {
        console.info(`🔰 Detected url change '${url}'`);
        currentUrl = url;
        return true;
    }

    return false;
};

const onTabActivated = (activeInfo) => {
    console.info("🔰 Tab onActivated fired");
    chrome.tabs.get(activeInfo.tabId, async (tab) => {
        if (hasUrlChanged(tab.url)) {
            listeners.forEach(x => x(tab.url));
        }
    });
};

const onTabUpdated = (tabId, changeInfo) => {
    console.info(`🔰 Tab onUpdated fired. Url: '${changeInfo.url}'`);
    if (changeInfo.url !== undefined) { // undefined when url did not change
        if (hasUrlChanged(changeInfo.url)) {
            listeners.forEach(x => x(changeInfo.url));
        }
    }
};

const addListeners = () => {
    try {    
        console.info("🔰 Initialising on onTabURLChange listeners");

        chrome.tabs.onActivated.addListener(onTabActivated);

        chrome.tabs.onUpdated.addListener(onTabUpdated);
    } catch (e) {
        // Without doing this, a failure on registration will give us no useful message
        console.error(e);
    }
};

const removeListeners = () => {
    try {
        chrome.tabs.onActivated.removeListener(onTabActivated);

        chrome.tabs.onUpdated.removeListener(onTabUpdated);
    } catch (e) {
        // Without doing this, a failure on registration will give us no useful message
        console.error(e);
    }
};

let listeners = [];
const onTabURLChange = {};
onTabURLChange.addListener = (listener) => {
    if (listeners.length === 0) {
        addListeners();
    }

    listeners.push(listener);
};

onTabURLChange.removeListener = (listener) => {
    listeners = listeners.filter(x => x !== listener);

    if (listeners.length === 0) {
        removeListeners();
    }
};

export {
    onTabURLChange
};
