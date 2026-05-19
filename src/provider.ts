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
  private readonly registrationBoundary: ProviderRegistrationBoundary;

  constructor(
    serverRuntime: ProviderServerRuntime,
    registrationBoundary: ProviderRegistrationBoundary
  ) {
    this.serverRuntime = serverRuntime;
    this.registrationBoundary = registrationBoundary;
  }

  register(): vscode.Disposable {
    return this.registrationBoundary(this);
  }
}
