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
とりあえずGitHubとGoogleに関しては本番環境とか完全分離したテスト用の認証情報を置いておきます。

```
# GitHub
GITHUB_CLIENT_ID=Ov23lipeBoMynmYfsqOb
GITHUB_CLIENT_SECRET=1dd75d6884631e8516755c8de7a721035e1c455c
GITHUB_REDIRECT_URI=http://localhost:3000/oauth2/github/callback

# Google
GOOGLE_CLIENT_ID=867265886457-1m6ktmeklvj936l5ujhc23jcs9i06cin.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2/google/callback

# SMTP
SMTP_HOST=m33.coreserver.jp
SMTP_PORT=465
SMTP_FROM=noreply@mirairo.dev
SMTP_USER=noreply@mirairo.dev
SMTP_PASS=iy7IUju6zTAN

# Redis
REDIS_CONNECTION=xxxx

# Database
DATABASE_CONNECTION=xxxx

# Key
OIDC_JWS_PRIVATE_KEY_PATH=./.environments/keys/development.private.rsa.pem
OIDC_JWS_PUBLIC_KEY_PATH=./.environments/keys/development.public.rsa.pem

```

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
