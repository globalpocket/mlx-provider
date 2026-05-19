import { beforeEach, describe, expect, it, vi } from "vitest";

const DEFAULT_SERVER_PORT = 8080;
const DEFAULT_SERVER_HOST = "127.0.0.1";
const DEFAULT_MODEL_ID = "mlx-community/Qwen3.5-9B-4bit";

const vscodeMocks = vi.hoisted(() => {
  const getMock = vi.fn((_key: string, defaultValue: unknown) => defaultValue);
  const getConfigurationMock = vi.fn(() => ({
    get: getMock,
  }));

  return {
    getMock,
    getConfigurationMock,
  };
});

vi.mock("vscode", () => ({
  workspace: {
    getConfiguration: vscodeMocks.getConfigurationMock,
  },
}));

describe("設定読取", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vscodeMocks.getMock.mockImplementation(
      (_key: string, defaultValue: unknown) => defaultValue,
    );
  });

  it("mlxProvider.server と mlxProvider.model の既定値を ExtensionConfig として返す", async () => {
    const { getExtensionConfig } = await import("../src/config");

    const config = getExtensionConfig();

    expect(vscodeMocks.getConfigurationMock).toHaveBeenCalledWith("mlxProvider");
    expect(vscodeMocks.getMock).toHaveBeenCalledWith(
      "server.port",
      DEFAULT_SERVER_PORT,
    );
    expect(vscodeMocks.getMock).toHaveBeenCalledWith(
      "server.host",
      DEFAULT_SERVER_HOST,
    );
    expect(vscodeMocks.getMock).toHaveBeenCalledWith(
      "model.defaultModel",
      DEFAULT_MODEL_ID,
    );
    expect(config).toEqual({
      server: {
        port: DEFAULT_SERVER_PORT,
        host: DEFAULT_SERVER_HOST,
      },
      model: {
        defaultModel: DEFAULT_MODEL_ID,
      },
    });
  });

  it("getServerConfig は mlxProvider.server の host と port だけを返す", async () => {
    const { getServerConfig } = await import("../src/config");

    expect(getServerConfig()).toEqual({
      port: DEFAULT_SERVER_PORT,
      host: DEFAULT_SERVER_HOST,
    });
    expect(vscodeMocks.getConfigurationMock).toHaveBeenCalledWith("mlxProvider");
    expect(vscodeMocks.getMock).toHaveBeenCalledWith(
      "server.port",
      DEFAULT_SERVER_PORT,
    );
    expect(vscodeMocks.getMock).toHaveBeenCalledWith(
      "server.host",
      DEFAULT_SERVER_HOST,
    );
  });
});
