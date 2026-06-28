# Next.jsエンジニア向け AWS実践学習ロードマップ

## ゴール

Next.jsアプリを「作れる」だけでなく、**自力で公開し、責任を持って運用できる**状態を目指す。
最終的に `https://your-app.com` でアクセスでき、安全に更新・ロールバックし続けられることがゴール。

学習は3段階で進む。

```text
【段階1】手で全部立てる（フェーズ1〜10）  ← 仕組みを理解する
GitHub → EC2 → Docker → Nginx → Next.js → 独自ドメイン → HTTPS

        ↓ 同じアプリを作り直す

【段階2】マネージドに載せ替える（フェーズ11）  ← 実務の本番構成
GitHub Actions → ECR → ECS(Fargate) → ALB + ACM → Route 53

        ↓ 壊さず回し続ける

【段階3】運用する（フェーズ12）  ← サービスとして成立させる
シークレット管理 / DBマイグレーション / CIゲート / ロールバック / 監視
```

段階1は「中で何が起きているか」を体で理解するための教材、
段階2以降が「実務でそのまま使える」構成、という位置づけ。

---

# なぜこの構成なのか

AWSには様々なサービスがある。

- ECS
- EKS
- Lambda
- Amplify
- App Runner

など。

しかし学習目的で最初にやるべきなのは

```text
EC2 + Docker + Nginx
```

である。

理由は

- Linuxサーバーが理解できる
- Docker運用が理解できる
- ネットワークが理解できる
- DNSが理解できる
- HTTPSが理解できる

から。

この経験はどのクラウドでも活きる。

---

# フェーズ1: 公開用アプリを準備

## やること

既に作成済みのアプリを使う。

条件

- Next.js
- TypeScript
- 簡単なCRUDあり
- 認証ありならなお良い

例

- タスク管理
- 家計簿
- チャット
- メモアプリ

---

## Docker化

### Dockerfile作成

学習用にはまずシンプルな1段ビルドでOK。

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# lockfile通りに再現性よくインストール
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

> 💡 `npm install` ではなく `npm ci` を使うと、`package-lock.json` に従って毎回同じ依存関係でビルドできる(本番・CI向き)。

---

### .dockerignore も作る

不要ファイルをイメージに含めない。ビルドが速くなり、イメージも軽くなる。

```text
node_modules
.next
.git
npm-debug.log
.env*
```

---

### ローカル確認

```bash
docker build -t my-app .
```

```bash
docker run -p 3000:3000 my-app
```

確認

```text
http://localhost:3000
```

---

> 💡 補足: 本番向けの定番は multi-stage + standalone
>
> イメージサイズを大幅に削減でき、メモリの小さいインスタンスでも扱いやすくなる。
> まず `next.config.js` に `output: "standalone"` を追加してから、以下のDockerfileを使う。
>
> ```js
> // next.config.js
> const nextConfig = {
>   output: "standalone",
> };
> module.exports = nextConfig;
> ```
>
> ```dockerfile
> # ---- build stage ----
> FROM node:22-alpine AS builder
> WORKDIR /app
> COPY package*.json ./
> RUN npm ci
> COPY . .
> RUN npm run build
>
> # ---- run stage ----
> FROM node:22-alpine AS runner
> WORKDIR /app
> ENV NODE_ENV=production
> ENV HOSTNAME=0.0.0.0
> COPY --from=builder /app/public ./public
> COPY --from=builder /app/.next/standalone ./
> COPY --from=builder /app/.next/static ./.next/static
> EXPOSE 3000
> CMD ["node", "server.js"]
> ```
>
> standalone版は `npm start` ではなく `node server.js` で起動する点に注意。

---

# フェーズ2: AWSアカウント準備

## 作成

AWS公式サイトからアカウント作成。

