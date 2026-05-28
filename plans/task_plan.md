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

## Issue #9 実行計画: 起動イベントを出力パネルへ記録

### 実行方針

- 対象は [`tests/extension.test.ts`](../tests/extension.test.ts) と [`src/extension.ts`](../src/extension.ts) の 2 ファイルに限定する。
- 1 TDD サイクル = 1 観測可能振る舞いとして「activate start→ready の順序出力」を単一ゴールに固定する。
- Action Contract に従い、設計更新後は test-writer から順に SoD 分離で実行する。

### Gate 6 再設計チェックリスト（A段階Green成立後のB段階再定義）

- [ ] **Issue9-Task1A / test-writer（Red-A作成）**: [`tests/extension.test.ts`](../tests/extension.test.ts) のみを編集し、`appendLine` 呼び出し存在を観測する Red テストへ最小分割する。Acceptance Criteria: Red→Green→Refactor の Red 専任であること、対象は [tests/extension.test.ts](../tests/extension.test.ts) のみであること、`activate start` / `activate ready` の未出力を検出すること、順序断言 `toHaveBeenNthCalledWith` はこの段階で導入しないこと、coverage 85%以上ゲートへ接続できる粒度であること。
- [ ] **Issue9-Task2A / tester（Red-A実行）**: Issue9-Task1A のみを実行し、Red 実行結果を Artifact へ保存する。Acceptance Criteria: failing test 名、終了コード、主要エラーが取得されること、失敗が `appendLine` 未観測系（例 `toContain` 不一致、`toHaveBeenCalledWith` 不一致、`Number of calls: 0`）であること。
- [ ] **Issue9-Task3A / consistency-checker（Red-A判定）**: Expected Red Signature-A と実行結果の一致を判定する。Acceptance Criteria: `unexpected-red` とせず `expected-red-match` として扱えること、不一致時は code へ進めず test-writer へ差し戻し先が明示されること。
- [ ] **Issue9-Task4 / code（Green-A最小実装）**: [`src/extension.ts`](../src/extension.ts) のみを編集し、`activate` 実行時に start/ready の 2 文言を出力する最小実装を追加する。Acceptance Criteria: Red→Green→Refactor を踏むこと、編集対象は [src/extension.ts](../src/extension.ts) のみであること、既存の `register()` disposable 契約と `deactivate()` 停止契約を壊さないこと。
- [ ] **Issue9-Task5 / tester（Green-A実行）**: Issue9-Task4 後に対象テストを再実行し、Green-A を確認する。Acceptance Criteria: A段階の失敗が解消されること、終了コードと主要結果が Artifact に保存されること。
- [ ] **Issue9-Task6 / consistency-checker（Gate 6 判定）**: Green-A 成立を Gate 6 完了条件として判定する。Acceptance Criteria: `test-green: pass` が確認できること、Gate 6 の判定対象は「呼び出し存在の成立」に限定すること、coverage 85%以上判定は後段 Gate 7 で評価すること。
- [ ] **Issue9-Task7B / tester（B段階Green回帰実行）**: B段階は `unexpected-red`（全件pass）を再発させないため、Red要求を外し、Issue9 関連テストと coverage を実行して回帰確認を行う。Acceptance Criteria: `artifacts/test-results/issue-9-red-b.log` の「全件pass」を既実装成立事実として採用すること、`artifacts/test-results/issue-9-green-b.log` と `artifacts/coverage/issue-9-green-b.log` に最新結果が保存されること、対象 coverage 85%以上が確認可能であること。
- [ ] **Issue9-Task8B / consistency-checker（B段階品質判定）**: B段階の判定を `test-green` + `coverage` に置換し、Contract Mismatch 是正後の品質ゲートを確定する。Acceptance Criteria: `test-green: pass` と `coverage: pass` を判定できること、`test-red` 未実行が契約どおり扱われること、Forbidden Files 非変更が確認できること。
- [ ] **Issue9-Task9 / security-auditor（監査）**: 追加した trace 文言と境界がセキュリティ上問題ないことを監査する。Acceptance Criteria: Pass/Fail と重大指摘の有無が明示されること。
- [ ] **Issue9-Task10 / reviewer（最終監査）**: [`plans/design.md`](./design.md) の Issue #9 設計と実装整合性を監査する。Acceptance Criteria: 差し戻し要否が明示されること、TDD と品質ゲート通過証跡が確認できること。

