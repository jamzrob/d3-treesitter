import { watch, type PathLike } from "fs";
import FileReader from "./file";
import TreeSitter from "./treesitter";
import { Language } from "./languages";

class Watcher { 
    static async init(dir: PathLike, TS: TreeSitter, lang: Language) {
        const watcher = watch(
          dir,
          { recursive: true },
          async (event, filename) => {
              // get file contents as a string
              if (!filename || !lang.isFileSupported(filename)) {
                  return;
              }
              const reader = new FileReader(filename, dir as string);
              if(!reader.doesFileExist()) {
                  return;
              }


              reader.init();
              const text = reader.getText();
              const tree = await TS.printChildren(text);

          },
        );
        process.on("SIGINT", () => {
          // close watcher when Ctrl-C is pressed
          console.log("Closing watcher...");
          watcher.close();

          process.exit(0);
        });
    }
}

export default Watcher;

