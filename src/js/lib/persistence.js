const settingKey = "sortOrder";

const getOrderSettingAsync = () => {
    return new Promise(resolve => {
        try { 
            chrome.storage.sync.get(settingKey, (setting) => {
                console.info("🔰 Settings were fetched as ", setting);
                resolve(setting);
            });
        } catch (e) {
            // Ignore error but log it
            console.error(e);

            // When an extension is updated and the page is not refreshed an "Extension context invalidated." is fired. Until it's fixed we'll go with fire and forget.
            resolve({});
        }
    });
};

const setOrderSetting = (order) => {
    const setting = { };
    setting[settingKey] = order;

    try { 
        chrome.storage.sync.set(setting, () => {
            console.info("🔰 Settings were set to ", setting);
        });
    } catch (e) {
        // Ignore error but log it
        console.error(e);

        // When an extension is updated and the page is not refreshed an "Extension context invalidated." is fired. Until it's fixed we'll go with fire and forget.
    }
};

export {
    getOrderSettingAsync,
    setOrderSetting
};