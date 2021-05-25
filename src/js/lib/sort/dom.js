import * as constants from "./constants.js";
import * as selectors from "./dom-selectors.js";
import { setOrderSetting } from "./persistence.js";
import { sortItems } from "./items.js";

const orderToText = (sortOrder) => {
    let text = "";

    switch (sortOrder) {
    case constants.order.desc:
        text = "Price: Highest per Unit first";
        break;
    case constants.order.asc:
        text = "Price: Lowest per Unit first";
        break;
    default:
        text = "";
        break;
    }

    return text;
};

const injectItemsIntoDOM = (items) => {
    // Add sorted items to parent element
    const ul = document.createElement("ul");
    items.forEach(x => {
        ul.prepend(x);
    });

    // Place sorted items in page
    const tabContentEl = document.querySelector(selectors.itemsContainer);
    tabContentEl.querySelector("ul").remove();
    tabContentEl.appendChild(ul);

    console.info("🔰 Sorted items injected into DOM");
};

const setSortOptionsDropdownText = (text) => {
    document
        .querySelector(selectors.sortByDropdownText)
        .textContent = text;
};

const closeSortOptionsDropdown = () => {
    const toggleEl = document.querySelector(selectors.sortByDropdownArrowToggled);
    if (toggleEl !== null) {
        toggleEl.click();
    }
};

const setSortOptionsSelection = (sortOrder) => {
    setOrderSetting(sortOrder);

    const unsortedItems = [...document
        .querySelectorAll(selectors.items)];
    
    const sortedItems = sortItems(unsortedItems, sortOrder);

    injectItemsIntoDOM(sortedItems);

    const text = orderToText(sortOrder);
    setSortOptionsDropdownText(text);
};

const generateSortOptionsEl = (sortOrder) => {
    let li = document.createElement("li");
    let a = document.createElement("a");

    const text = orderToText(sortOrder);
    a.text = text;

    a.href = "#";
    a.className = constants.extensionClass;
    a.onclick = () => {
        setSortOptionsSelection(sortOrder);

        closeSortOptionsDropdown();
    };

    li.appendChild(a);
    return li;
};

export {
    setSortOptionsSelection,
    generateSortOptionsEl
};