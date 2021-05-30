import { setIconOnDomain } from "/src/js/features/icon/handlers.js";
import { onTabURLChange } from "/src/js/lib/events/onTabURLChange.js";

onTabURLChange.addListener(setIconOnDomain);
