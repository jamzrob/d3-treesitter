import { parseArgs } from "util";
import path from "path";
import { LanguageFactory, type Language } from "./languages";
import  FileReader from "./file";



type Args = {
    dir: string;
    lang: Language;
}

function getArgs(): Args { 
    const { values } = parseArgs({
      args: Bun.argv,
      options: {
        d: {
          type: 'string',
        },
        l: {
            type: 'string',
        }
      },
      allowPositionals: true,
    });
    const dirName = values.d || 'playground';
    const dir = path.resolve(dirName);


    
    const ext = values.l || FileReader.getSubFolderExt(dir);

    const lang = LanguageFactory.new(ext);

    return {
      dir, lang
    };
}

export default getArgs;

