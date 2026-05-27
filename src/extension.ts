import * as vscode from "vscode";
import { MlxLanguageModelProvider } from "./provider";
import { ServerManager } from "./serverManager";

const TRACE_OUTPUT_CHANNEL_NAME = "MLX Provider Trace";
let traceOutputChannel: vscode.OutputChannel | undefined;

let serverManager: ServerManager | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  try {
    serverManager = new ServerManager();

    traceOutputChannel ??= vscode.window.createOutputChannel(TRACE_OUTPUT_CHANNEL_NAME);
    traceOutputChannel.appendLine("activate start");

    const registrationDisposable: vscode.Disposable = {
      dispose: () => {
        // 登録解除のみ。serverManager 参照破棄は deactivate() 側で行う。
      },
    };

    const provider = new MlxLanguageModelProvider(serverManager, () => {
      return registrationDisposable;
    });
    const providerDisposable = provider.register();

    traceOutputChannel.appendLine("activate ready");

    context.subscriptions.push(providerDisposable);
  } catch (error: any) {
    let normalizedError: Error;
    try {
      if (error instanceof Error) {
        normalizedError = error;
      } else {
        normalizedError = new Error(String(error));
      }
      if (traceOutputChannel) {
        traceOutputChannel.appendLine("activate failed");
        // 捕捉元例外 error の種別に基づいてログ値を決定
        if (error instanceof Error) {
          traceOutputChannel.appendLine("error kind: Error");
          traceOutputChannel.appendLine(`error message: ${error.message}`);
          if (error.stack) {
            traceOutputChannel.appendLine(`error stack: ${error.stack}`);
          }
        } else {
          traceOutputChannel.appendLine("error kind: non-error");
          traceOutputChannel.appendLine(`error message: ${String(error)}`);
        }
      } else {
        // 捕捉元例外 error の種別に基づいてログ値を決定
        if (error instanceof Error) {
          console.error(`[activate failed] error kind: Error`);
          console.error(`[activate failed] error message: ${error.message}`);
          if (error.stack) {
            console.error(`[activate failed] error stack: ${error.stack}`);
          }
        } else {
          console.error(`[activate failed] error kind: non-error`);
          console.error(`[activate failed] error message: ${String(error)}`);
        }
      }
    } catch (secondaryError) {
      if (secondaryError instanceof Error && secondaryError.stack) {
        console.error(
          `[activate failed] Secondary error occurred while logging: ${secondaryError.message}`,
          { stack: secondaryError.stack },
        );
      } else {
        console.error(
          `[activate failed] Secondary error occurred while logging: ${
            secondaryError instanceof Error
              ? secondaryError.message
              : String(secondaryError)
          }`,
        );
      }
    }
    // 非 Error 例外は secondary catch に誤捕捉されないよう、primary rethrow を維持
    throw error;
  }
}

export async function deactivate(): Promise<void> {
  if (serverManager) {
    await serverManager.stop();
    serverManager = undefined;
  }
}