> ⚠️ 料金の注意（2025年7月の改定）
>
> 2025年7月15日以降に作成した新規アカウントは、従来の「12か月・750時間無料」ではなく
> **クレジット制（サインアップで$100 + アクティビティで最大$100 ＝ 最大$200、6か月またはクレジット消費で終了）** に変わっている。
> t4g.small などもクレジットを消費しながら使う形になるので、**Budgets で請求アラートを必ず設定**しておくと安全。
> 学習が終わったらインスタンスは停止/削除してクレジットを節約する。

---

## IAMユーザー作成

ルートアカウントは普段使いしない。

```text
IAM
↓
User
↓
（学習用途として）AdministratorAccess
```

> 💡 本来は最小権限が原則。学習段階では Administrator でも可だが、慣れたら必要な権限だけに絞る習慣を。

---

## MFA設定

必須。

```text
Google Authenticator
または
Authy
```

ルートアカウント・IAMユーザーの両方に設定する。

---

# フェーズ3: EC2構築

## インスタンス作成

推奨

```text
Amazon Linux 2023
```

インスタンスタイプ

```text
t4g.small
```

勉強用途なら十分。

> 💡 t4g系はARM(Graviton)。後段の `docker build` を **このEC2上で実行する** 前提なので、イメージも自動的にARM向けになり整合する。
> ローカル(特にIntel Mac/Windows)でビルドしたx86イメージをそのまま持ち込むとアーキ不一致で動かないので注意。

---

## Elastic IP の割り当て（重要）

通常のパブリックIPはインスタンスの停止/起動で変わってしまう。
そのままだと後でDNS(Aレコード)が切れるため、固定IPを割り当てておく。

```text
EC2
↓
Elastic IP
↓
Allocate（割り当て）
↓
Associate（インスタンスに紐付け）
```

> 💡 Elastic IPは「インスタンスに紐付いている間は無料」だが、未割り当てのまま放置すると課金対象になる。使わなくなったら解放する。

---

## セキュリティグループ

許可

```text
22  SSH    → 自分のIPのみ（My IP）に限定
80  HTTP   → 0.0.0.0/0
443 HTTPS  → 0.0.0.0/0
```

> ⚠️ SSH(22)を `0.0.0.0/0`（全開放）にすると総当たり攻撃の的になる。必ず自分のグローバルIPに絞る。

---

## SSH接続

Mac/Linux

```bash
chmod 400 key.pem
```

```bash
ssh -i key.pem ec2-user@Elastic_IP
```

---

# フェーズ4: Linux操作

## 更新

```bash
sudo dnf update -y
```

---

## Git

```bash
sudo dnf install git -y
```

---

## Docker

```bash
sudo dnf install docker -y
```

起動

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 権限付与

```bash
sudo usermod -aG docker ec2-user
```

→ 反映には**再ログインが必要**(一度exitして入り直す)。

---

確認

```bash
docker ps
```

`sudo` なしで動けばOK。

---

# フェーズ5: アプリ配置

## GitHubから取得

```bash
git clone <repository>
cd <repository>
```

> 💡 プライベートリポジトリの場合はデプロイキー(SSH)やPersonal Access Tokenが必要。

---

## Dockerビルド

```bash
docker build -t my-app .
```

---

## 起動

```bash
docker run -d \
  -p 3000:3000 \
  --name app \
  --restart unless-stopped \
  my-app
```

> 💡 `--restart unless-stopped` を付けると、EC2再起動後もコンテナが自動で立ち上がる。

---

確認

```text
http://Elastic_IP:3000
```

見れれば成功。

---

# フェーズ6: Nginx導入

## インストール

```bash
sudo dnf install nginx -y
```

---

起動

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## リバースプロキシ設定

`/etc/nginx/conf.d/your-domain.conf` などに作成する。

