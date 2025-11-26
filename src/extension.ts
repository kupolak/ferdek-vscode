import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';

let outputChannel: vscode.OutputChannel;
let extensionContext: vscode.ExtensionContext;

export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel('Ferdek');
    extensionContext = context;

    // Register run command
    let runDisposable = vscode.commands.registerCommand('ferdek.runFile', () => {
        runFerdekFile();
    });

    // Register compile command
    let compileDisposable = vscode.commands.registerCommand('ferdek.compileFile', () => {
        compileFerdekFile();
    });

    // Register gif panel command
    let gifDisposable = vscode.commands.registerCommand('ferdek.showGifPanel', () => {
        showGifPanel(context);
    });

    context.subscriptions.push(runDisposable);
    context.subscriptions.push(compileDisposable);
    context.subscriptions.push(gifDisposable);
    context.subscriptions.push(outputChannel);

    // Set up provider for hover information
    context.subscriptions.push(
        vscode.languages.registerHoverProvider('ferdek', new FerdekHoverProvider())
    );

    // Set up provider for code completion
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider('ferdek', new FerdekCompletionProvider(), ' ')
    );
}

function runFerdekFile() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'ferdek') {
        vscode.window.showErrorMessage('Please open a Ferdek file (.ferdek)');
        return;
    }

    const filePath = editor.document.fileName;
    const config = vscode.workspace.getConfiguration('ferdek');
    const executable = config.get<string>('executable', 'ferdek');
    const showOutput = config.get<boolean>('showOutputChannel', true);

    // Show gif panel
    showGifPanel(extensionContext);

    if (showOutput) {
        outputChannel.show();
    }

    outputChannel.clear();
    outputChannel.appendLine(`Running: ${executable} "${filePath}"\n`);

    try {
        const process = cp.spawn(executable, [filePath]);

        let stdout = '';
        let stderr = '';

        process.stdout?.on('data', (data) => {
            stdout += data.toString();
            outputChannel.append(data.toString());
        });

        process.stderr?.on('data', (data) => {
            stderr += data.toString();
            outputChannel.append(data.toString());
        });

        process.on('close', (code) => {
            outputChannel.appendLine(`\n✓ Ferdek program finished with code ${code}`);
            if (code !== 0 && stderr) {
                vscode.window.showErrorMessage(`Ferdek execution failed with code ${code}`);
            }
        });

        process.on('error', (error) => {
            outputChannel.appendLine(`✗ Error: ${error.message}`);
            vscode.window.showErrorMessage(`Failed to run Ferdek: ${error.message}`);
        });
    } catch (error: any) {
        outputChannel.appendLine(`✗ Error: ${error.message}`);
        vscode.window.showErrorMessage(`Failed to run Ferdek: ${error.message}`);
    }
}

function compileFerdekFile() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'ferdek') {
        vscode.window.showErrorMessage('Please open a Ferdek file (.ferdek)');
        return;
    }

    const filePath = editor.document.fileName;
    const config = vscode.workspace.getConfiguration('ferdek');
    const compiler = config.get<string>('compilerExecutable', 'ferdecc');
    const showOutput = config.get<boolean>('showOutputChannel', true);

    if (showOutput) {
        outputChannel.show();
    }

    outputChannel.clear();
    outputChannel.appendLine(`Compiling: ${compiler} "${filePath}"\n`);

    try {
        const process = cp.spawn(compiler, [filePath]);

        let stdout = '';
        let stderr = '';

        process.stdout?.on('data', (data) => {
            stdout += data.toString();
            outputChannel.append(data.toString());
        });

        process.stderr?.on('data', (data) => {
            stderr += data.toString();
            outputChannel.append(data.toString());
        });

        process.on('close', (code) => {
            outputChannel.appendLine(`\n✓ Compilation finished with code ${code}`);
            if (code === 0) {
                vscode.window.showInformationMessage('Ferdek compilation successful!');
            } else {
                vscode.window.showErrorMessage(`Ferdek compilation failed with code ${code}`);
            }
        });

        process.on('error', (error) => {
            outputChannel.appendLine(`✗ Error: ${error.message}`);
            vscode.window.showErrorMessage(`Failed to compile Ferdek: ${error.message}`);
        });
    } catch (error: any) {
        outputChannel.appendLine(`✗ Error: ${error.message}`);
        vscode.window.showErrorMessage(`Failed to compile Ferdek: ${error.message}`);
    }
}

