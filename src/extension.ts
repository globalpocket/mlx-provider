import * as vscode from "vscode";
import { MlxLanguageModelProvider } from "./provider";
import { ServerManager } from "./serverManager";

const TRACE_OUTPUT_CHANNEL_NAME = "MLX Provider Trace";
let traceOutputChannel: vscode.OutputChannel | undefined;

let serverManager: ServerManager | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  serverManager = new ServerManager();

  traceOutputChannel ??= vscode.window.createOutputChannel(TRACE_OUTPUT_CHANNEL_NAME);

  const provider = new MlxLanguageModelProvider(serverManager, (providerInstance) => {
    return providerInstance.register();
  });
  const providerDisposable = provider.register();

  context.subscriptions.push(providerDisposable);
}

export async function deactivate(): Promise<void> {
  if (serverManager) {
    await serverManager.stop();
    serverManager = undefined;
  }
}