```nginx
server {
    listen 80;

    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;

        # Next.jsを正しく動かすために必要なヘッダ
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

> ⚠️ `proxy_pass` だけでは不十分。
> 特に `Host` と `X-Forwarded-Proto` を渡さないと、HTTPS化後にNext.jsがhttp/httpsを誤認し、
> 認証(NextAuth等)・リダイレクト・絶対URL生成が壊れる。WebSocket/HMR用に `Upgrade`/`Connection` も必要。

---

反映

```bash
sudo nginx -t            # 設定の文法チェック
sudo systemctl reload nginx
```

> 💡 設定変更の反映は `restart` より `reload`(無停止リロード)が基本。

---

確認

```text
http://Elastic_IP
```

ポート番号なしで表示されればOK。

---

# フェーズ7: 独自ドメイン取得

おすすめ

- Cloudflare Registrar
- お名前.com

---

予算

```text
年間 1500〜3000円程度
```

---

# フェーズ8: DNS設定

Aレコード

```text
@    → Elastic IP
www  → Elastic IP
```

> 💡 `www` も使うなら、`www` のAレコード（または `@` へのCNAME）も忘れずに。
> Cloudflareを使う場合、最初はプロキシ(オレンジ雲)をオフ(DNS only)にしておくとCertbotの検証が通しやすい。

---

確認

```bash
dig your-domain.com +short
```

```text
http://your-domain.com
```

反映には少し時間がかかる(TTL次第)。

---

# フェーズ9: HTTPS化

## Certbot インストール

Amazon Linux 2023:

```bash
sudo dnf install -y certbot python3-certbot-nginx
```

> ⚠️ `--nginx` プラグインを使うので、`certbot` 単体ではなく `python3-certbot-nginx` も一緒に入れる。

> 💡 もし `dnf` でパッケージが見つからない場合は、公式推奨のpip(venv)経由でインストールする:
>
> ```bash
> sudo python3 -m venv /opt/certbot/
> sudo /opt/certbot/bin/pip install --upgrade pip
> sudo /opt/certbot/bin/pip install certbot certbot-nginx
> sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
> ```

---

証明書取得

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

メールアドレス入力・利用規約同意のあと、自動でNginx設定に443(HTTPS)が追記され、80→443リダイレクトも入る。

---

自動更新の確認

```bash
# タイマーで自動更新される（AL2023ではcertbot-renew.timer）
systemctl list-timers | grep certbot

# 更新が問題なく通るかテスト
sudo certbot renew --dry-run
```

---

成功後

```text
https://your-domain.com
```

になる。

---

# フェーズ10: 自動デプロイ

## GitHub Actions

学習テーマ

```text
push
↓
GitHub Actions
↓
EC2へSSH
↓
git pull
↓
docker build
↓
古いコンテナを停止・削除
↓
新しいイメージで起動
```

> ⚠️ よくある落とし穴: `docker restart` は **同じイメージのまま** 再起動するだけ。
> ビルドし直しても新しいコードは反映されない。必ず「stop → rm → run」する。

EC2側で実行するデプロイの中身(例):

```bash
cd ~/my-app
git pull
docker build -t my-app .
docker stop app || true
docker rm app || true
docker run -d -p 3000:3000 --name app --restart unless-stopped my-app
```

> 💡 Docker Composeを使うなら `docker compose up -d --build` の1行で同等のことができる(下記参照)。

---

> ⚠️ ビルド時のメモリに注意
>
> t4g.small はメモリ2GB。EC2上で `npm run build` を走らせるとOOM(メモリ不足)で落ちることがある。
> 対策の例:
>
> - **CI(GitHub Actions)側でビルドしてイメージをレジストリ(ECR / GHCR)にpush → EC2はpullするだけ** にする（推奨）
> - もしくはEC2にスワップを追加する
>
> ```bash
> sudo dd if=/dev/zero of=/swapfile bs=128M count=16   # 2GB
> sudo chmod 600 /swapfile
> sudo mkswap /swapfile
> sudo swapon /swapfile
> ```

---

これを構築すると

```bash
git push
```

だけで本番反映できる。

---

# 追加学習（優先度高）

## Docker Compose

アプリ + DBをまとめて管理できる。

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## PostgreSQL

EC2上にコンテナで構築（上記Compose）

または

AWS RDSを利用（本番ではこちらが管理しやすい）

---

## CloudWatch

ログ・メトリクス監視

---

## S3

画像など静的ファイルの保存

---

# フェーズ11: マネージド構成で作り直す（実務寄りの本番運用）

ここまでで「全部手で立てる」経験を積んだ。
最後に、**同じアプリをマネージドサービスで作り直す**。

目的は「手でやると分かる → 任せると速い・壊れない」を両方体験すること。
フェーズ1〜10で手作業した部分の多くは、実務ではマネージドサービスに置き換わる。

## 手動構成 → マネージド構成 の対応表

| フェーズ1〜10（手動）           | 実務でのマネージド構成                              |
| ------------------------------- | --------------------------------------------------- |
| Nginx + Certbot でTLS終端・更新 | **ALB + ACM**（証明書の発行・自動更新込み）         |
| 生EC2上で `docker run`          | **ECS / Fargate**（サーバー管理不要のコンテナ実行） |
| その場で `docker build`         | **ECR** にpushして配布                              |
| SSH + git pull デプロイ         | **GitHub Actions → ECR push → ECSローリング更新**   |
| 手作業でリソース作成            | **AWS CDK / Terraform**(IaC)                        |
| Elastic IP + 自前DNS            | **Route 53 + ALB**（DNSとヘルスチェック連携）       |

> 💡 ポイント: 手動構成は「学習用の教材」、マネージド構成は「実務の本番」。
> ここを区別して両方さわっておくと、現場でどちらの話が出ても理解が追いつく。

---

## ステップ1: イメージを ECR に置く

まずビルド済みイメージをレジストリ(ECR)に上げる。
これがマネージド構成すべての起点になる。

```bash
# ECRリポジトリ作成
aws ecr create-repository --repository-name my-app

