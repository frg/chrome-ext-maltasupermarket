import * as constants from "./constants.js";

const generateCacheBuster = () => {
    var d = new Date(),
        month = String(d.getMonth() + 1),
        day = String(d.getDate()),
        year = d.getFullYear();

    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }

    return [year, month, day].join("");
};

const compileItemTemplate = ({id, name}) => `<li class="itemli ${constants.extensionClass}">
<div class="imgs" data-itemcode="${id}" data-itemname="${name}">
   <img src="images/products/main/${id}.jpg?${generateCacheBuster()}" alt="Apples Gala Premium Marlene" style="max-width: 113px; max-height: 149px;">
</div>
<div class="wrap-itemdescription">${name}</div>
</li>`;

const stringToHTML = (str) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
};

export {
    compileItemTemplate,
    stringToHTML
};
