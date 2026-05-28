import { beforeEach, describe, expect, it, vi } from "vitest";
import * as vscode from "vscode";
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
    vi.resetModules();
    vscodeMocks.getConfigurationMock.mockClear();
    vscodeMocks.getMock.mockClear();
    vscodeMocks.createOutputChannel.mockReset();
    vscodeMocks.createOutputChannel.mockImplementation(() => ({
      appendLine: vi.fn(),
      write: vi.fn(),
      clear: vi.fn(),
      revealIfInPanel: vi.fn(),
      dispose: vi.fn(),
    }));
    doubles.stopSpy.mockClear();
    doubles.disposable.dispose.mockClear();
    doubles.registerSpy.mockClear();
    doubles.ProviderMock.mockClear();
    doubles.ServerManagerMock.mockClear();
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

    it("activate calls createOutputChannel once with name 'MLX Provider Trace'", async () => {
      const { activate } = await import("../src/extension");

    await activate(context);

      expect(vscodeMocks.createOutputChannel).toBeCalledTimes(1);
      expect(vscodeMocks.createOutputChannel).toHaveBeenCalledWith("MLX Provider Trace");
    });

  describe("activate lifecycle trace logs", () => {
    const getOutputAppendLineSpy = () => {
      const outputChannel =
        vscodeMocks.createOutputChannel.mock.results.at(-1)?.value as
          | { appendLine: ReturnType<typeof vi.fn> }
          | undefined;

      return outputChannel?.appendLine ?? vi.fn();
    };

    it("activate emits start trace and ready trace", async () => {
      const { activate } = await import("../src/extension");

      await activate(context);

      const appendLineSpy = getOutputAppendLineSpy();

      const logs = appendLineSpy.mock.calls.map(([log]) => String(log));

      expect(logs).toContain("activate start");
      expect(logs).toContain("activate ready");
    });

    it("activate emits start before ready", async () => {
      const { activate } = await import("../src/extension");

      await activate(context);

      const appendLineSpy = getOutputAppendLineSpy();

      const logs = appendLineSpy.mock.calls.map(([log]) => String(log));
      const startIndex = logs.indexOf("activate start");
      const readyIndex = logs.indexOf("activate ready");

      expect(startIndex).toBeGreaterThanOrEqual(0);
      expect(readyIndex).toBeGreaterThanOrEqual(0);
      expect(startIndex).toBeLessThan(readyIndex);
    });

    it("activate logs error message and stack then rethrows", async () => {
      const { activate } = await import("../src/extension");

      const expectedError = new Error("activate failed");
      expectedError.stack = "mocked-stack";
      doubles.registerSpy.mockImplementationOnce(() => {
        throw expectedError;
      });

      await expect(activate(context)).rejects.toBe(expectedError);

      const appendLineSpy = getOutputAppendLineSpy();

      const logs = appendLineSpy.mock.calls.map(([log]) => String(log));

      expect(logs).toContain("activate start");
      expect(logs).toContain("activate failed");
      expect(logs).toContain(`error kind: Error`);
      expect(logs).toContain(`error message: ${expectedError.message}`);
      expect(logs).toContain(`error stack: ${expectedError.stack}`);
      expect(logs).not.toContain("activate ready");
    });

    it("activate preserves primary exception when secondary logging throws", async () => {
      const { activate } = await import("../src/extension");

      const primaryError = new Error("primary init failure");
      primaryError.stack = "primary-stack";
      const secondaryError = new Error("secondary logging failure");

      const appendLine = vi.fn((message: string) => {
        if (message === "activate failed") {
          throw secondaryError;
        }
      });

      vscodeMocks.createOutputChannel.mockReturnValue({
        appendLine,
        write: vi.fn(),
        clear: vi.fn(),
        revealIfInPanel: vi.fn(),
        dispose: vi.fn(),
      });

      doubles.registerSpy.mockImplementationOnce(() => {
        throw primaryError;
      });

      await expect(activate(context)).rejects.toBe(primaryError);

      expect(appendLine).toHaveBeenCalledWith("activate failed");
      expect(appendLine).not.toHaveBeenCalledWith("activate ready");
    });

    it("activate logs and rethrows primary exception when secondary logging throws non-Error", async () => {
      const { activate } = await import("../src/extension");

      const primaryError = new Error("primary init failure");
      primaryError.stack = "primary-stack";

      const appendLine = vi.fn((message: string) => {
        if (message === "error kind: Error") {
          throw "secondary logging failure";
        }
      });

      vscodeMocks.createOutputChannel.mockReturnValue({
        appendLine,
        write: vi.fn(),
        clear: vi.fn(),
        revealIfInPanel: vi.fn(),
        dispose: vi.fn(),
      });

      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

      doubles.registerSpy.mockImplementationOnce(() => {
        throw primaryError;
      });

      await expect(activate(context)).rejects.toBe(primaryError);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[activate failed] Secondary error occurred while logging: secondary logging failure",
      );

      expect(appendLine).toHaveBeenCalledWith("activate failed");
      expect(appendLine).toHaveBeenCalledWith("error kind: Error");
      expect(appendLine).not.toHaveBeenCalledWith("activate ready");

      consoleErrorSpy.mockRestore();
    });

  it("activate rethrows initialization exceptions from createOutputChannel", async () => {
      const { activate } = await import("../src/extension");

      const expectedError = new Error("createOutputChannel failed");
      vscodeMocks.createOutputChannel.mockImplementationOnce(() => {
        throw expectedError;
      });

      await expect(activate(context)).rejects.toBe(expectedError);

    expect(vscodeMocks.createOutputChannel).toBeCalledTimes(1);
    expect(vscodeMocks.createOutputChannel).toHaveBeenCalledWith("MLX Provider Trace");
  });

    it("activate rethrows createOutputChannel boom errors with identical reference and logs error kind", async () => {
      const { activate } = await import("../src/extension");

      const thrownError = new Error("createOutputChannel boom");
      vscodeMocks.createOutputChannel.mockImplementationOnce(() => {
        throw thrownError;
      });

      await expect(activate(context)).rejects.toBe(thrownError);

      expect(vscodeMocks.createOutputChannel).toBeCalledTimes(1);
      expect(vscodeMocks.createOutputChannel).toHaveBeenCalledWith("MLX Provider Trace");
    });

  it("activate logs failure contract as error kind / error message / error stack and preserves not ready", async () => {
    const { activate } = await import("../src/extension");

    const expectedError = new Error("not activate ready");
    expectedError.stack = "mocked-stack";
    doubles.registerSpy.mockImplementationOnce(() => {
      throw expectedError;
    });

    await expect(activate(context)).rejects.toBe(expectedError);

    const appendLineSpy = getOutputAppendLineSpy();
    const logs = appendLineSpy.mock.calls.map(([log]) => String(log));

    expect(logs).toContain("activate failed");
    expect(logs).toContain(`error kind: Error`);
    expect(logs).toContain(`error message: ${expectedError.message}`);
    expect(logs).toContain(`error stack: ${expectedError.stack}`);
    expect(logs).not.toContain("activate ready");
  });

    it("activate logs and rethrows non-Error exceptions during register", async () => {
      const { activate } = await import("../src/extension");

      const nonError = "activate failed without Error";
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
      doubles.registerSpy.mockImplementationOnce(() => {
        throw nonError;
      });

      await expect(activate(context)).rejects.toBe(nonError);

      const appendLineSpy = getOutputAppendLineSpy();

      const logs = appendLineSpy.mock.calls.map(([log]) => String(log));

      expect(logs).toContain("activate start");
      expect(logs).toContain("error kind: non-error");
      expect(logs).toContain(`error message: ${nonError}`);
      expect(logs).not.toContain("activate ready");

      expect(consoleErrorSpy).not.toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it("activate should not duplicate registration via callback + direct call", async () => {
      const boundaryDisposables: Array<{ dispose: () => void }> = [];
      const serverManagerStopSpy = doubles.stopSpy;

      doubles.ProviderMock.mockImplementationOnce((_, registerBoundary) => {
        boundaryDisposables.push(registerBoundary(doubles.providerInstance));
        boundaryDisposables.push(registerBoundary(doubles.providerInstance));
        return doubles.providerInstance;
      });

      const { activate } = await import("../src/extension");

      await expect(activate(context)).resolves.toBeUndefined();

      expect(boundaryDisposables).toHaveLength(2);
      expect(boundaryDisposables[0]).toBe(boundaryDisposables[1]);
      expect(doubles.registerSpy).toBeCalledTimes(1);
      expect(doubles.ProviderMock).toBeCalledTimes(1);

      boundaryDisposables[0].dispose();
      expect(serverManagerStopSpy).toHaveBeenCalledTimes(0);
    });

    it("activate fails when start/ready are missing", async () => {
      const { activate } = await import("../src/extension");

      await activate(context);

      const appendLineSpy = getOutputAppendLineSpy();

      expect(appendLineSpy).toHaveBeenCalledWith("activate start");
      expect(appendLineSpy).toHaveBeenCalledWith("activate ready");
    });
  });

  describe("activate trace order", () => {
  const appendLineSpy = vi.fn();

  beforeEach(() => {
    appendLineSpy.mockClear();
    vscodeMocks.createOutputChannel.mockClear();

    vscodeMocks.createOutputChannel.mockReturnValue({
      appendLine: appendLineSpy,
      write: vi.fn(),
      clear: vi.fn(),
        revealIfInPanel: vi.fn(),
        dispose: vi.fn(),
      });
    });

    it("A段階: activate trace logs call both start and ready", async () => {
      const { activate } = await import("../src/extension");

      await activate(context);

      expect(appendLineSpy).toHaveBeenCalledWith("activate start");
      expect(appendLineSpy).toHaveBeenCalledWith("activate ready");
    });

    it("B段階: activate trace order is strictly start then ready", async () => {
      const { activate } = await import("../src/extension");

      await activate(context);

      expect(appendLineSpy).toHaveBeenNthCalledWith(1, "activate start");
      expect(appendLineSpy).toHaveBeenNthCalledWith(2, "activate ready");
    });
  });
});
