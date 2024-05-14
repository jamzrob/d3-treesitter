import { join } from 'path';
import { readFileSync, readdirSync , existsSync} from "fs";

class FileReader {
    private file?: Buffer;
    private path: string;
    private dir: string;

    constructor(name: string, dirpath?: string) {
        // check if dir undefined
        this.dir = dirpath ?? __dirname;
        this.path = join(this.dir, name);
    }

    init() {
        // check if file exists
        if (!this.doesFileExist()) {
            throw new Error("File does not exist");
        }
        this.file = readFileSync(this.path) as Buffer;
    }

    public getText() {
        if (!this.file) {
            throw new Error("File not initialized");
        }
        return this.file.toString();
    }

    public getBuffer() {
        if (!this.file) {
            throw new Error("File not initialized");
        }
        return this.file;
    }


    public doesFileExist() {
        return existsSync(this.path);
    }

    public static getExt(filename: string) {
        const ext = filename.split(".").pop() as string;
        return ext;
    }

    public static getSubFolderExt(dir: string) {
        const files = readdirSync(dir);
        const filename = files.pop();
        if (!filename) {
          throw new Error(`No files in ${dir}, pass in language`);
        }
        const ext = FileReader.getExt(filename);
        return ext;
    }
}

export default FileReader;