class FerdekHoverProvider implements vscode.HoverProvider {
    provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
        const range = document.getWordRangeAtPosition(position);
        if (!range) {
            return undefined;
        }

        const word = document.getText(range);
        const hover = this.getHoverInfo(word);

        if (hover) {
            return new vscode.Hover(hover);
        }

        return undefined;
    }

    private getHoverInfo(word: string): vscode.MarkdownString | undefined {
        const hoverMap: { [key: string]: string } = {
            'PANIE SENSACJA REWELACJA': 'Print text to output',
            'CYCU PRZYNIEŚ NO': 'Declare a variable',
            'NO JAK NIE JAK TAK': 'If condition',
            'CHLUŚNIEM BO UŚNIEM': 'While loop',
            'ALE WIE PAN JA ZASADNICZO': 'Define a function',
            'USIĄDŹ NA KANAPIE': 'String concatenation',
            'OTWÓRZ KIBEL': 'Open file for reading',
            'SPUŚĆ WODĘ': 'Write to file',
            'WYPOMPUJ': 'Read all lines from file',
            'PIWO I TELEWIZOR': 'Logical AND',
            'ALBO JUTRO U ADWOKATA': 'Logical OR',
        };

        return hoverMap[word] ? new vscode.MarkdownString(hoverMap[word]) : undefined;
    }
}

class FerdekCompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        const completions: vscode.CompletionItem[] = [
            this.createCompletion('PANIE SENSACJA REWELACJA', 'Print statement', vscode.CompletionItemKind.Keyword),
            this.createCompletion('CYCU PRZYNIEŚ NO', 'Variable declaration', vscode.CompletionItemKind.Keyword),
            this.createCompletion('NO JAK NIE JAK TAK', 'If condition', vscode.CompletionItemKind.Keyword),
            this.createCompletion('CHLUŚNIEM BO UŚNIEM', 'While loop', vscode.CompletionItemKind.Keyword),
            this.createCompletion('ALE WIE PAN JA ZASADNICZO', 'Function definition', vscode.CompletionItemKind.Keyword),
            this.createCompletion('W MORDĘ JEŻA', 'Function call', vscode.CompletionItemKind.Keyword),
            this.createCompletion('USIĄDŹ NA KANAPIE', 'String concatenation (KANAPA)', vscode.CompletionItemKind.Function),
            this.createCompletion('OTWÓRZ KIBEL', 'Open file for reading (KIBEL)', vscode.CompletionItemKind.Function),
            this.createCompletion('SPUŚĆ WODĘ', 'Write to file (KIBEL)', vscode.CompletionItemKind.Function),
            this.createCompletion('WYPOMPUJ', 'Read file (KIBEL)', vscode.CompletionItemKind.Function),
            this.createCompletion('ILE MIEJSCA NA KANAPIE', 'String length (KANAPA)', vscode.CompletionItemKind.Function),
            this.createCompletion('PIWO I TELEWIZOR', 'Logical AND', vscode.CompletionItemKind.Keyword),
            this.createCompletion('ALBO JUTRO U ADWOKATA', 'Logical OR', vscode.CompletionItemKind.Keyword),
            this.createCompletion('HELENA MUSZĘ CI COŚ POWIEDZIEĆ', 'Try block', vscode.CompletionItemKind.Keyword),
            this.createCompletion('O KARWASZ TWARZ', 'Throw exception', vscode.CompletionItemKind.Keyword),
        ];

        return completions;
    }

    private createCompletion(label: string, documentation: string, kind: vscode.CompletionItemKind): vscode.CompletionItem {
        const item = new vscode.CompletionItem(label, kind);
        item.documentation = new vscode.MarkdownString(documentation);
        return item;
    }
}

