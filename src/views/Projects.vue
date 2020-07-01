<template>
  <v-container>
    <v-card elevation="10">
      <v-card-title class="headline font-weight-bold pb-8"
        >プロジェクト一覧</v-card-title
      >
      <v-card-subtitle class="subtitle-1">
        <ul>
          <li>
            ポートフォリオサイトへのご訪問ありがとうございます！プログラミング独学の題材として制作したものを、一部ご紹介します。
          </li>
          <li>
            題材を決めるに当たっては「自分が実際に使いたいツールを作ろう」を主眼に置きました。
          </li>
          <li>
            それぞれにデモページを設けましたので、ぜひご覧ください。
          </li>
        </ul>
      </v-card-subtitle>
    </v-card>
    <v-card elevation="10" class="my-8">
      <v-card-title class="headline">目次</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="projectHeaders"
          :items="projects"
          hide-default-footer
          :items-per-page="20"
        >
          <template v-slot:item.projIndex="{ item }">
            {{ projectIds.indexOf(item.identifier) + 1 }}
          </template>
          <template v-slot:item.name="{ item }">
            <b
              ><router-link :to="addSharp(item.identifier)">{{
                item.name
              }}</router-link></b
            ><br />
          </template>
          <template v-slot:item.desc="{ item }">
            <p class="my-3"><span v-html="item.desc"></span></p>
          </template>
          <template v-slot:item.rating="{ item }">
            <v-icon v-for="index in item.rating" :key="index">mdi-star</v-icon>
          </template>
          <template v-slot:item.demourl="{ item }">
            <a
              v-if="item.demourl.length != 0"
              :href="item.demourl"
              style="text-decoration: none;"
              ><v-icon large color="blue darken-1">mdi-open-in-new</v-icon></a
            >
          </template>
          <template v-slot:item.githuburl="{ item }">
            <a v-if="item.githuburl.length != 0" :href="item.githuburl">
              <i class="fab fa-github fa-2x"></i>
            </a>
          </template>
          <template v-slot:item.backends="{ item }">
            <span v-if="item.backends.length == 0">-</span>
            <p
              v-else
              v-for="(backend, index) in item.backends"
              :key="index"
              class="ma-0 pa-0"
            >
              {{ backend }}
            </p>
          </template>
          <template v-slot:item.frameworks="{ item }">
            <v-icon v-if="isUsing(item.frameworks, 'js')" large
              >mdi-language-javascript</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'php')" large
              >mdi-language-php</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'laravel')" large
              >mdi-laravel</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'vue')" large
              >mdi-vuejs</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'react')" large
              >mdi-react</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'py')" large
              >mdi-language-python</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'c')" large
              >mdi-language-c</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'html')" large
              >mdi-language-5</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'md')" large
              >mdi-language-markdown</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'nuxt')" large
              >mdi-nuxt</v-icon
            >
            <v-icon v-if="isUsing(item.frameworks, 'firebase')" large
              >mdi-firebase</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-card
      v-for="(project, index) in projects"
      :key="index"
      elevation="10"
      class="my-8"
    >
      <v-toolbar
        flat
        class="white--text"
        :color="bgColors[index % 3]"
        :id="project.identifier"
        dark
      >
        <v-toolbar-title>
          <span class="font-weight-bold">
            {{ index + 1 }}. {{ project.name }}
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="project.demourl.length != 0"
          outlined
          large
          :href="project.demourl"
          class="px-3 mr-2 font-weight-bold subtitle-1"
        >
          <v-icon class="mr-1" large>mdi-open-in-new</v-icon
          ><span class="d-none d-md-flex">Open Demo</span></v-btn
        >
        <v-btn
          v-if="project.githuburl.length != 0"
          outlined
          large
          :href="project.githuburl"
          class="px-3 font-weight-bold subtitle-1"
        >
          <v-icon class="mr-1" large>mdi-github</v-icon>
          <span class="d-none d-md-flex">Open GitHub</span>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-card outlined class="my-2">
          <v-card-title>機能</v-card-title>
          <v-card-text>
            <ul>
              <li
                v-for="(func, index) in project.funcs"
                :key="index"
                class="comfy_list"
                v-html="func"
              ></li>
            </ul>
            <img :src="project.funcImg" class="mt-4" />
          </v-card-text>
        </v-card>
        <v-card outlined class="my-2">
          <v-card-title>技術ポイント</v-card-title>
          <v-card-text>
            <ul>
              <li
                v-for="(tech, index) in project.techs"
                :key="index"
                v-html="tech"
                class="comfy_list"
              ></li>
            </ul>
            <v-container fluid>
              <v-row>
                <v-col v-for="(img, index) in project.techImgs" :key="index">
                  <ImageDialog :uri="img"></ImageDialog>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card outlined>
          <v-card-title>学んだこと</v-card-title>
          <v-card-text>
            <ul>
              <li
                v-for="(achv, index) in project.achvs"
                :key="index"
                v-html="achv"
                class="comfy_list"
              ></li>
            </ul>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ImageDialog from "../components/ImageDialog";

