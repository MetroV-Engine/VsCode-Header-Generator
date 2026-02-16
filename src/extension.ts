import * as vscode from 'vscode';
import { generate } from './headers'

export function activate(context: vscode.ExtensionContext) {

	const header = vscode.commands.registerCommand("metrov-headers.generate", () => {
		generate()
	})

	context.subscriptions.push(header)
}

export function deactivate() {}
