# SPEC: ENKNOT ポートフォリオサイト再構築

## 目的
- 現状 `/Users/st/Desktop/test` にある第三者制作のポートフォリオ（"DEBLUN OS" 風デスクトップUI、Debabrata Giri氏の作品）を**視覚的な着想元**とし、独自コードで書き起こした新しいポートフォリオサイトを作る。
- コンテンツは依頼者本人（Shuto／屋号 ENKNOT）の情報に差し替え、将来的に本番サイト `enknot.dev` を置き換える。

## スコープ

### 含む
- `/Users/st/Desktop/test` 内に Next.js プロジェクトを新規構築する（既存 `index.html` / `assets/` は `_legacy-build/` に退避して保持）
- セクション: `home`（トップ/ダッシュボード風の見せ場）, `projects/work`（実績案件）, `resume/skills`（経歴・スキル）
- サイドバー上部のブランド表示を「ENKNOT｜AI × Web Developer」にする
- ヘッダーに小さなライト/ダーク切替トグルを設置
- ヘッダーまたはフッターに常時、連絡先/SNS（GitHub・X・ブログ）リンクを表示
- 元サイトの視覚的特徴を再現（独自実装）: キャンバスアニメーション背景、方位磁石風SVG装飾、時計・日付表示
- コンテンツは enknot.dev から抽出した情報を反映
  - 経歴: ハウスメーカー営業6年（宅地建物取引士）→ 海外生活約1年半 → Webエンジニアへキャリアチェンジ
  - スキル: TypeScript, React, Next.js, Astro, Node.js, Laravel, Linux, AWS, Vercel
  - 案件: クライアント案件6件（セブ島IT留学サイト、児童書専門店サイト、ガラス面広告LP、心理カウンセリングサイト、カーコーティングLP、EC支援コンサルLP）＋個人開発4件（不動産物件検索AIエージェント、応募者AIランキング、不動産業務管理API、オンライン書店ECサイト）
- 表示言語: 日本語メイン、要所で英語表記を混在

### 含まない（非目標）
- `terminal` のコマンド入力インターフェース
- `playground` のミニゲーム（Snake / Tic-Tac-Toe 等）
- `notes` / `settings` の独立セクション（テーマ切替はヘッダーの小さなトグルのみに留める）
- 英語フルバージョン（i18n切替）の実装 → 将来フェーズで対応
- Git管理の開始（今回は見送り。作業前に手動バックアップ推奨）
- `enknot.dev` への実デプロイ・DNS切替（今回はローカル構築のみ）

## 受入条件
- `npm run dev` でローカル起動し、`home` / `projects-work` / `resume-skills` の3セクションを表示・遷移できる
- コンテンツが enknot.dev 記載の情報（Shuto/ENKNOT、経歴、スキル、案件10件）に置き換わっている
- サイドバー上部表示が「ENKNOT｜AI × Web Developer」になっている
- ヘッダーのライト/ダーク切替トグルが機能する（後述のカラー定義で切り替わる）
- 連絡先/SNSリンク（GitHub・X・ブログ）が常時表示されている
- モバイル/デスクトップでレイアウトが崩れない
- 参考2リポジトリ・元DEBLUN OSサイトのコードを直接転用していない（独自実装）
- 既存の `index.html` / `assets/` が削除されず `_legacy-build/` に保存されている

## 仕様詳細
- **技術スタック**: Next.js (App Router) + React + TypeScript + Tailwind CSS
- **フォント**: 元サイトと同系統の Google Fonts（Londrina Outline / Source Code Pro）を継続利用
- **カラースキーム**（元サイトのCSS変数を参考値として採用、独自トーンに調整可）
  - ライト: background `#f4f3ef` / primary文字 `#0a0a0a`
  - ダーク: background `#0b0d10` / primary文字 `#f4f3ef`
  - アクセント: 緑系（`#22c55e` 相当）
- **コンポーネント構成（想定）**
  - Layout: Sidebar（ブランド表示＋セクションナビ） + Header（時計/日付/テーマトグル/連絡先リンク） + MainContent
  - Home: キャンバスアニメーション背景 + 方位磁石SVG装飾 + イントロ文
  - ProjectsWork: クライアント案件6件＋個人開発4件のカード一覧
  - ResumeSkills: 経歴タイムライン＋スキル一覧
- **参考にする既存資料**
  - 視覚デザイン: 現ディレクトリの `_legacy-build/index.html`（DEBLUN OS）
  - 機能着想のみ（コード非転用）: `cosmicwanderer7/Terminal-Portfolio`, `sathishk-dev/terminal-portfolio`
  - コンテンツ: `enknot.dev`

## 例外・境界
- 参考2リポジトリはコードを転用しない
  - `cosmicwanderer7/Terminal-Portfolio`: CC BY-SA 4.0（コード転用時は帰属表示＋同ライセンス継承が必要なため、今回は着想のみ利用）
  - `sathishk-dev/terminal-portfolio`: ライセンス表記なし（無断転載不可のため、コードは一切参照・転用しない）
- 元DEBLUN OSサイトも第三者作品のため、コード・文言・画像アセットは一切転用せず、レイアウト思想（構図・雰囲気）のみ参考にする

## テスト方針
- 自動テストは設けず、`npm run dev` でのブラウザ目視確認を基本とする
- 主要ブレークポイント（モバイル/デスクトップ）でのレイアウト崩れを目視確認

## 互換性
- 既存の `index.html`, `assets/` は `_legacy-build/` 配下に退避し保持する（参照用として残す）
- 同ディレクトリ内に `package.json` 等の新規ファイル一式が追加される

## 移行・ロールバック
- 今回はローカル構築のみ。`enknot.dev` への実デプロイ・DNS切替は別タスクとして後日合意の上で実施する
- ロールバックは新規追加ファイル一式を削除し `_legacy-build/` の内容を元の場所に戻すことで復元可能（Git未管理のため、作業開始前の状態を `_legacy-build/` として保存しておく）
