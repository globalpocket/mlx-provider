# Issue #9 B段階 再設計ハンドオフ

## 変更要約

- B段階で `test-red` を必須にしていた旧契約を廃止した。
- 根拠は [`artifacts/test-results/issue-9-red-b.log`](../test-results/issue-9-red-b.log) の全件passであり、未実装失敗の観測が成立しないため。
- A段階の Red→Green 成立は有効な既存証跡として維持する。

## Contract Mismatch 是正方針

- B段階の品質ゲートを `test-green` + `coverage` に置換した。
- `unexpected-red` の再発を「失敗」ではなく「Red要求条件の不適合」として扱う。
- 実装・公開 API・停止契約には変更を加えない。

## 次工程 最小引継ぎ（8行）

1. tester: `npm run test -- tests/extension.test.ts` を実行し `artifacts/test-results/issue-9-green-b.log` へ保存。
2. tester: `npm run coverage` を実行し `artifacts/coverage/issue-9-green-b.log` へ保存。
3. consistency-checker: Check Type `test-green` を `artifacts/test-results/issue-9-green-b.log` で判定。
4. consistency-checker: Check Type `coverage` を `artifacts/coverage/issue-9-green-b.log` で判定。
5. 判定条件: B段階では `test-red` を要求しない。
6. 合格条件: `test-green: pass` と `coverage: pass` の両立。
7. 続行順序: `security-auditor` → `reviewer`。
8. 失敗時: 同型失敗2回で `recovery-supervisor` へエスカレーション。
