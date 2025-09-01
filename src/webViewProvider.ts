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

export default TodosViewProvider;