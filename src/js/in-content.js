import { onSortByDropdownClicked } from "/src/js/features/sort/events/onSortByDropdownClicked.js";
import { onSortyByOptionClicked } from "/src/js/features/sort/events/onSortyByOptionClicked.js";
import { onItemsLoaded } from "/src/js/features/sort/events/onItemsLoaded.js";
import {
    sortByDropdownClickedHandler,
    sortByOptionClickedHandler,
    itemsLoadHandler
} from "/src/js/features/sort/handlers.js";

// import "/src/js/features/favourites/favourites.js";

console.info("🔰 Loading");

onSortByDropdownClicked.addListener(sortByDropdownClickedHandler);
onSortyByOptionClicked.addListener(sortByOptionClickedHandler);
onItemsLoaded.addListener(() => (async () => {
    await itemsLoadHandler();
})());
