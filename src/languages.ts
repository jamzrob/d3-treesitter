import FileReader from "./file";
class Language {
    private name: string;
    private ext: string;

    constructor(name: string, ext: string) {
        this.name = name;
        this.ext = ext;
    }

    public getNames() {
        return this.name;
    }

    public getExt() {
        return this.ext;
    }

    public isFileSupported(file: string | null): boolean { 
        if (!file) {
            return false;
        }
        const ext = FileReader.getExt(file);
        return this.ext === ext;
    }
}

class Python extends Language {
    constructor() {
        super("Python", "py");
    }
}
class LanguageFactory {
    private static languages = {
        py: Python
    }
    public static new(ext: string) {
        switch (ext) {
            case "py":
                return new Python();
            default:
                throw new Error(`Unsupported language: ${ext}`);
        }
    }

    public static isExtSupported(ext: string) {
        return ext in this.languages;
    }
}

export { Language, LanguageFactory };
