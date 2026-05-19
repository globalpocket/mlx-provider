# mlx-provider
A VS Code extension that provides Apple's MLX models as a Language Model API, featuring automated local server and model management. AppleのMLXモデルをLanguage Model APIとして提供し、ローカルサーバーとモデルの自動管理を備えたVS Code拡張機能。

## インストール

1. VS Code に拡張機能をインストールします。
   - 配布済みの `.vsix` を使う場合は、VS Code の拡張機能画面から「VSIX からインストール」を選択します。
   - 開発用にリポジトリを直接利用する場合は、ワークスペースを開いたうえで拡張機能として読み込みます。
2. 初回起動を待ちます。
   - 拡張機能は [`package.json`](package.json:15) にある `onStartupFinished` で有効化されます。
   - 起動時にローカルサーバー管理が開始され、必要な Python 仮想環境は拡張側で自動準備されます。
3. 必要に応じて既定設定を確認します。
   - サーバーの待ち受け先は `mlxProvider.server.host` と `mlxProvider.server.port` で指定します。
   - 既定モデルは `mlxProvider.model.defaultModel` です。
   - 既定値は [`package.json`](package.json:19) に定義されています。

## 使用方法

### 1. インストール後の自動セットアップ

- 拡張機能は起動時に自動で有効化され、ローカルの MLX サーバー管理を開始します。
- 必要な Python 仮想環境は拡張側の実行基盤で自動的に準備されます。
- 初期状態では、`mlx-community/Qwen3.5-9B-4bit` が既定のモデルとして利用されます。

### 2. 主要設定項目

`package.json` の設定は `mlxProvider` 配下で提供されます。必要に応じて VS Code の設定画面から変更できます。

| 設定項目 | 既定値 | 説明 |
| --- | --- | --- |
| `mlxProvider.server.port` | `8080` | ローカル MLX サーバーが待ち受けるポート |
| `mlxProvider.server.host` | `127.0.0.1` | ローカル MLX サーバーが利用するホスト |
| `mlxProvider.model.defaultModel` | `mlx-community/Qwen3.5-9B-4bit` | 既定で利用する MLX モデル識別子 |

### 3. 起動後の利用イメージ

- VS Code 起動後、拡張機能が Language Model API の提供口を登録します。
- ローカル MLX サーバーは設定値に従って起動し、停止時までライフサイクル管理されます。
- 利用者は VS Code の Language Model 対応機能から、ローカルの MLX モデルを API 経由で呼び出す想定です。
- モデル管理は拡張内部の責務として扱われ、利用者は基本的に設定とモデル識別子だけを意識すればよい構成です。

## Release Notes

### v0.0.1

- 初回リリースとして、MLX ベースのローカル Language Model API 提供を開始
- 拡張機能の `activate` / `deactivate` ライフサイクルに対応
- provider 登録を含む拡張の基本統合を実装
- ローカルサーバーの起動・停止を含むサーバーライフサイクル管理を実装
- 設定管理と venv セットアップを含む実行基盤を整備
- テスト整備と監査通過を前提とした初期品質ゲートを確立
