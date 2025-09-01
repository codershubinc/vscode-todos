// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class TodosViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'todosView';

	constructor(private readonly _extensionUri: vscode.Uri) {
		console.log("Registering the webview provider +++++++++++++++++++++++++++++++++++++++++++++++++");
	}
	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		console.log("Resolving the webview view +++++++++++++++++++++++++++++++++++++++++++++++++");
		// Show a visible notification so it's obvious when the view is resolved.
		// This is helpful for debugging — the Extension Host log may be missed.
		vscode.window.showInformationMessage('Todos view resolved (resolveWebviewView called)');

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview();
	}

	private _getHtmlForWebview() {
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Todos</title>
				<style>
					body {
						padding: 10px;
						font-family: var(--vscode-font-family);
						color: var(--vscode-foreground);
					}
					h1 {
						color: var(--vscode-foreground);
						margin: 0 0 10px 0;
					}
				</style>
			</head>
			<body>
				<h1>todos</h1>
				<p>Your todos will appear here...</p>
			</body>
			</html>`;
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codershubinc" is now active!');
	console.log("Testing the extension +++++++++++++++++++++++++++++++++++++++++++++++++");

	// Register the webview provider for the Explorer panel
	const provider = new TodosViewProvider(context.extensionUri);
	// console.log("Registering the webview provider +++++++++++++++++++++++++++++++++++++++++++++++++");
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(TodosViewProvider.viewType, provider)
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('codershubinc.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vs todo!');
	});

	const disposable2 = vscode.commands.registerCommand('vs-todo.showTodosWebview', () => {

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() { }
