import { setIconOnDomain } from "./lib/icon/icon.js";
import { onTabURLChange } from "./lib/listeners.js";

onTabURLChange.addListener(setIconOnDomain);
