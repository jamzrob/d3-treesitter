import getArgs from "./cli";
import TreeSitter from "./treesitter";
import Watcher from "./watch";

const args = getArgs();
const { dir, lang } = args;
const TS = new TreeSitter(lang);
await TS.init();
await Watcher.init(dir, TS, lang);
