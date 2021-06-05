// import {on, off, fire} from "delegated-events";

import * as persistence from "/src/js/lib/persistence.js";
import * as selectors from "./selectors.js";
import * as constants from "./constants.js";
import {
    compileItemTemplate,
    stringToHTML
} from "./templates.js";

console.info("🔰 Loading favourites");

// const imgsEl = document.querySelector(".imgs");
// const imgsElClickCallbacks = window.getEventListeners(imgsEl).click;
// on("click", `.itemli.${constants.extensionClass}`, (event) => {
//     const manipulatedEvent = event;
//     manipulatedEvent.target = event.target.querySelector("img");
//     imgsElClickCallbacks.forEach(x => {
//         x(manipulatedEvent);
//     });
// });

(async () => {
    const favourites = await persistence
        .getAsync(constants.settingKeys.favourites);

    const liStr = favourites
        .map(compileItemTemplate)
        .reduce((a, b) => a + b);
    const ul = stringToHTML(`<ul>${liStr}</ul>`);

    const container = document.querySelector(".tab_container .tab_content");
    container.querySelector("ul").remove();
    container.appendChild(ul);
})();

const onFavourite = (itemCode, itemName) => {
    (async () => {
        const favourites = await persistence
            .getAsync(constants.settingKeys.favourites);

        const found = favourites.find(x => x.id === itemCode);
        if (found !== undefined) {
            console.info(`🔰 Removed favourite with id '${itemCode}'`);
            const newFavourites = favourites
                .filter(x => x.id !== itemCode);

            persistence.set(
                constants.settingKeys.favourites,
                newFavourites);
        } else {
            console.info(`🔰 Added favourite with id '${itemCode}'`);
            const newFavourites = [
                ...favourites,
                {id: itemCode, name: itemName},
            ];

            persistence.set(
                constants.settingKeys.favourites,
                newFavourites
            );
        }
    })();
};

let el = document.createElement("div");
el.className = constants.extensionClass;
el.innerHTML = "🤍";
el.style = "cursor: pointer; position: absolute; top: 2px; right: 4px; font-size: 1.6em; user-select: none;";
el.onclick = (event) => {
    const container = event.target.closest(selectors.items);

    onFavourite(
        container
            .querySelector("[data-itemcode]")
            .getAttribute("data-itemcode"),
        container
            .querySelector("[data-itemname]")
            .getAttribute("data-itemname")
    );

    if (el.innerHTML === "🤍") {
        el.innerHTML = "💙";
    } else {
        el.innerHTML = "🤍";
    }
};

on("mouseenter", selectors.items, (event) => {
    if (event.target.matches(selectors.items)) {
        console.log("mouseenter", event);

        const itemCode = event.target
            .querySelector("[data-itemcode]")
            .getAttribute("data-itemcode");

        (async () => {
            const favourites = await persistence
                .getAsync(constants.settingKeys.favourites);

            const found = favourites.find(x => x.id === itemCode);
            if (found !== undefined) {
                el.innerHTML = "💙";
            } else {
                el.innerHTML = "🤍";
            }

            event.target.appendChild(el);
        })();
    }
}, {capture: true});

on("mouseleave", selectors.items, (event) => {
    if (event.target.matches(selectors.items)) {
        console.log("mouseleave", event);
        el.remove();
    }
}, {capture: true});
