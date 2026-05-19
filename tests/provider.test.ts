import { describe, expect, it, vi } from "vitest";

describe("MlxLanguageModelProvider registration boundary", () => {
  it("register() calls registration boundary once and returns the same disposable", async () => {
    const mockRuntime = {
      start: vi.fn().mockResolvedValue(undefined),
      stop: vi.fn().mockResolvedValue(undefined),
      isRunning: vi.fn().mockReturnValue(false),
    };

    const disposable = { dispose: vi.fn() };
    const registrationBoundary = vi.fn(() => disposable);

    const providerModule = await import("../src/provider");
    const MlxLanguageModelProvider = providerModule.MlxLanguageModelProvider;

    const provider = new MlxLanguageModelProvider(mockRuntime, registrationBoundary);

    expect(mockRuntime.start).not.toHaveBeenCalled();
    expect(mockRuntime.stop).not.toHaveBeenCalled();

    const resultDisposable = provider.register();

    expect(registrationBoundary).toBeCalledWith(provider);
    expect(registrationBoundary).toHaveBeenCalledTimes(1);
    expect(resultDisposable).toBe(disposable);
  });
});
