# mlx-provider
A VS Code extension that provides Apple's MLX models as a Language Model API, featuring automated local server and model management. AppleのMLXモデルをLanguage Model APIとして提供し、ローカルサーバーとモデルの自動管理を備えたVS Code拡張機能。

## Release Notes

### v0.0.1

- 初回リリースとして、MLX ベースのローカル Language Model API 提供を開始
- 拡張機能の `activate` / `deactivate` ライフサイクルに対応
- provider 登録を含む拡張の基本統合を実装
- ローカルサーバーの起動・停止を含むサーバーライフサイクル管理を実装
- 設定管理と venv セットアップを含む実行基盤を整備
- テスト整備と監査通過を前提とした初期品質ゲートを確立