# ログイン（<account>と<region>は自分の値に）
aws ecr get-login-password --region <region> \
  | docker login --username AWS --password-stdin \
    <account>.dkr.ecr.<region>.amazonaws.com

# タグ付けしてpush
docker tag my-app:latest <account>.dkr.ecr.<region>.amazonaws.com/my-app:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/my-app:latest
```

> 💡 t4g(ARM)とビルド環境のアーキを揃えること。x86でビルドしてFargate(x86)に載せる、ARMで揃える、のどちらかに統一する。

---

## ステップ2-A: まずは最速ルート — ECS Express Mode

2025年11月に登場した **ECS Express Mode** が、現状いちばん簡単なマネージド入口。
ECRイメージを指定するだけで、**ALB・HTTPS・オートスケール・CloudWatchログ・URL発行**まで自動で用意される。

- コンソールの「Express mode」→ ECRイメージを指定 → 作成、だけで
  **HTTPS付きのURLが数分で払い出される**
- 作られたリソース(ALB / ACM証明書 / ターゲットグループ / セキュリティグループ等)は
  **すべて自分のアカウントに残り、後から細かく触れる**(ロックインされない)
- ALBは最大25サービスで共有されるので、小規模なら割安
- CI/CDは公式の GitHub Action `aws-actions/amazon-ecs-deploy-express-service` が使える

```text
push
↓
GitHub Actions
↓
docker build → ECR push
↓
ECS Express Mode サービス更新（ローリングデプロイ）
```

> ⚠️ App Runner について
> AWSの「Heroku的に超簡単」枠だった **App Runner はメンテナンスモード**に移行済み。
> 新規顧客の受付は2026年4月30日で終了し、AWSは後継として **ECS Express Mode を推奨**している。
> 古いチュートリアルだとApp Runnerが出てくるが、今から学ぶなら Express Mode を選ぶ。
> （Express Mode はApp Runnerと違いスケール・トゥ・ゼロ非対応／1サービス1コンテナ、という違いはある）

---

## ステップ2-B: 本格ルート — ECS Fargate（フルコントロール）

Express Modeで物足りなくなったら、標準の **ECS on Fargate** に進む。
サイドカー、Blue/Greenデプロイ、細かいIAM・VPC制御など、本番で必要になるものが全部できる。

構成要素

```text
ECR（イメージ）
↓
ECS Service（Fargate / タスク定義）
↓
ALB（ルーティング + ヘルスチェック）
↓
ACM（TLS証明書）
↓
Route 53（独自ドメイン）
```

この構成では、フェーズ9でやったCertbotは不要になる。
**証明書はACMで発行 → ALBにアタッチ**するだけで、更新も自動。

---

## ステップ3: IaC（インフラをコード化）

手作業で作ったものを **AWS CDK**(TypeScriptで書ける) か **Terraform** でコード化する。
Next.jsエンジニアなら型のあるCDK(TypeScript)が入りやすい。

```bash
npm install -g aws-cdk
cdk init app --language typescript
# VPC / ECS Cluster / Fargate Service / ALB / ACM をコードで定義
cdk deploy
```

> 💡 「コンソールでポチポチ作る → 同じものをCDKで再現する」の順でやると、
> 各リソースが何のために要るのかが腹落ちする。
> ここまで来ると「環境を消して、コマンド一発で作り直せる」状態になる＝実務レベル。

---

## フェーズ11のゴール

- 手動(EC2)とマネージド(ECS)の **両方** を構築した経験がある
- TLS終端を「Nginx+Certbot」でも「ALB+ACM」でも作れる
- イメージをECRに置き、CI/CDで自動デプロイできる
- インフラをコード(CDK/Terraform)で再現できる

この状態が、個人開発で完結でき、かつそのまま実務に持ち込める到達点。

---

# フェーズ12: 運用編（壊さず回し続ける）

ここまでで「作れる・公開できる」は完成。
フェーズ12は **「動かした後、壊さず回し続ける」** ためのDay-2運用。
ここを押さえると「公開できる」から「責任を持って運用できる」に変わる。

---

## 1. 環境変数・シークレット管理

`DATABASE_URL`・APIキー・認証シークレットの扱い。**実アプリでは必須**。

### Next.js特有の注意点

- `NEXT_PUBLIC_` 付きの変数は **ビルド時にクライアントJSへ焼き込まれる** → 公開される。秘密情報を入れてはいけない。
- 接頭辞なしのサーバー用変数は **実行時** にNodeサーバー側で読まれる(Server Component / Route Handler / API Routeで使う)。
- Dockerでは「ビルド時に必要な値(`NEXT_PUBLIC_*`)」と「実行時に渡す値(サーバー用)」を区別する。前者は `--build-arg`、後者は実行時に渡す。

### 鉄則

- **イメージにシークレットを焼き込まない**。`.env*` は `.dockerignore` で除外し、Gitにも commit しない。
- 手動EC2: `docker run --env-file .env`(ファイルは権限600)か、SSM Parameter Storeからデプロイ時に取得。
- ECS/Fargate: タスク定義の `secrets` で **Secrets Manager / SSM Parameter Store のARNを参照** → 環境変数として安全に注入(値が定義やログに出ない)。
- GitHub Actions: リポジトリ/Environmentの Secrets に保存して注入。

```yaml
# ECSタスク定義（抜粋）: 秘密はSecrets ManagerのARNで参照
"secrets": [{ "name": "DATABASE_URL", "valueFrom": "arn:aws:secretsmanager:...:secret:db-url" }]
```

---

## 2. DBマイグレーション

スキーマ変更を安全に本番へ反映する仕組み。RDSを使うなら避けて通れない。

- **Prisma**: 本番では `prisma migrate deploy`(未適用のマイグレーションを非対話で適用)。`migrate dev` は開発専用。
- **Drizzle**: `drizzle-kit migrate`。
- **実行タイミング**: コンテナ起動時に毎回流すと多インスタンスで競合しうる。**デプロイパイプラインの専用ステップ**(またはECSの単発タスク)で、新バージョンへ切り替える**前**に1回流すのが安全。
- **コネクション枯渇対策**: Fargateのタスク数が増えるとPostgresの接続上限を超えやすい。**RDS Proxy** やプーラ(PgBouncer)、Prismaなら `connection_limit` で対処。
- **バックアップ**: RDSの自動バックアップ(保持期間)を有効化。リスクの高いマイグレーション前は手動スナップショットを取る。

```bash
# デプロイ手順の中で、トラフィック切替の前に実行
npx prisma migrate deploy
```

---

## 3. CIにゲートを入れる

今のGitHub Actionsは「build → deploy」だけ。本番前に **lint / 型チェック / テスト** を通す段を入れる。
1つでも落ちたらデプロイしない、が実務の最低ライン。

```yaml
# .github/workflows 抜粋
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npx tsc --noEmit # 型チェック
      - run: npm run lint # Lint
      - run: npm test # テスト
  deploy:
    needs: check # checkが通った時だけ
    runs-on: ubuntu-latest
    steps:
      # build → ECR push → ECS更新
      ...
