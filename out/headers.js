"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const extensionToCom = {
    "cpp": { start: "/*", end: "*/", line: "//" },
    "c": { start: "/*", end: "*/", line: "//" },
    "h": { start: "/*", end: "*/", line: "//" },
    "hpp": { start: "/*", end: "*/", line: "//" },
    "tpp": { start: "/*", end: "*/", line: "//" },
    "js": { start: "/*", end: "*/", line: "//" },
    "ts": { start: "/*", end: "*/", line: "//" },
    "py": { start: '"""', end: '"""', line: "#" },
    "sh": { start: "", end: "", line: "#" },
    "bash": { start: "", end: "", line: "#" },
    "make": { start: "", end: "", line: "#" },
    "cmake": { start: "", end: "", line: "#" }
};
function formatForHeaderFiles(headerBase, fileName) {
    const className = fileName.split("/").pop()?.split(".")[0] || "";
    const capitalizedClassName = className.charAt(0).toUpperCase() + className.slice(1);
    const templatePath = path.join(__dirname, fileName.endsWith(".hpp") ? 'headerFileTemplate.txt' : 'implFileTemplate.txt');
    const template = fs.readFileSync(templatePath, 'utf-8');
    const templatedHeader = `${extensionToCom["hpp"].start}` +
        headerBase +
        `${extensionToCom["hpp"].end}` +
        template.replace(/%/g, capitalizedClassName);
    return templatedHeader;
}
function formatEachLine(headerBase, commentChar) {
    return headerBase
        .split('\n')
        .map(line => commentChar ? `${commentChar} ${line}` : line)
        .join('\n');
}
function formatHeaderFromFile(fileName, headerBase) {
    const extension = fileName.split(".")[1];
    if (!extension) {
        return formatEachLine(headerBase, "#");
    }
    if (extension === "hpp" || extension === "cpp") {
        return formatForHeaderFiles(headerBase, fileName);
    }
    if (extension === "") {
        return formatEachLine(headerBase, extensionToCom[extension].line);
    }
    return `${extensionToCom[extension].start}${headerBase}${extensionToCom[extension].end}\n`;
}
function getHeader(filename) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const date = `Created on: ${day}/${month}/${year}`;
    const headerBase = `
    ${date}
    Filename: ${filename.split("/").pop()}
    Desription: Add simple description

    ███╗   ███╗███████╗████████╗██████╗  ██████╗ ██╗   ██╗
    ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗██║   ██║
    ██╔████╔██║█████╗     ██║   ██████╔╝██║   ██║██║   ██║
    ██║╚██╔╝██║██╔══╝     ██║   ██╔══██╗██║   ██║╚██╗ ██╔╝
    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝ ╚████╔╝
    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═══╝
`;
    return formatHeaderFromFile(filename, headerBase);
}
function getFileName() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return "";
    }
    return editor.document.uri.fsPath;
}
function generate() {
    const fileName = getFileName();
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return "";
    }
    editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(0, 0), getHeader(fileName));
    });
}
//# sourceMappingURL=headers.js.map