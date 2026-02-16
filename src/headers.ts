import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const extensionToCom: Record<string, { start: string, end: string, line: string }> = {
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
}

function formatForHeaderFiles(headerBase: string, fileName: string) {

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

function formatEachLine(headerBase: string, commentChar: string) {
    return headerBase
        .split('\n')
        .map(line => commentChar ? `${commentChar} ${line}` : line)
        .join('\n');
}

function formatHeaderFromFile(fileName: string, headerBase: string) {
    const extension = fileName.split(".")[1]

    if (!extension) {
        return formatEachLine(headerBase, "#")
    }
    if (extension === "hpp" || extension === "cpp") {
        return formatForHeaderFiles(headerBase, fileName)
    }
    if (extension === "") {
        return formatEachLine(headerBase, extensionToCom[extension].line)
    }
    return `${extensionToCom[extension].start}${headerBase}${extensionToCom[extension].end}\n`
}

function getHeader(filename: string) {

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
`
    return formatHeaderFromFile(filename, headerBase);
}

function getFileName() {
    const editor = vscode.window.activeTextEditor

    if (!editor) {
        return "";
    }

    return editor.document.uri.fsPath
}

export function generate() {
    const fileName = getFileName()
    const editor = vscode.window.activeTextEditor

    if (!editor) {
        return "";
    }

    editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(0, 0), getHeader(fileName));
    });
}
