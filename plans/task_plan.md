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

## `vsce package` 修復計画

## 登録境界の最小復帰計画

- [x] **Priority Task / code**: [`src/extension.ts`](../src/extension.ts) の最小修正により、[`activate()`](../src/extension.ts:7) から provider 経由の登録フローを復帰した。Acceptance Criteria: [`register()`](../src/provider.ts:25) を入口とする契約へ戻し、登録境界の責務を provider / extension 間で再分離できていること。
- [x] **Follow-up / tester**: 関連ユニットテストと coverage を再実行し、Green と 85%以上を確認した。Acceptance Criteria: extension/provider 系の回帰が解消され、[`npm run coverage`](../package.json:46) 成功時の総合 coverage 94.11% が記録されていること。
- [x] **Forbidden Patterns**: 実在未確認 API の設計固定、`registerSpy` 契約の弱体化、テスト変更による回避を禁止事項として設計へ反映済み。 Acceptance Criteria: [`plans/design.md`](./design.md) に registration boundary 方針として保持されること。

- [x] **Task 19 / tester**: `npx vsce package` の実行結果を取得し、packaging failure の終了コード、主要エラー、失敗シグネチャを後続修正の根拠として記録した。Acceptance Criteria: 探索ではなく再現に限定すること、実行結果が packaging failure の最小事実へ圧縮されること、後続タスクが Red の根拠として使えること。
- [x] **Task 20 / test-writer**: [`tests/packageManifest.test.ts`](../tests/packageManifest.test.ts) を追加し、[package.json](../package.json) の `main` と packaging script 契約を固定する Red テストを書いた。Acceptance Criteria: Red→Green→Refactor の Red 専任であること、対象は [tests/packageManifest.test.ts](../tests/packageManifest.test.ts) のみであること、`main` と `build` または `vscode:prepublish` の不整合が失敗として表現されること、後続評価で対象カバレッジ 85%以上を目指せること。
- [x] **Task 21 / tester**: Task 20 の manifest 契約テストだけを実行し、期待した Red 失敗を確認した。Acceptance Criteria: failing test 名、終了ステータス、主要エラーが要約されること、Expected Red Signature と一致した失敗だけを記録すること。
- [x] **Task 22 / code**: [package.json](../package.json) のみを編集し、Task 20 の failing test を通す最小修正として packaging script を追加した。Acceptance Criteria: Red→Green→Refactor を踏むこと、編集対象は [package.json](../package.json) のみであること、`build` と `vscode:prepublish` の少なくとも一方で [package.json](../package.json) の `main` が要求する成果物生成へ到達できること、対象テストが成功し対象カバレッジ 85%以上であること。
- [x] **Task 23 / tester**: Task 22 後に manifest 契約テストと coverage を再実行し、Green と 85%以上を確認した。Acceptance Criteria: Task 22 の修正で対象テストが成功すること、対象 coverage 85%以上が数値で示されること。
- [x] **Task 24 / tester**: `npm run build` 相当の成果物生成確認と `npx vsce package` の再実行を行い、`.vsix` 生成完了を確認した。Acceptance Criteria: `dist/extension.js` の存在有無と `npx vsce package` の終了コードが要約されること、成功時は `.vsix` 生成が確認できること、失敗時は次の最小修正候補へ分岐できること。
- [x] **Task 25 / analyzer**: Task 24 で `dist/extension.js` 欠落または出力先不整合が再現しなかったため、[tsconfig.json](../tsconfig.json) など build 設定ファイルの追加修正は不要と判定した。Acceptance Criteria: 対象ファイル、開始行、終了行、前後スニペットが明示されること、Edit Files を 1〜2 件へ維持できること。
- [x] **Task 26 / code**: Task 25 が不要判定となったため、[tsconfig.json](../tsconfig.json) など build 設定ファイルの追加編集は実施不要として完了した。Acceptance Criteria: Red→Green→Refactor を踏むこと、編集対象は analyzer が特定した build 設定ファイル 1 件を原則とすること、manifest 契約テストと packaging 実行の両方を壊さないこと、対象テストが成功し対象カバレッジ 85%以上であること。
- [x] **Task 27 / tester**: 最終検証として関連ユニットテスト、coverage、`npx vsce package` を再実行し、`.vsix` 生成完了を確認した。Acceptance Criteria: Green、coverage 85%以上、packaging 終了コード 0、`.vsix` 生成の 4 条件が揃うこと。
- [x] **Task 28 / security-auditor**: packaging 対応で不自然な依存追加、秘密情報混入、存在しないツール参照がないことを監査し、Pass を確認した。Acceptance Criteria: Pass/Fail、重大指摘、依存妥当性の要約が提示されること。
- [x] **Task 29 / reviewer**: [plans/design.md](./design.md) と packaging 修正実装の整合性、TDD 遵守、成果物契約の妥当性を監査し、Pass を確認した。Acceptance Criteria: 差し戻し要否が明示されること、`vsce package` 修復が設計どおり最小変更であることが確認されること。