### B段階ゲート再定義（Issue #9 / Contract Mismatch 是正）

- A段階（観測境界）: Red→Green は成立済みとして保持する。  
  例: `appendLine` 呼び出し存在の未成立を Red として扱い、A段階で解消済み。
- B段階（順序境界）: `artifacts/test-results/issue-9-red-b.log` が全件passであるため、未実装を示す Red は成立しない。  
  例: `test-red` を必須ゲートから外し、`test-green` 回帰確認と coverage 判定を必須ゲートへ置換する。
- 判定規約: B段階で `unexpected-red`（全件pass）を失敗扱いしない。Contract Mismatch 是正後は `test-green: pass` + `coverage: pass` を完了条件とする。

### 次モード向け最小引継ぎ（最大8行）

- tester: `npm run test -- tests/extension.test.ts` と `npm run coverage` を実行し、`artifacts/test-results/issue-9-green-b.log` と `artifacts/coverage/issue-9-green-b.log` へ保存。
- consistency-checker: Check Type を `test-green` と `coverage` で実行し、`artifacts/test-results/issue-9-green-b.log` と `artifacts/coverage/issue-9-green-b.log` を一次情報に判定。
- 判定条件: B段階は `test-red` を要求しない。`test-green: pass` + `coverage: pass` + Forbidden Files 非変更で通過。
- 後続ゲート: `security-auditor` → `reviewer` を順に実行し、Issue #9 の最終品質を確定する。

## Issue #10 実行計画: activate 失敗時の message/stack 出力と再throw

### 実行方針

- 対象は [`tests/extension.test.ts`](../tests/extension.test.ts) と [`src/extension.ts`](../src/extension.ts) の 2 ファイルに限定する。
- 1サブタスク1目的・1完了条件を維持し、SoD 分離された TDD 順序で進行する。
- 失敗時ログ契約は「message/stack 出力 + 再throw + 正常系ログとの混線なし」を同一ゴールとして固定する。

### SoD 分離チェックリスト

- [ ] **Issue10-Task1 / test-writer**: [`tests/extension.test.ts`](../tests/extension.test.ts) のみを編集し、activate 失敗時の Red テストを追加する。Acceptance Criteria: 例外発生時に message 未出力で失敗するテストがあること、stack あり Error で stack 未出力を失敗として検出できること、再throw 欠落を失敗として検出できること、失敗時に `activate ready` が呼ばれた場合を混線として失敗させること。
- [ ] **Issue10-Task2 / tester**: Issue10-Task1 のテスト実行結果を取得し、Expected Red Signature と一致する失敗を記録する。Acceptance Criteria: 実行コマンド、終了コード、失敗テスト名、主要エラーを Artifact に保存できること。
- [ ] **Issue10-Task3 / consistency-checker**: Red 判定を実行し、message/stack 未出力または再throw 欠落シグネチャとの一致を確認する。Acceptance Criteria: `expected-red-match` / `unexpected-red` が明示されること、不一致時に code/debug へ進めないこと。
- [ ] **Issue10-Task4 / code**: [`src/extension.ts`](../src/extension.ts) のみを編集し、activate の例外捕捉・message/stack 出力・再throw を満たす最小実装を追加する。Acceptance Criteria: Red→Green→Refactor を踏むこと、失敗時に `activate ready` を出力しないこと、既存の provider 登録契約と `deactivate()` 契約を破壊しないこと。
- [ ] **Issue10-Task5 / tester**: Issue10-Task4 後に関連テストと coverage を再実行し、Green を確認する。Acceptance Criteria: Issue10 の失敗が解消されること、coverage 85%以上を確認可能な結果を Artifact へ保存すること。
- [ ] **Issue10-Task6 / consistency-checker**: Green と coverage 判定を実行する。Acceptance Criteria: `test-green: pass` と `coverage: pass` が確認できること、Forbidden Files 非変更を確認できること。
- [ ] **Issue10-Task7 / security-auditor**: 例外ログ追加に対するセキュリティ監査を実施する。Acceptance Criteria: Pass/Fail と重大指摘有無が提示されること、秘密情報混入なしを確認できること。
- [ ] **Issue10-Task8 / reviewer**: [`plans/design.md`](./design.md) の Issue #10 契約と実装整合性を最終監査する。Acceptance Criteria: 差し戻し要否が明示されること、TDD と品質ゲート通過証跡が確認できること。

