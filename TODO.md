# 次にやること

enknot.dev リニューアル版（このNext.jsプロジェクト）で、次回以降に対応すべき項目。

## 優先度高
1. **プロジェクトの詳細・外部リンク** — `app/projects/page.tsx` のカードに、実際の制作物URLや詳細ページへの導線がない
2. **favicon の差し替え** — `app/favicon.ico` がNext.jsのデフォルトのまま。`public/enknot-logo.png` を使ったものに変更する
3. **問い合わせ導線の追加** — availability（`app/about/page.tsx`）に「業務委託受付中」とあるが、具体的な連絡方法（X DM／メール等）のCTAがない

## 優先度中
4. **プロジェクトのビジュアル** — `data/projects.ts` の各案件にスクリーンショット等の画像がない（テキストのみ）
5. **404ページのカスタマイズ** — Next.jsデフォルトのまま
6. **モバイル表示の最終確認** — ターミナルフレーム化・ヘッダー3カラム化など後半の大きな構造変更後、通しでモバイル確認していない

## 今回スコープ外（後回しでOK）
- 英語フルバージョン（i18n切替）
- `enknot.dev` への実デプロイ・独自ドメイン切り替え
- robots.txt / sitemap.xml（公開直前でOK）

## 参考: 現状の構成
- ナビ: home / about / projects / blog
- `/blog` は note・Zenn・dev.to から記事を自動取得（noteはRSS、Zennはfeed、dev.toは公式API）。件数が足りない場合は `data/blog-fallback.ts` のプレースホルダーで補完
- 既存のビルド済みファイル（元のDEBLUN OS風デザイン参考元）は `_legacy-build/` に退避済み
- 詳細な受入条件・非目標は `SPEC.md` を参照
