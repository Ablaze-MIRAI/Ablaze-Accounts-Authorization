# Ablaze Accounts Authorization

OAuth2.0 + OpenID Connectで認証を行えるAblazeの認証基盤

## Use

TODO: ちゃんとかく

`floorp-note-2`チャンネルに書いてあります。

client_id発行はissueへ

## Development

> [!CAUTION]
> Nextjs Standaloneはバグにより正しくビルドできないため、従来通りのビルドを使用する

ルートに`.env.development`を配置。いい感じに認証情報を設定。

### 実行

```
pnpm mg:push # データベースにマイグレーション (開発中の変更もこれ)
pnpm dev # 開発サーバー起動
```

### データベースついて

データベースの変更内容が固まったら、このコマンドでマイグレーションファイルを作成

>  [!TIP]
> `mg:push`を使った状態で`mg:apply`すると状態が違うから全データ消すって言われるけど、`mg:push`で変更した分ずれただけだから大丈夫です。開発データベースの内容は全部消えるけどね。

```
pnpm mg:apply
```

## Branch Rules

`hotfix/xxxx` -> `production` <- `develop` <- `feature/xxxx` / `issue/xxxx` / `{username}`
