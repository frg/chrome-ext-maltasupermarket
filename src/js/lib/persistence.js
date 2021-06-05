import OptionsSync from "webext-options-sync";
import {settingKeys as sortSettingKeys, order} from "/src/js/features/sort/constants.js";
import {settingKeys as favSettingKeys} from "/src/js/features/favourites/constants.js";

const defaults = {};
defaults[sortSettingKeys.sortOrder] = order.none;
defaults[favSettingKeys.favourites] = [];

const optionsSync = new OptionsSync({
    defaults: defaults,

    // List of functions that are called when the extension is updated
    migrations: [
        // (savedOptions, currentDefaults) => {
        //     // Perhaps it was renamed
        //     if (savedOptions.colour) {
        //         savedOptions.color = savedOptions.colour;
        //         delete savedOptions.colour;
        //     }
        // },

        // Integrated utility that drops any properties that don't appear in the defaults
        OptionsSync.migrations.removeUnused,
    ],
});

const getAsync = async (key) => {
    const settings = await optionsSync.getAll();
    const setting = settings[key];

    console.info("🔰 Settings were fetched as ", setting);

    return setting;
};

const set = (key, value) => {
    let setting = {};
    setting[key] = value;

    optionsSync.set(setting);

    console.info("🔰 Settings were set to", value);
};

export {
    getAsync,
    set
};
