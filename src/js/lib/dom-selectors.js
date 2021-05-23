import { extensionClass } from "./constants.js";

export const sortByDropdownText = ".product-list .sort_view .sbHolder .sbSelector";
export const sortByDropdownArrow = ".product-list .sort_view .sbHolder .sbToggle";
export const sortByDropdownArrowToggled = `${sortByDropdownArrow}.sbToggleOpen`;
export const sortByDropdownClickables = `${sortByDropdownArrow}, ${sortByDropdownText}`;
export const sortByOptionsExceptOurs = `.product-list .sort_view .sbHolder ul li a:not(.${extensionClass})`;
export const itemsContainer = "#products-grid-master .tab_content";
export const items = `${itemsContainer} ul li.itemli`;