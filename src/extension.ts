import * as vscode from 'vscode';
import { MLXProvider } from './mlx-provider';

const TRACE_OUTPUT_CHANNEL_NAME = "MLX Provider Trace";
let traceOutputChannel: vscode.OutputChannel | undefined;

let serverManager: ServerManager | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  serverManager = new ServerManager();

  traceOutputChannel ??= vscode.window.createOutputChannel(TRACE_OUTPUT_CHANNEL_NAME);
  traceOutputChannel.appendLine("activate start");

  const provider = new MlxLanguageModelProvider(serverManager, (providerInstance) => {
    return providerInstance.register();
  });
  const providerDisposable = provider.register();

  traceOutputChannel.appendLine("activate ready");

  context.subscriptions.push(providerDisposable);
}

export function deactivate() {
    // Cleanup if needed
}
