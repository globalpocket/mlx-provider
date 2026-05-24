# Issue #6 サブIssue分解（1TDDサイクル=1観測可能振る舞い）

## 前提
- 親Issue: `globalpocket/mlx-provider#6`
- 要求: VS Code 出力パネルで「拡張起動」「拡張エラー」「mlx_lm.server出力」を観測可能にする。
- 方針: 1サブIssue=1観測可能振る舞い=1 Red-Green-Refactor サイクル。

## Sub-Issue 1: Trace出力チャネル初期化と取得境界の固定
- Goal: 拡張起動時に専用 OutputChannel を1回生成し再利用できる。
- Scope: Traceチャネルの生成/取得関数を追加し、activateから呼び出す。
- Read Files候補: `src/extension.ts`, `tests/extension.test.ts`, `README.md`
- Edit Files候補: `tests/extension.test.ts`, `src/extension.ts`
- Acceptance Criteria: 1) Red失敗を先に確認 2) OutputChannel生成1回・同名固定 3) Green後に重複生成なし。
- Expected Red Signature: `createOutputChannel` 未呼び出し、または呼び出し回数不一致で失敗。
- Quality Gates: TDD Red-Green-Refactor必須 / Coverage>=85% / `security-auditor` Pass / `reviewer` Pass。
- Blocked By: なし。

## Sub-Issue 2: 機能拡張の起動トレース出力
- Goal: activate開始/完了を出力パネルへ追記し、起動を観測可能にする。
- Scope: 起動開始・成功ログを定型フォーマットで `appendLine` 出力。
- Read Files候補: `src/extension.ts`, `tests/extension.test.ts`
- Edit Files候補: `tests/extension.test.ts`, `src/extension.ts`
- Acceptance Criteria: 1) Red失敗を先に確認 2) 開始/成功の2イベント出力 3) 既存ライフサイクル契約を壊さない。
- Expected Red Signature: 起動イベント文言未出力、または出力順序不一致で失敗。
- Quality Gates: TDD Red-Green-Refactor必須 / Coverage>=85% / `security-auditor` Pass / `reviewer` Pass。
- Blocked By: Sub-Issue 1。

## Sub-Issue 3: 機能拡張エラートレース出力
- Goal: activate失敗時にエラー要約とスタックを出力パネルへ記録する。
- Scope: activate内例外を捕捉し、エラー種別/メッセージ/stackを出力後に再throw。
- Read Files候補: `src/extension.ts`, `tests/extension.test.ts`
- Edit Files候補: `tests/extension.test.ts`, `src/extension.ts`
- Acceptance Criteria: 1) Red失敗を先に確認 2) 失敗時ログと再throwの両立 3) 正常系ログとの混線なし。
- Expected Red Signature: 例外発生時にエラーログ未出力、または再throw欠落で失敗。
- Quality Gates: TDD Red-Green-Refactor必須 / Coverage>=85% / `security-auditor` Pass / `reviewer` Pass。
- Blocked By: Sub-Issue 1。

## Sub-Issue 4: `mlx_lm.server` stdoutトレース連携
- Goal: サーバープロセスのstdoutを出力パネルへ転送する。
- Scope: ServerManagerのstdoutイベント購読とTrace出力の境界を追加。
- Read Files候補: `src/serverManager.ts`, `src/extension.ts`, `tests/serverManager.test.ts`
- Edit Files候補: `tests/serverManager.test.ts`, `src/serverManager.ts`
- Acceptance Criteria: 1) Red失敗を先に確認 2) stdout行が欠落なく出力 3) stop時に購読リークなし。
- Expected Red Signature: stdout受信時にOutputChannelへ転送されず失敗。
- Quality Gates: TDD Red-Green-Refactor必須 / Coverage>=85% / `security-auditor` Pass / `reviewer` Pass。
- Blocked By: Sub-Issue 1。

## Sub-Issue 5: `mlx_lm.server` stderrトレース連携
- Goal: サーバープロセスのstderrをエラーレベルで出力パネルへ転送する。
- Scope: stderrイベントを識別可能なプレフィックス付きで出力。
- Read Files候補: `src/serverManager.ts`, `tests/serverManager.test.ts`
- Edit Files候補: `tests/serverManager.test.ts`, `src/serverManager.ts`
- Acceptance Criteria: 1) Red失敗を先に確認 2) stderrがstdoutと区別表示 3) 既存状態遷移を壊さない。
- Expected Red Signature: stderr受信時にエラー種別プレフィックス欠落で失敗。
- Quality Gates: TDD Red-Green-Refactor必須 / Coverage>=85% / `security-auditor` Pass / `reviewer` Pass。
- Blocked By: Sub-Issue 4。

## Sub-Issue 6: 統合観測テスト（起動・拡張エラー・server出力）
- Goal: Issue #6の3要求を統合テストで同時に担保する。
- Scope: extension+serverManager結合テストで起動/エラー/stdout-stderrを一貫検証。
- Read Files候補: `tests/extension.test.ts`, `tests/serverManager.test.ts`, `src/extension.ts`
- Edit Files候補: `tests/extension.test.ts`, `src/extension.ts`
- Acceptance Criteria: 1) Red失敗を先に確認 2) 3要求すべての観測成功 3) 回帰なしでGreen。
- Expected Red Signature: 3要求のいずれか1つでも未観測でテスト失敗。
- Quality Gates: TDD Red-Green-Refactor必須 / Coverage>=85% / `security-auditor` Pass / `reviewer` Pass。
- Blocked By: Sub-Issue 2, Sub-Issue 3, Sub-Issue 5。

## 実装順序（Blocked By最小化）
1. Sub-Issue 1
2. Sub-Issue 2 と Sub-Issue 3（並列可）
3. Sub-Issue 4
4. Sub-Issue 5
5. Sub-Issue 6

## issue-tracker 登録用 圧縮リスト（タイトル案 + 本文要約）
1. Title: `trace: OutputChannel初期化境界を固定する`
   Summary: `activateで専用OutputChannelを1回生成・再利用する契約をRed→Greenで固定。Coverage>=85%、security/reviewゲート必須。`
2. Title: `trace: 機能拡張の起動イベントを出力パネルへ記録する`
   Summary: `activate開始/完了イベントを定型ログで出力。順序保証をテストで固定し回帰防止。Coverage>=85%、security/review必須。`
3. Title: `trace: 機能拡張エラーを出力パネルへ記録する`
   Summary: `activate失敗時にメッセージとstackを出力し再throwする契約を固定。Coverage>=85%、security/review必須。`
4. Title: `trace: mlx_lm.server stdoutを転送表示する`
   Summary: `server stdoutをOutputChannelへ転送し停止時リークなしを保証。Coverage>=85%、security/review必須。`
5. Title: `trace: mlx_lm.server stderrをエラー種別で表示する`
   Summary: `server stderrを識別プレフィックス付きで表示しstdoutと区別。Coverage>=85%、security/review必須。`
6. Title: `trace: 起動・拡張エラー・server出力の統合観測を固定する`
   Summary: `Issue #6の3要求を統合テストで同時保証し回帰を防止。Coverage>=85%、security/review必須。`
