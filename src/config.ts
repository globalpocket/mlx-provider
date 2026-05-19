import * as vscode from "vscode";

type ExtensionConfig = {
  server: {
    port: number;
    host: string;
  };
  model: {
    defaultModel: string;
  };
};

type ServerConfig = {
  port: number;
  host: string;
};

const DEFAULT_SERVER_PORT = 8080;
const DEFAULT_SERVER_HOST = "127.0.0.1";
const DEFAULT_MODEL_ID = "mlx-community/Qwen3.5-9B-OptiQ-4bit";

export function getExtensionConfig(): ExtensionConfig {
  const config = vscode.workspace.getConfiguration("mlxProvider");
  const serverPort = config.get("server.port", DEFAULT_SERVER_PORT);
  const serverHost = config.get("server.host", DEFAULT_SERVER_HOST);
  const defaultModel = config.get("model.defaultModel", DEFAULT_MODEL_ID);

  return {
    server: {
      port: serverPort,
      host: serverHost,
    },
    model: {
      defaultModel: defaultModel,
    },
  };
}

export function getServerConfig(): ServerConfig {
  const config = vscode.workspace.getConfiguration("mlxProvider");
  const serverPort = config.get("server.port", DEFAULT_SERVER_PORT);
  const serverHost = config.get("server.host", DEFAULT_SERVER_HOST);

  return {
    port: serverPort,
    host: serverHost,
  };
}
