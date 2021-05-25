// Set active icon when correct domain is navigated
const setIconOnDomain = (url) => {
    const parsedUrl = new URL(url);
    const domainRegex = new RegExp(/(?:[a-zA-Z0-9]*\.)*([a-zA-Z0-9]+)\.[a-zA-Z0-9]+/, "g");
    const domainMatch = [...(parsedUrl.host).matchAll(domainRegex)];
    const domain = domainMatch.length === 0 ? parsedUrl.host : domainMatch[0][1] ?? parsedUrl.host;

    console.info(`🔰 Parsed active domain: '${domain}'`);
        
    if (domain === "maltasupermarket") {
        chrome.action.setIcon({path: "/16x16.png"});
    } else {
        chrome.action.setIcon({path: "/grayscale-16x16.png"});
    }
};

export {
    setIconOnDomain
};