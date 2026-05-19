import * as vscode from "vscode";
import { MlxLanguageModelProvider } from "./provider";
import { ServerManager } from "./serverManager";

let serverManager: ServerManager | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  serverManager = new ServerManager();

  const provider = new MlxLanguageModelProvider(serverManager);
  const disposable = provider.register();

  context.subscriptions.push(disposable);
}

export async function deactivate(): Promise<void> {
  if (serverManager) {
    await serverManager.stop();
    serverManager = undefined;
  }
}
