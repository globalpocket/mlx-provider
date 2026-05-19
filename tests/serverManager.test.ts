import { describe, expect, it } from "vitest";

import { ServerManager } from "../src/serverManager";

describe("ServerManager 状態遷移", () => {
  it("初期状態は停止中で、start 後に起動中、stop 後に停止中へ戻る", async () => {
    const manager = new ServerManager();

    expect(manager.isRunning()).toBe(false);

    await manager.start();
    expect(manager.isRunning()).toBe(true);

    await manager.stop();
    expect(manager.isRunning()).toBe(false);
  });
});