export default {
  name: "Projects",
  components: { ImageDialog },
  data: function() {
    return {
      projectIds: [],
      projects: [
        {
          name: "寮会計システム",
          identifier: "dorm",
          rating: 3,
          desc:
            "学生寮の<u>業務自動化ツール</u>。寮生情報管理や会計処理機能があり、最も実用的なプロジェクトです。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/dorm-management-app",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
          funcs: [
            "私が実際に住んでいる某寮で使うことを想定した作りになっています。",
            "<b>寮紹介：</b>　入寮希望者を対象にした、寮の基本情報です。",
            "<b>寮生情報の管理</b>： 寮生個人の基本情報を管理します。",
            "<b>居室の管理</b>：　部屋ごとの空室状況や故障箇所の情報を管理します。",
            "<b>賞罰の計算</b>：　「委員長」や「会計委員」などの寮の役職を務めた寮生には報酬を与え、逆に掃除をサボるなどした寮生には罰金を課します。",
            "<b>寮費支払の記録</b>： 月々の寮費の支払記録（寮費の内訳は？寮費をちゃんと払ったのは誰？？寮費を滞納している不届き者は誰？）を管理します。",
            "<b>役職履歴の記録</b>：　役職者の任期を管理し、賞罰に反映します。",
            "<b>ログイン</b>： 閲覧や情報編集の権限を管理します。"
          ],
          funcImg: "",
          techs: [
            "<u>Vue.js + Vue Router</u>",
            "<u>Laravelによるルーティング</u>: Blade, Resource Controller, Laravel Mix",
            "<u>LaravelによるDB管理</u>: Migration, Model, Seeding, Relationship",
            "<u>Laravelによる認証管理</u>: Auth, Guard",
            "sessionStorage",
            "<u>Eloquent ORM + Postgres</u>: Foreign Key, one-to-manyなどのrelationships, $appendsアクセサによるカラム値の自動生成などを使っています。",
            "Cypressによるテスト自動化",
            "<u>AWSへの展開</u>"
          ],
          achvs: [
            "初めての本格的なWeb App構築でした。DBの設定からフロントエンドとバックエンドの連携まで、本当に多くの新しい知見を得ました。",
            "Axiosによって頻繁にDBにアクセスするため、<u>async/awaitなどの非同期処理と、v-ifやcomputedなどを使ってレンダリングのタイミングを管理すること</u>が重要になり、かなり苦労させられました。",
            "Vueコンポーネントが増えてくると、<u>要素同士の疎結合や、命名規則の一貫性</u>がきちんとしているかどうかが死活問題となってきて、その大切さが身にしみました。センスのない命名をしてしまったために後から整合性がとれなくなり、後からDBのカラム名や変数名を変更する必要に迫られて、コードを何十箇所も修正したこともありました。",
            "<u>ドキュメンテーション</u>を整備しました。自分にとってはわかりきっている機能やコードの構造も、他人に説明しようとするのは想像以上に大変でした。",
            "業界でデファクトスタンダードになっているAWSにようやく触れ、本格的なエンジニアになるために一歩近づけたと思います。"
          ]
        },

        {
          name: "激強五目並べ",
          identifier: "gomoku",
          rating: 3,
          desc:
            "コンピュータを相手に戦う五目並べです。強すぎてほぼ勝てません。<a href='https://github.com/azureleaf/gomoku'>React版</a>は私が最初につくったWebアプリなので思い入れが深いです。<u>Vue / Vuexによるイベント処理</u>の練習台。",
          demourl: "https://azureleaf.github.io/gomoku-vue/",
          githuburl: "https://github.com/azureleaf/gomoku-vue",
          frameworks: ["vue", "react"],
          backends: [],
          funcs: [
            "人間側が盤面に石を置くと、<u>COM側が独自のアルゴリズムで盤面を評価し、効果的な手を返してきます。</u>",
            "<u>盤面サイズ変更や盤面リセットの機能</u>があります。",
            "<u>SVGアニメーション</u>、手数の表示、勝者や引き分けのダイアログボックス表示、誤操作防止など操作感の細かい部分も詰めてUIを洗練させました。"
          ],
          funcImg: "",
          techImgs: [
            "./gomoku-event-flow.jpg",
            "./gomoku-score-matrix.jpg",
            "./gomoku-matching-flow.jpg"
          ],
          techs: [],
          achvs: [
            "Vuetifyによるマテリアルデザイン、CDNによるWebフォント、配色、CSSのカスタマイズにかなりこだわり、<u>ポップなデザインの世界観</u>をデザインしました。",
            "<u>Vuexによる状態管理</u>を理解しました。",
            "<u>デザインの細かな違いが、サイト全体の印象や操作感に相当に大きな影響を与える</u>ことを実感しました。"
          ]
        },
        {
          name: "仙台おでかけアシスタントBot",
          identifier: "line",
          rating: 3,
          desc:
            "<u>Heroku上で動くLINEボット</u>。GPSの現在位置を投げると、近くの地下鉄駅、バス停、仙台の天気を教えてくれる便利なツールです。",
          demourl: "https://azureleaf.github.io/greet_bot/",
          githuburl: "https://github.com/azureleaf/greet_bot",
          frameworks: ["py"],
          backends: ["Flask + SQLite + Heroku"],
          funcs: [
            "テキストでメッセージを投げると、<u>仙台の現在の天気情報と３時間毎の予報</u>をダイジェストで教えてくれます。",
            "今の GPS 情報を伝えると、<u>現在位置から近い地下鉄駅の名前と直線距離、および直近の発車時刻</u>を教えてくれます。",
            "今の GPS 情報を伝えると、<u>現在位置から近いバス停の名前と直線距離</u>を教えてくれます。"
          ],
          funcImg: "",
          techs: [
            "Pythonの<u>Flask</u>フレームワークをHeroku上で動かしています。",
            "バス停と地下鉄駅の緯度経度情報は、国交省サイトから入手してデータ整形。<u>Element Tree</u>でXMLを解析するのに手こずりました。",
            "地下鉄時刻表は、<u>仙台市交通局ウェブサイトからウェブスクレイピング。</u>",
            "<u>球面三角法</u>により緯度経度の差分からメートル距離を算出。",
            "市営バスの時刻表データが手に入らないので、このBotでは「バスがいつ発車するのか」がわかりません。<u>結局は情報の入手難度が、データ分析のネックになる</u>という…</u>"
          ],
          achvs: [
            "<u>LINE Messaging API</u>と<u>Herokuへのデプロイ</u>を学びました。Herokuサーバーがアメリカにあるせいで時間の処理が狂い、面食らったことも。",
            "<u>GPS位置情報</u>の処理に触れました。",
            "<u>Shell ScriptとFFMPEG</u>で動画を効率的に編集しました。",
            "<u>Ngrok</u>の使いかたがわかりました。ただなぜかサーバーが反応しないときもあって苦労させられました。"
          ]
        },
        {
          name: "仙台高齢化地域の可視化",
          identifier: "ageing",
          rating: 2,
          desc:
            "町ごとの高齢人口の比率を、地図の上にヒートマップとして描画します。市民の一人として興味がありました。<u>Pythonでのデータ処理と可視化</u>の練習台。",
          demourl: "https://azureleaf.github.io/ageing-sendai/",
          githuburl: "https://github.com/azureleaf/ageing-sendai",
          frameworks: ["py", "js", "c"],
          backends: [],
          funcs: [
            "高齢化率を地区ごとに色分けしているので、一目瞭然です。",
            "地図上でインタラクティブに操作できます。",
            "クリックすると詳細情報がポップアップで表示できます"
          ],
          funcImg: "./ageing_heatmap_screenshot.jpg",
          techs: [
            "<u>Leaflet.js</u>で、OpenStreetMapの地図上に描画します。",
            "Pythonの<u>Pandas</u>やC言語でデータを加工します。",
            "<u>カラーマッピング</u>（どの値をどの色に対応させれば見やすいのか？）の有名な計算手段を<a href='https://azureleaf.github.io/ageing-sendai/colormap.html'>いくつか検討しました</a>。",
            "「町別の年齢人口分布統計のExcelファイル」「町別の緯度経度情報のExcelファイル」など<u>複数の表をうまくJOINできるようデータを整形</u>しました。",
            "「重複データを発見して取り除く」「４丁目と四丁目の表記のゆれを統一する」「データ区分ごとの集計」などの面倒だけど考慮しなければならない煩雑な処理は、全てコーディングで処理します。"
          ],
          achvs: [
            "地図を使った可視化の勉強になりました。<u>色鮮やかでインタラクティブなUI</u>は、やはりインパクトがあります。",
            "<u>分析前の生データの質</u>がどれほど重要か、身にしみました。「苦労してデータ処理したら、後から元データの不備が判明してそこまでの苦労が水の泡」が何度もありました。"
          ]
        },
        {
          name: "通院アシスタント",
          identifier: "hospital",
          rating: 2,
          desc:
            "私のかかりつけ病院への<u>「オンライン受診予約」と「混雑状況の定時取得」を自動化</u>します。実生活で一番役立っているプログラムです。ウェブスクレイピングの題材。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/hospital_latency",
          frameworks: ["py", "vue", "js"],
          backends: ["SQLite"],
          funcs: [
            "<u>自動予約機能</u>: この病院では、診察前にインターネット上で診療を予約し、予約番号を取得することが必要です。このツールはブラウザを自動で操作し、予約に必要な情報（名前や診察券番号など）を入力します。タイマーを設定できるようになっているので、予約受付開始時間になると勝手にやってくれます。",
            "<u>混雑状況の取得機能</u>: この病院は診察中の患者の予約番号をインターネット上で公開しています。このツールはこのサイトに自動で定時に（たとえば15分置き）自動でアクセスし、表示されている番号を取得しDBに保存していきます。",
            "<u>混雑状況の傾向を可視化</u>: 上記のプログラムで溜めたデータを集計し、毎日どれくらいの速度で診察が進むのかをざっとグラフに図示します。"
          ],
          funcImg: "",
          techs: [
            "自動予約の動作に、テストツールである<u>Selenium</u>",
            "ウェブサイトへの自動アクセスとウェブスクレイピングに<u>BeautifulSoup</u>モジュール",
            "Pythonの<u>sched</u>モジュールにより予約や取得のタイマー機能を実現",
            "グラフの可視化には<u>matplotlib</u>モジュール"
          ],
          achvs: [
            "この病院は人気が高く、予約を取るのが先着順の凄まじい競争になっていました。<u>早朝に早起きしてパソコンの前で待ち構え、予約受付開始とともにできるだけ早く予約を完了する必要があったのです。</u>自動化でとても楽になりました。"
          ]
        },
        {
          name: "チャットツール ChatQuack",
          identifier: "chat",
          rating: 2,
          desc:
            "国産チャットアプリ「Chatwork」を勉強のため模写し、その中で<u>NuxtとFirebase</u>を使ってみました。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/chat-quack/",
          frameworks: ["nuxt", "firebase"],
          backends: ["Firebase"],
          funcs: [
            "複数のメンバーの間でメッセージを送れます。グループチャットも可能です。",
            "レイアウト配置、配色、ボタン、編集機能までUIをかなり忠実にコピーしました。"
          ],
          funcImg: "",
          techs: [
            "<u>Firebase</u>によるシンプルかつリアルタイムなチャットを実現しています。",
            "<u>Nuxt.js + Vuetify</u>によるマテリアルデザイン。"
          ],
          achvs: [
            "FirebaseとNuxtに触ることができました。最低限の設定ですぐ使えるようかなり整備されているので楽でした。"
          ]
        },
        {
          name: "三角形の五心を描こう",
          identifier: "triangle",
          rating: 2,
          desc:
            "マウスで三角形を描くと、その重心などを補助線付きで図解します。私が関心を持っている分野のひとつ、<u>EdTech（ITによる教育の効率化）</u>を意識したツールです。",
          demourl:
            "https://azureleaf.github.io/canvas/triangle/triangle_centers.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
          funcs: [
            "Canvas内部で３点をクリックすると、五心（重心・外心・内心・垂心・傍心）の図形を補助線とともに描画します。",
            "三角形の自動生成機能や、五心それぞれの表示を切り替えるチェックボックスにより、表示内容を様々にカスタマイズできます。",
            "ウィンドウのサイズなどを検知し、見やすい最適なレイアウトで表示します。"
          ],
          funcImg: "",
          techs: [
            "Vue.jsを使わない、<u>生のJavaScriptでのDOM処理</u>を行っています。",
            "DOM要素のうち繰り返し処理が必要な箇所は、<u>document.createElement()</u>などを使って一括で生成。",
            "UI要素やGridレイアウトによるBreakpoint指定に<u>Bootstrap</u>を活用。"
          ],
          achvs: [
            "<u>HTML Canvas</u>のイベント処理、Bootstrapの使い方がわかりました。",
            "<u>JSDoc</u>などコーディング規約を知りました。",
            ".forEach()やオブジェクト指向を使って可読性を向上させることを勉強しました。"
          ]
        },
        {
          name: "仙台の気候指標を図解する",
          identifier: "climate",
          rating: 1,
          desc:
            "日本７大都市の気候を比較します。仙台の気候の良さは日本有数だと思うのですが、それを確かめたかったのです。<u>Chart.jsによるデータ可視化</u>の練習台です。",
          demourl: "https://azureleaf.github.io/japan-city-climate/",
          githuburl: "https://github.com/azureleaf/japan-city-climate",
          frameworks: ["js", "py"],
          backends: [],
          funcs: [
            "各都市の真夏日、降水量、平均気温など基本的な気候統計を可視化します。",
            "表示する期間を自由に設定できます。最長だと1990年から2020年までの30年分を表示できます。"
          ],
          funcImg: "",
          techs: [
            "ダウンロードしてきたデータはそのままでは利用できないので、不要な列の削除や列名の変更などをPythonで自動処理しました。これは本当に地味ですが非常に手間のかかる処理です。"
          ],
          achvs: ["<u>Chart.js</u>によるグラフ描写ができるようになりました。"]
        },
        {
          name: "LANストーカー",
          identifier: "stalker",
          rating: 1,
          desc:
            "LANを自動スキャンし、<u>接続中デバイスのMACアドレスを基に各個人を追跡する</u>性格の悪いプログラムです。ネットワークの基礎を勉強する際に、身近な機器で何か遊べないか興味が湧きつくりました。",
          demourl: "https://azureleaf.github.io/lan-device-stalker/",
          githuburl: "https://github.com/azureleaf/lan-device-stalker",
          frameworks: ["js", "py"],
          backends: ["SQLAlchemy ORM + SQLite"],
          funcs: [
            "PythonからARPをブロードキャストで掛けて、反応があったデバイスのMACアドレスを記録します。",
            "このプログラムを指定した時間ごとに自動でかけ、その結果をSQLiteのDBに集積していきます",
            "保存したデータを整形し、D3.jsを使って、<u>ヒートマップとして可視化</u>します。",
            "これにより、<u>「誰がいつ頃在室していたのか」「どのパソコンが頻繁に使われているのか」</u>などが推測できます。",
            "どのMACアドレスのNICが誰の持ち物なのかは目視で判断する必要がありますが、それにより各個人の在室状況をかなり追えます。"
          ],
          funcImg: "",
          techs: [
            "<u>SQLAlchemy</u>により、SQL文を直接書くことなくDBを操作しています。",
            "<u>ARP-SCAN</u>や<u>Scapy</u>などのネットワーク系有名ライブラリを利用。",
            "D3.jsによる可視化。",
            "Pythonのschedライブラリによるスケジューリング実行機能。"
          ],
          achvs: [
            "超有名な可視化ライブラリ<u>D3.js</u>の基礎がわかりました。",
            "PythonのORMに触れました。PythonのORMは初めてでした。"
          ]
        },
        {
          name: "フラクタルを描こう",
          identifier: "fractal",
          rating: 1,
          desc:
            "<u>HTML Canvasに再帰を使う</u>ことで、きれいで複雑な図形を描画します。「ジェネラティブ・アート」という、プログラミングを使った芸術手法です。",
          demourl: "https://azureleaf.github.io/canvas/fractal/canvastree.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
          funcs: [
            "「ある点から出発して一定の規則で枝分かれする」という非常に単純な動作を繰り返し、それを可視化することで複雑な幾何学図形を描けます。",
            "繰り返しの回数、枝分かれの角度、長さ、配色などをユーザが自由に変更できるコントロールをつけたので、いろいろ遊ぶことができます。"
          ],
          funcImg: "",
          techs: [
            "Canvasによる描画。",
            "Vuetifyによる各種コントロール要素（カラーピッカー、スライダー、ボタンなど）の利用。",
            "再帰関数の活用。"
          ],
          achvs: [
            "Vuetifyの便利さがとてもよくわかりました。きれいなコンポーネント要素がサクッと実装できます。こういった機能について車輪の再発明していくのは地獄ですし人生の時間を浪費することになるので、本当にありがたいです。"
          ]
        }
      ],
      projectHeaders: [
        {
          text: "#",
          sortable: false,
          value: "projIndex"
        },
        {
          text: "ページ内リンク",
          sortable: false,
          value: "name"
        },
        {
          text: "力作度",
          sortable: false,
          value: "rating"
        },
        {
          text: "デモ",
          sortable: false,
          value: "demourl"
        },
        {
          text: "概要",
          sortable: false,
          value: "desc",
          width: "40%"
        },
        {
          text: "Framework",
          sortable: false,
          value: "frameworks"
        },
        {
          text: "Backend",
          sortable: false,
          value: "backends"
        }
      ],
      bgColors: ["pink darken-4", "green darken-4", "blue darken-4"]
    };
  },
  methods: {
    isUsing: function(frameworks, framework) {
      return frameworks.includes(framework);
    },
    addSharp: function(str) {
      return "#" + str;
    }
  },
  created: function() {
    this.projects.map(project => {
      this.projectIds.push(project.identifier);
    });
  }
};
</script>
