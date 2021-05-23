export const extensionClass = "mltsprmarket-extension";

export const order = {
    none: 0,
    desc: 100,
    asc: 200,
};

export const orderToText = (sortOrder) => {
    let text = "";

    switch (sortOrder) {
    case order.desc:
        text = "Price: Highest per Unit first";
        break;
    case order.asc:
        text = "Price: Lowest per Unit first";
        break;
    default:
        text = "";
        break;
    }

    return text;
};