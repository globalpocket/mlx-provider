import * as vscode from 'vscode';
import { MLXProvider } from './mlx-provider';

export function activate(context: vscode.ExtensionContext) {
    const provider = new MLXProvider();
    
    // Register the command
    const disposable = vscode.commands.registerCommand('mlx-provider.outputChannel', () => {
        provider.outputChannelTraceBoundary();
    });
    
    context.subscriptions.push(disposable);
    
    // Activate the provider
    provider.activate();
    
    vscode.window.showInformationMessage('MLX Provider activated');
}

export function deactivate() {
    // Cleanup if needed
}
