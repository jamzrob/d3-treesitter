
import Parser from 'web-tree-sitter';
import { readFileSync } from 'fs';
import FileReader from './file';
import { Language } from './languages';


class TreeSitter {
    private lang: Language;
    private wasmFile: Buffer;
    private parser?: Parser;

    constructor(lang: Language) {
        this.lang = lang;
        const reader = new FileReader(`../lib/tree-sitter-${lang.name}.wasm`);
        reader.init();
        this.wasmFile = reader.getBuffer();
    }

    public async init() {
        await Parser.init();
        const parser = new Parser();
        const lang = await Parser.Language.load(this.wasmFile);
        parser.setLanguage(lang);
        this.parser = parser;
    }

    public async getTree(text: string) {
        if (!this.parser) {
            throw new Error('Parser not initialized');
        }
        return this.parser.parse(text);
    }

    public async print(text: string) {
        const tree = await this.getTree(text);
        console.log(tree.rootNode.toString());
    }

    public async printFirstChild(text: string) {
        const tree = await this.getTree(text);
        if (!tree.rootNode.childCount) {
            return;
        }
        const child = tree.rootNode?.child(0)?.firstChild; 
        console.log(child);
    }

    public async printChildren(text: string) {
        const tree = await this.getTree(text);

        if (!tree.rootNode.childCount) {
            return;
        }
        const children = tree.rootNode.children;
        const queue = [...children];
        while (queue.length) {
            const node = queue.shift() as Parser.SyntaxNode;
            console.log(node.type);
            if (node.childCount) {
                queue.push(...node.children);
            }
        }
    }



}

export default TreeSitter;


