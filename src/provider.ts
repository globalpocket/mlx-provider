import * as vscode from "vscode";

type ProviderServerRuntime = {
  start(): Promise<void>;
  stop(): Promise<void>;
  isRunning(): boolean;
};

type ProviderRegistrationBoundary = (
  provider: MlxLanguageModelProvider
) => vscode.Disposable;

export class MlxLanguageModelProvider {
  private readonly serverRuntime: ProviderServerRuntime;
  private readonly registrationBoundary: (provider: MlxLanguageModelProvider) => vscode.Disposable;

  constructor(
    serverRuntime: ProviderServerRuntime,
    registrationBoundary: (provider: MlxLanguageModelProvider) => vscode.Disposable,
  ) {
    this.serverRuntime = serverRuntime;
    this.registrationBoundary = registrationBoundary;
  }

  register(): vscode.Disposable {
    // 登録境界契約：boundary が返す disposable を返す
    return this.registrationBoundary(this);
  }
}