## 完了後の状態

### 最終反映メモ

- registration boundary 是正は完了し、[`plans/design.md`](./design.md) は「provider の [`register()`](../src/provider.ts:25) が返す disposable を extension が購読へ渡す」契約で最終整合した。
- 関連ユニットテストと coverage は完了しており、[`npm run coverage`](../package.json:46) は 94.11% で成功している。
- packaging、最終セキュリティ監査、最終レビューまで完了し、PR 前の技術作業と文書同期は完了した。

### Suggested Next Mode

`orchestrator`

### Suggested First Task

- 最初の委任は PR 作成直前の最終調整として orchestrator に引き継ぐ。
- 根拠: 設計、計画、packaging、security、review の整合は完了しており、以後は Markdown 更新ではなく PR 生成フローの調整が最小権限となる。

## Issue #8 実行計画: OutputChannel 初期化境界固定

### 実行方針

- 対象は [`src/extension.ts`](../src/extension.ts) と [`tests/extension.test.ts`](../tests/extension.test.ts) のみに限定する。
- Action Contract に従い、本タスクでは設計と計画の更新のみを行い、実装・テスト実行・妥当性判定は後続モードへ分離する。
- SoD 分離された TDD 順序を厳守し、1 サブタスク 1 目的を維持する。
- 各サブタスクは Red→Green→Refactor と coverage 85%以上の完了条件を明記する。

### SoD 分離チェックリスト

- [ ] **Issue8-Task1 / test-writer**: [`tests/extension.test.ts`](../tests/extension.test.ts) のみを編集し、OutputChannel 初期化境界を固定する Red テストを追加する。Acceptance Criteria: Red 失敗を意図したテストのみ追加されること、`createOutputChannel` 未呼び出しまたは呼び出し回数不一致を検出できること、チャネル名 `MLX Provider Trace` の不一致を失敗として検出できること、実装コードと設定ファイルを変更しないこと。
- [ ] **Issue8-Task2 / tester**: Issue8-Task1 のテスト実行結果を取得し、Expected Red Signature と一致する失敗を確認する。Acceptance Criteria: 実行コマンド、終了コード、失敗テスト名、主要エラーが要約されること、一致する Red 失敗を成功条件として記録すること。
- [ ] **Issue8-Task3 / consistency-checker**: Red 結果が「OutputChannel 未生成または回数不一致」シグネチャと一致するか検証する。Acceptance Criteria: Red 成立/不成立が明示されること、不一致時は code/debug へ進まず差し戻し判断が示されること。
- [ ] **Issue8-Task4 / code**: [`src/extension.ts`](../src/extension.ts) のみを編集し、OutputChannel 生成 1 回・同名固定・再利用契約を満たす最小実装を行う。Acceptance Criteria: Red→Green→Refactor を踏むこと、`vscode.window.createOutputChannel` の初期化境界が局所化されること、既存の provider 登録契約と `deactivate()` の停止契約を破壊しないこと、編集対象が 1 ファイルに限定されること。
- [ ] **Issue8-Task5 / tester**: Issue8-Task4 後の関連ユニットテストと coverage を再実行し Green を確認する。Acceptance Criteria: 失敗テストが解消されること、対象 coverage 85%以上が数値で確認できること、重複生成がないことをテスト結果で確認できること。
- [ ] **Issue8-Task6 / consistency-checker**: Green 結果と coverage 品質ゲートを検証する。Acceptance Criteria: coverage 85%以上、Red で固定した失敗条件が Green で解消された事実、Forbidden Files 非変更が確認されること。
- [ ] **Issue8-Task7 / security-auditor**: OutputChannel 境界変更に対するセキュリティ監査を実施する。Acceptance Criteria: ハードコード秘密情報なし、不要依存追加なし、監査 Pass/Fail と重大指摘有無が提示されること。
- [ ] **Issue8-Task8 / reviewer**: 設計整合性と責務分割の最終監査を実施する。Acceptance Criteria: [`plans/design.md`](./design.md) の Issue #8 設計と実装が整合すること、差し戻し要否が明示されること、TDD と SoD の実行証跡が確認できること。

### タスク別スコープ固定

- Read Files: [`plans/design.md`](./design.md), [`plans/task_plan.md`](./task_plan.md), [`src/extension.ts`](../src/extension.ts), [`tests/extension.test.ts`](../tests/extension.test.ts)
- Edit Files (実装フェーズ): [`tests/extension.test.ts`](../tests/extension.test.ts), [`src/extension.ts`](../src/extension.ts)
- Forbidden Files: [`package.json`](../package.json) および Issue #8 の目的外ファイル全般

### 品質ゲート

- TDD: Red 失敗確認 → Green 最小実装 → 必要最小限 Refactor
- Coverage: 対象テスト群で 85%以上
- SoD: test-writer→tester→consistency-checker→code/debug→tester→consistency-checker→security-auditor→reviewer
- 監査: security-auditor Pass かつ reviewer Pass
