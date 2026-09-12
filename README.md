# ENKNOT

屋号「ENKNOT」のポートフォリオサイト。<https://enknot.dev>

## 技術構成

- **Next.js 16** (App Router) / React 19 / TypeScript
- **Tailwind CSS v4**
- **静的エクスポート** (`output: "export"`) — 全ページをビルド時に生成する
- **ホスティング: Cloudflare Workers の静的アセット配信**
  - Worker スクリプトを持たない構成のため、リクエストは課金・無料枠の消費対象外
  - `wrangler.jsonc` で `html_handling` / `not_found_handling` を設定している

## 開発

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # out/ に静的ファイルを生成
```

## ブログ一覧について

`/blog` は note / Zenn / dev.to の記事一覧を**ビルド時に**取得してHTMLへ埋め込んでいる（`src/lib/blog.ts`）。
実行時の取得は行わないため、記事を書いた後に反映するには再ビルドが必要になる。

- 毎日 JST 6:17 に GitHub Actions が自動で再ビルド・再デプロイする
- すぐ反映したい場合は Actions の `Deploy to Cloudflare` を `workflow_dispatch` で手動実行する
- 取得に失敗した場合はビルドが失敗し、公開中のサイトは前回の内容のまま維持される

> **注意**: GitHub の仕様により、public リポジトリでは60日間リポジトリ活動がないとスケジュール実行が自動で無効化される。
> 事前に通知メールが届くので、届いた場合は Actions の画面から再有効化すること。

## デプロイ

`main` への push、日次スケジュール、手動実行のいずれかで GitHub Actions が動き、
`npm run build` の結果（`out/`）を Cloudflare へデプロイする。

必要な GitHub Secrets:

| Secret | 用途 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | 権限は「Edit Cloudflare Workers」に限定 |
| `CLOUDFLARE_ACCOUNT_ID` | デプロイ先アカウント |

### 画像について

静的エクスポートではサーバー側の画像最適化が働かない（`images.unoptimized: true`）。
`public/` に画像を追加する際は、**表示サイズに見合うサイズへ事前に縮小してから**配置すること。

## DNS

`enknot.dev` は Cloudflare で管理している。サイト配信に関わるのは Workers のカスタムドメイン設定のみで、
**メール関連のレコード（iCloud の MX / SPF / DKIM、Resend の `send` サブドメインと DKIM、DMARC）は触らないこと。**
