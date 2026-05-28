-e # Issue #9 Gate 6: Red テスト作成索引

## 対象テストファイル
- `tests/extension.test.ts` - 起動イベント出力順序（start→ready）の Red テスト追加

## 関連実装ファイル
- `src/extension.ts` - `activate()` の起動イベント出力実装

## 1 行要約
Issue #9 の Gate 6 として、起動時 start ログと登録完了後 ready ログの順序を固定する Red テストを `tests/extension.test.ts` に追加し、関連実装は `src/extension.ts` の `activate()` である。