```

> 💡 PRではcheckだけ、`main` へのmergeでcheck→deploy、という分け方が定番。

---

## 4. イメージタグ戦略とロールバック

`:latest` だけの運用は「どのコードが本番か分からない・戻せない」状態になる。

- イメージは **git SHA でタグ付け**(`${{ github.sha }}`)してpush。タグは上書きしない(イミュータブル)。
- デプロイはSHA指定で行う → 壊れたら **前のSHAに戻すだけ** でロールバックできる。
- ECSなら「サービスを前のタスク定義リビジョンに戻す」で即ロールバック。
- ECRに **ライフサイクルポリシー** を設定して古いイメージを自動削除(ストレージ代の節約)。

```bash
# git SHAでタグ付け（latestも任意で併用）
docker tag my-app:latest <ecr>/my-app:${GIT_SHA}
docker push <ecr>/my-app:${GIT_SHA}
```

---

## さらに先（任意・必要になったら）

- **監視・アラート**: Sentryでエラー追跡、CloudWatchアラーム(5xx率・p95レイテンシ・異常タスク数)、外形監視(死活チェック)。ログの保持期間も設定してログ代の暴発を防ぐ。
- **堅牢化**: OSの自動セキュリティ更新(`dnf` のcron)、公開ALBには **WAF** を付ける、IAMは最小権限へ。
- **ゼロダウンタイムデプロイ**: 手動の `stop → rm → run` は一瞬落ちる。ECS/Express Modeのローリング更新なら無停止。
- **ステージング環境**: 本番とは別に検証用環境を分ける。

---

## フェーズ12のゴール

- シークレットをイメージに焼き込まず、安全に注入できる
- DBスキーマ変更をマイグレーションで安全に反映できる
- テスト/型チェックを通過したものだけが本番に出る
- いつでも前のバージョンに戻せる(ロールバックできる)

この状態まで来ると、「公開できる」から **「責任を持って運用できる」** に変わる。

---

# 完了後に得られるスキル

**手動構成（フェーズ1〜10）**

- Linuxサーバー運用
- Docker運用
- Nginx(リバースプロキシ)
- DNS
- HTTPS(Let's Encrypt / Certbot)
- AWS EC2 / Elastic IP / セキュリティグループ
- GitHub Actions
- デプロイ自動化
- 本番環境構築

**マネージド構成（フェーズ11）**

- ECR(コンテナレジストリ)
- ECS Express Mode / ECS on Fargate
- ALB + ACM(TLS終端・自動更新)
- Route 53(DNS連携)
- IaC(AWS CDK / Terraform)

**運用（フェーズ12）**

- シークレット管理(Secrets Manager / SSM)
- DBマイグレーション運用(Prisma / Drizzle)+ RDS Proxy / バックアップ
- CIゲート(lint / 型チェック / テスト)
- イメージタグ戦略とロールバック
- 監視・アラート、堅牢化(WAF / 最小権限)の基礎

ここまでできれば、

> 「Next.jsでアプリを作れます」

から一歩進んで、

> 「自分でサービスを公開・運用できます」

と言えるレベルになります。
