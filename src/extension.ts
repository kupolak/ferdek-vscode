import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';

let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel('Ferdek');

    // Register run command
    let runDisposable = vscode.commands.registerCommand('ferdek.runFile', () => {
        runFerdekFile();
    });

    // Register compile command
    let compileDisposable = vscode.commands.registerCommand('ferdek.compileFile', () => {
        compileFerdekFile();
    });

    // Register build and run command
    let buildAndRunDisposable = vscode.commands.registerCommand('ferdek.buildAndRun', () => {
        buildAndRunFerdekFile();
    });

    context.subscriptions.push(runDisposable);
    context.subscriptions.push(compileDisposable);
    context.subscriptions.push(buildAndRunDisposable);
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

function buildAndRunFerdekFile() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'ferdek') {
        vscode.window.showErrorMessage('Please open a Ferdek file (.ferdek)');
        return;
    }

    const filePath = editor.document.fileName;
    const config = vscode.workspace.getConfiguration('ferdek');
    const executable = config.get<string>('executable', 'ferdek');
    const showOutput = config.get<boolean>('showOutputChannel', true);

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
            outputChannel.appendLine(`\n✓ Program finished with code ${code}`);
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

export function deactivate() { }