### 品質ゲート

- TDD: `test-writer` → `tester` → `consistency-checker` → `code/debug` → `tester` → `consistency-checker`
- Coverage: 対象テスト群で 85%以上
- 監査: `security-auditor` Pass かつ `reviewer` Pass

### 次モード向け最小引継ぎ（最大8行）

- test-writer: [`tests/extension.test.ts`](../tests/extension.test.ts) のみ編集し、activate 失敗時の message/stack/再throw/ready混線防止を Red で固定。
- tester: `npm run test -- tests/extension.test.ts` と `npm run coverage` を実行し、Issue10 用 Artifact Path へ保存。
- consistency-checker: `test-red` / `test-green` / `coverage` を段階ごとに判定し、Expected Red Signature 一致と coverage 85%以上を確認。
- code/debug: [`src/extension.ts`](../src/extension.ts) だけで最小修正し、失敗時のログ出力と再throwを満たす。
- 後続ゲート: `security-auditor` → `reviewer` を必須実行。

## Issue #10 契約再同期ミニ計画: `registered` ownership と停止責務

### 実行方針

- 対象契約は [`plans/design.md`](./design.md) の「16. Issue #10 追加是正」に固定し、実装・テスト・判定を SoD 分離で再委任する。
- 1サブタスク1目的、編集対象は各サブタスクで 1〜2 ファイルに制限する。

### 最小TDD再委任チェックリスト

- [ ] **Issue10-Ownership-Task1 / test-writer**: [`tests/extension.test.ts`](../tests/extension.test.ts) のみを編集し、`dispose()` が `ServerManager.stop()` を呼ばないこと、`deactivate()` のみが stop を呼ぶことを Red で固定する。Acceptance Criteria: Red-Green-Refactor の Red 専任であること、`registered` 再利用前提の期待を残さないこと、後続の coverage 85%以上確認へ接続できること。
- [ ] **Issue10-Ownership-Task2 / tester**: Task1 の対象テスト実行結果を Artifact へ保存する。Acceptance Criteria: 失敗テスト名・終了コード・主要エラーが記録されること、Red 証跡として次工程へ引き渡せること、coverage 85%以上確認コマンド候補を保持できること。
- [ ] **Issue10-Ownership-Task3 / code/debug**: [`src/extension.ts`](../src/extension.ts) と [`src/serverManager.ts`](../src/serverManager.ts) の最小修正で ownership/lifecycle 契約へ実装を同期する。Acceptance Criteria: Red-Green-Refactor の Green 最小実装であること、`ServerManager` から `registered` 所有を除去すること、`deactivate()` だけが `stop()` を呼ぶこと。
- [ ] **Issue10-Ownership-Task4 / tester**: Task3 後に関連ユニットテストと coverage を再実行する。Acceptance Criteria: Green 成立、終了コード 0、coverage 85%以上を Artifact から確認可能であること。
- [ ] **Issue10-Ownership-Task5 / consistency-checker**: `test-green` と `coverage` を判定する。Acceptance Criteria: `test-green: pass` と `coverage: pass` を満たすこと、Forbidden Files 非変更を確認できること、契約不一致が残る場合は差し戻し先を明示できること。
- [ ] **Issue10-Ownership-Task6 / reviewer**: [`plans/design.md`](./design.md) と実装・テストの契約整合を最終監査する。Acceptance Criteria: ownership/lifecycle 契約不整合が解消されていること、差し戻し要否が明示されること。

### 契約変更で必須になるテスト観点（最大3件）

1. [`tests/extension.test.ts`](../tests/extension.test.ts): `provider.register()` 返却 disposable が `context.subscriptions` へ同一参照で追加される。
2. [`tests/extension.test.ts`](../tests/extension.test.ts): `dispose()` では `stop()` が呼ばれず、[`deactivate()`](../src/extension.ts:91) でのみ `stop()` が 1 回呼ばれる。
3. [`tests/provider.test.ts`](../tests/provider.test.ts): [`register()`](../src/provider.ts:25) は boundary 委譲と返却のみを行い、runtime `start()` / `stop()` を呼ばない。
