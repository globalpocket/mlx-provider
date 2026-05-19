import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_MODEL_ID, DEFAULT_SERVER_HOST, DEFAULT_SERVER_PORT, vscodeMocks } from "./setup";

// Allowed Test Doubles: vi.hoisted() で完全初期化
const doubles = vi.hoisted(() => {
  const stopSpy = vi.fn().mockResolvedValue(undefined);
  const disposable = { dispose: vi.fn() };
  const registerSpy = vi.fn(() => disposable);
  const serverManagerInstance = {
    start: vi.fn().mockResolvedValue(undefined),
    stop: stopSpy,
    isRunning: vi.fn().mockReturnValue(false),
  };
  const providerInstance = { register: registerSpy };

  return {
    stopSpy,
    disposable,
    registerSpy,
    serverManagerInstance,
    providerInstance,
    ServerManagerMock: vi.fn(() => serverManagerInstance),
    ProviderMock: vi.fn(() => providerInstance),
  };
});

// 3 つの module mock だけを定義（vi.importActual は使わない）
vi.mock("../src/serverManager", () => ({
  ServerManager: doubles.ServerManagerMock,
}));

vi.mock("../src/provider", () => ({
  MlxLanguageModelProvider: doubles.ProviderMock,
}));

vi.mock("../src/config", () => ({
  getExtensionConfig: vi.fn(() => ({
    server: { port: DEFAULT_SERVER_PORT, host: DEFAULT_SERVER_HOST },
    model: { defaultModel: DEFAULT_MODEL_ID },
  })),
  getServerConfig: vi.fn(() => ({
    port: DEFAULT_SERVER_PORT,
    host: DEFAULT_SERVER_HOST,
  })),
}));

describe("extension entry", () => {
  let context: { subscriptions: Array<{ dispose: () => void }> };

  beforeEach(() => {
    vscodeMocks.getConfigurationMock.mockClear();
    vscodeMocks.getMock.mockClear();
    doubles.stopSpy.mockClear();
    doubles.disposable.dispose.mockClear();
    doubles.registerSpy.mockClear();
    doubles.serverManagerInstance.start.mockClear();
    doubles.serverManagerInstance.stop.mockClear();
    doubles.providerInstance.register.mockClear();
    context = { subscriptions: [] as Array<{ dispose: () => void }> };
  });

  it("activate wires provider registration and deactivate stops retained server manager once", async () => {
    // Import extension after mocks are set up
    const { activate, deactivate } = await import("../src/extension");

    // Call deactivate first to verify no-op behavior
    await deactivate();

    // Call activate with context
    await activate(context);

    // Verify ServerManager was generated once
    expect(doubles.ServerManagerMock).toBeCalledTimes(1);

    // Verify Provider was instantiated once
    expect(doubles.ProviderMock).toBeCalledTimes(1);

    // Verify register was called once
    expect(doubles.registerSpy).toBeCalledTimes(1);

    // Verify the disposable from register was added to context.subscriptions
    expect(context.subscriptions[0]).toBe(doubles.disposable);

    // Call deactivate and verify stop was called exactly once
    await deactivate();
    expect(doubles.stopSpy).toBeCalledTimes(1);
  });
});
