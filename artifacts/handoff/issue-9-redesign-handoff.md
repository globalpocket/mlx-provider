# Issue #9 Gate 6 再設計ハンドオフ

- 対象Issue: `globalpocket/mlx-provider#9`
- 目的: Gate 6 の Red 判定を 2 段階へ分割し、`Number of calls: 0` 同型失敗ループを解消する。

## 1) test-writer への1手

- 編集対象: [`tests/extension.test.ts`](../../tests/extension.test.ts)
- A段階 Red: `appendLine` 呼び出し存在のみを失敗条件化し、順序断言は導入しない。
- B段階 Red: A段階 Green 後に `toHaveBeenNthCalledWith` による順序断言を追加する。

## 2) tester への1手

- A段階実行ログ: `artifacts/test-results/issue-9-gate6A.log`
- B段階実行ログ: `artifacts/test-results/issue-9-gate6B.log`
- 実行は A/B を分離し、混在実行しない。

## 3) consistency-checker への1手

- A段階判定: `Number of calls: 0` を `expected-red-match` として許容する。
- B段階判定: 順序不一致のみを `expected-red-match` とし、`Number of calls: 0` は A段階へ差し戻す。

## 4) 維持する品質ゲート

- TDD: Red → Green → Refactor
- Coverage: 85%以上
- 監査: `security-auditor` Pass / `reviewer` Pass