function showGifPanel(context: vscode.ExtensionContext) {
    const editor = vscode.window.activeTextEditor;
    const filePath = editor?.document.fileName || 'unknown';
    
    const panel = vscode.window.createWebviewPanel(
        'ferdekGif',
        'Ferdek Gif',
        vscode.ViewColumn.Two,
        {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'images'))]
        }
    );

    // Get random gif from gifs folder
    const randomGifName = getRandomGif();
    const gifPath = vscode.Uri.file(path.join(context.extensionPath, 'images', 'gifs', randomGifName));
    const gifUri = panel.webview.asWebviewUri(gifPath);

    panel.webview.html = getWebviewContent(gifUri.toString(), filePath);

    // Handle messages from webview
    panel.webview.onDidReceiveMessage(
        message => {
            if (message.command === 'log') {
                panel.webview.postMessage({ command: 'appendOutput', text: message.text });
            }
        },
        undefined,
        context.subscriptions
    );

    // Automatically run the program and send output to webview
    runProgramFromGif(filePath, panel);
}

function getRandomGif(): string {
    // Array of all gif files (1-30)
    const gifs: string[] = [];
    for (let i = 1; i <= 30; i++) {
        gifs.push(`${i}.gif`);
    }
    // Return random gif
    return gifs[Math.floor(Math.random() * gifs.length)];
}

function runProgramFromGif(filePath: string, panel: vscode.WebviewPanel) {
    const config = vscode.workspace.getConfiguration('ferdek');
    const executable = config.get<string>('executable', 'ferdek');

    try {
        const process = cp.spawn(executable, [filePath]);

        process.stdout?.on('data', (data) => {
            const text = data.toString();
            panel.webview.postMessage({ command: 'appendOutput', text: text });
        });

        process.stderr?.on('data', (data) => {
            const text = data.toString();
            panel.webview.postMessage({ command: 'appendOutput', text: text });
        });

        process.on('close', (code) => {
            const finishMessage = `\n✓ Ferdek program finished with code ${code}`;
            panel.webview.postMessage({ command: 'appendOutput', text: finishMessage });
        });

        process.on('error', (error) => {
            const errorMessage = `✗ Error: ${error.message}`;
            panel.webview.postMessage({ command: 'appendOutput', text: errorMessage });
        });
    } catch (error: any) {
        const errorMessage = `✗ Error: ${error.message}`;
        panel.webview.postMessage({ command: 'appendOutput', text: errorMessage });
    }
}

function getWebviewContent(gifUri: string, filePath: string): string {
    return `<!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ferdek Gif</title>
        <style>
            body {
                display: flex;
                flex-direction: column;
                margin: 0;
                background-color: #1e1e1e;
                font-family: 'Consolas', 'Monaco', monospace;
                color: #d4d4d4;
            }
            
            .gif-container {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #444;
            }
            
            img {
                max-width: 100%;
                max-height: 300px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }
            
            .output-container {
                flex: 1;
                overflow: auto;
                padding: 15px;
                background-color: #252526;
                font-size: 13px;
                line-height: 1.4;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
        </style>
    </head>
    <body>
        <div class="gif-container">
            <img src="${gifUri}" alt="Ferdek">
        </div>
        <div class="output-container" id="output">Uruchamianie programu...</div>
        <script>
            const vscode = acquireVsCodeApi();
            const outputDiv = document.getElementById('output');
            
            window.addEventListener('message', event => {
                const message = event.data;
                if (message.command === 'appendOutput') {
                    outputDiv.textContent += message.text;
                    outputDiv.scrollTop = outputDiv.scrollHeight;
                }
            });
        </script>
    </body>
    </html>`;
}

export function deactivate() { }
