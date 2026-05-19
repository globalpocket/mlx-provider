# 初期セットアップ実行計画

## 実行方針

- 対象は最小構成の VS Code 拡張骨格に限定する。
- 1 サブタスク 1 目的を厳守する。
- 各サブタスクは Red → Green → 評価 → 必要時監査 の順で進める。
- 各完了条件にはユニットテストとカバレッジ 85%以上を含める。

## チェックリスト

- [x] **Task 1 / test-writer**: `tests/config.test.ts` を新規作成し、`getExtensionConfig()` の期待値を固定する Red テストを書く。Acceptance Criteria: Red フェーズとして失敗が確認できること、設定キーの既定値と読取項目が明示されていること、対象は [tests/config.test.ts](../tests/config.test.ts) のみであること、後続評価で対象カバレッジ 85%以上を目指せる粒度であること。
- [x] **Task 2 / tester**: Task 1 のテストだけを実行し、失敗名・終了ステータス・主要エラーを要約する。Acceptance Criteria: Red が確認されること、実行結果が後続の [config.ts](../src/config.ts) 実装に必要な事実だけへ圧縮されていること。
- [x] **Task 3 / code**: `src/config.ts` を新規作成し、Task 1 の failing test を通す最小実装を追加する。Acceptance Criteria: Red→Green→Refactor を踏むこと、編集対象は [src/config.ts](../src/config.ts) のみであること、対象ユニットテストが成功し対象カバレッジ 85%以上であること。
- [x] **Task 4 / tester**: 設定モジュールのユニットテストとカバレッジを再実行し、Green と coverage を確認する。Acceptance Criteria: Task 3 の成功が再現されること、対象カバレッジ 85%以上が数値で確認できること。
- [x] **Task 5 / test-writer**: `tests/serverManager.test.ts` を新規作成し、`start()`, `stop()`, `isRunning()` の状態遷移を固定する Red テストを書く。Acceptance Criteria: 失敗するテストが作成されること、対象は [tests/serverManager.test.ts](../tests/serverManager.test.ts) のみであること、実プロセス起動を前提にしないこと、後続評価で対象カバレッジ 85%以上を目指せること。
- [x] **Task 6 / tester**: Task 5 の Red を確認する。Acceptance Criteria: failing test 名、終了ステータス、主要エラーが抽出されていること。
- [x] **Task 7 / code**: `src/serverManager.ts` を新規作成し、Task 5 のテストを通す最小実装を追加する。Acceptance Criteria: Red→Green→Refactor を踏むこと、編集対象は [src/serverManager.ts](../src/serverManager.ts) のみであること、対象ユニットテストが成功し対象カバレッジ 85%以上であること。
- [x] **Task 8 / tester**: Server Manager のテストとカバレッジを再実行する。Acceptance Criteria: Green と coverage 85%以上が確認できること。
- [x] **Task 9 / test-writer**: `tests/provider.test.ts` を新規作成し、Provider 登録と Server Manager 連携の Red テストを書く。Acceptance Criteria: 対象は [tests/provider.test.ts](../tests/provider.test.ts) のみであること、登録処理と依存注入の期待が固定されること、後続評価で対象カバレッジ 85%以上を目指せること。
- [x] **Task 10 / tester**: Task 9 の Red を確認する。Acceptance Criteria: failing test と主要エラーが要約されていること。
- [x] **Task 11 / code**: `src/provider.ts` を新規作成し、Task 9 のテストを通す最小実装を追加する。Acceptance Criteria: Red→Green→Refactor を踏むこと、編集対象は [src/provider.ts](../src/provider.ts) のみであること、対象ユニットテストが成功し対象カバレッジ 85%以上であること。
- [x] **Task 12 / tester**: Provider のテストとカバレッジを再実行する。Acceptance Criteria: Green と coverage 85%以上が確認できること。
- [x] **Task 13 / test-writer**: `tests/extension.test.ts` を新規作成し、`activate()` と `deactivate()` の配線を固定する Red テストを書く。Acceptance Criteria: 対象は [tests/extension.test.ts](../tests/extension.test.ts) のみであること、Provider 登録と Server Manager 後始末の期待が固定されること、後続評価で対象カバレッジ 85%以上を目指せること。
- [x] **Task 14 / tester**: Task 13 の Red を確認する。Acceptance Criteria: failing test と主要エラーが要約されていること。
- [x] **Task 15 / code**: `src/extension.ts` を新規作成し、Task 13 のテストを通す最小実装を追加する。Acceptance Criteria: Red→Green→Refactor を踏むこと、編集対象は [src/extension.ts](../src/extension.ts) のみであること、対象ユニットテストが成功し対象カバレッジ 85%以上であること。
- [x] **Task 16 / tester**: 初期骨格全体のユニットテストとカバレッジを実行する。Acceptance Criteria: 拡張エントリ、設定定義、Provider 骨格、プロセス管理骨格の主要テストが成功し、対象カバレッジ 85%以上が確認できること。
- [x] **Task 17 / security-auditor**: 初期骨格にハードコードされた秘密情報や不自然な依存がないか監査する。Acceptance Criteria: Pass/Fail と重大指摘の有無が明示されること。
- [x] **Task 18 / reviewer**: 設計整合性、責務分離、TDD 完了条件の充足を監査する。Acceptance Criteria: [plans/design.md](./design.md) と実装の整合性が確認されること、差し戻し要否が明示されること。

## 完了後の状態

### 最終反映メモ

- reviewer 指摘反映後、[plans/design.md](./design.md)、[tests/provider.test.ts](../tests/provider.test.ts)、[src/provider.ts](../src/provider.ts)、[src/extension.ts](../src/extension.ts) の整合を再確認済み。
- `npm test` と `npm run coverage` の再実行結果は Green / 100% を維持しており、reviewer 指摘後の再修正完了まで含めて計画全体が完了している。

### Suggested Next Mode

`none`

### Suggested First Task

- 追加委任なし: extension フェーズ、評価フェーズ、最終監査を含む全タスクが完了済み。
- 根拠: `tests/extension.test.ts` と `src/extension.ts` は Green 済みで、`npm run coverage` は終了コード 0 かつ全体 100% を確認済み。
