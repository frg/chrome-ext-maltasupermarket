import * as constants from "./constants.js";

const generateSortFunc = (sortOrder) => {
    switch (sortOrder) {
        case constants.order.desc:
            return (a, b) => a.value - b.value;
        case constants.order.asc:
        default:
            return (a, b) => b.value - a.value;
    }
};

const sortItems = (items, sortOrder) => {
    let sortFunc = generateSortFunc(sortOrder);

    // Find all items price per unit values
    const sortedItems =
    items
        .map(x => {
            const pricePerUnitEl = x.querySelector(".add-product em");
            const pricePerUnitText = pricePerUnitEl !== null ? pricePerUnitEl.innerHTML : "";
            const pricePerUnitInt = parseFloat(pricePerUnitText.match(/[0-9]*\.[0-9]*/g)[0] ?? 0);

            return {
                value: pricePerUnitInt,
                element: x,
            };
        })
        .sort(sortFunc);

    console.info(`🔰 Found '${sortedItems.length}' items`);

    return sortedItems.map(x => x.element);
};

export {
    sortItems
};
