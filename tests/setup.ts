import { vi, beforeEach } from "vitest";

const DEFAULT_SERVER_PORT = 8080;
const DEFAULT_SERVER_HOST = "127.0.0.1";
const DEFAULT_MODEL_ID = "mlx-community/Qwen3.5-9B-4bit";

// Global VS Code mock setup
const vscodeMocks = vi.hoisted(() => {
  const getMock = vi.fn((_key: string, defaultValue: unknown) => defaultValue);
  const getConfigurationMock = vi.fn(() => ({
    get: getMock,
  }));

  // Disposable mock for new contract
  const disposableReturn = { dispose: vi.fn() };
  const disposableFromMock = vi.fn(() => disposableReturn);

  return {
    getMock,
    getConfigurationMock,
    disposableReturn,
    disposableFromMock,
  };
});

// Mock vscode globally and make it available as globalThis.vscode
vi.mock("vscode", () => ({
  Disposable: {
    from: vscodeMocks.disposableFromMock,
  },
  workspace: {
    getConfiguration: vscodeMocks.getConfigurationMock,
  },
}));

// Expose mocked vscode as globalThis.vscode for provider.ts which uses global vscode reference
(globalThis as any).vscode = {
  Disposable: {
    from: vscodeMocks.disposableFromMock,
  },
  workspace: {
    getConfiguration: vscodeMocks.getConfigurationMock,
  },
};

export { vscodeMocks, DEFAULT_SERVER_PORT, DEFAULT_SERVER_HOST, DEFAULT_MODEL_ID };
