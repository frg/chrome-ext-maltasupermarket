import * as constants from "./constants.js";

const sortItems = (items, sortOrder) => {
    let orderFunc;
    switch (sortOrder) {
    case constants.order.desc:
        orderFunc = (a, b) => a.value - b.value;
        break;
    case constants.order.asc:
    default:
        orderFunc = (a, b) => b.value - a.value;
        break;
    }

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
        .sort(orderFunc);

    console.info(`🔰 Found '${sortedItems.length}' items`);

    return sortedItems.map(x => x.element);
};

export {
    sortItems
};