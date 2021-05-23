const settingKey = "sortOrder";

const getOrderSettingAsync = () => {
  return new Promise(resolve => {
    chrome.storage.sync.get(settingKey, (setting) => {
      console.info("🔰 Settings were fetched as ", setting);
      resolve(setting);
    });
  });
}

const setOrderSetting = (order) => {
  const setting = { };
  setting[settingKey] = order;

  chrome.storage.sync.set(setting, () => {
    console.info("🔰 Settings were set to ", setting);
  });
}

export {
  getOrderSettingAsync,
  setOrderSetting
}