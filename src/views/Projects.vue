<template>
  <v-container>
    <v-card elevation="10">
      <v-card-title class="headline font-weight-bold pb-8"
        >プロジェクト一覧</v-card-title
      >
      <v-card-subtitle class="subtitle-1">
        ポートフォリオサイトへのご訪問ありがとうございます。最近の私の制作物をご紹介いたします。<br />
        デモページもぜひご覧ください。各プロジェクトのGitHubページでは、ここよりも更に詳しく説明しています。
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
          tile
          :href="project.demourl"
          class="px-6 mr-3 font-weight-bold subtitle-1"
        >
          <v-icon class="mr-1" large>mdi-open-in-new</v-icon>Open Demo</v-btn
        >
        <v-btn
          v-if="project.githuburl.length != 0"
          outlined
          large
          tile
          :href="project.githuburl"
          class="px-3 font-weight-bold subtitle-1"
        >
          <v-icon class="mr-1" large>mdi-github</v-icon>Open GitHub
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
          </v-card-text>
        </v-card>
        <v-card outlined>
          <v-card-title>収穫</v-card-title>
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
export default {
  name: "Projects",
  data: function() {
    return {
      // List of all the project id strings
      // Will be set on mounted
      projectIds: [],
      projects: [
        {
          name: "寮運営システム",
          identifier: "dorm",
          desc:
            "学生寮の<u>業務自動化ツール</u>。寮生情報管理、会計処理、居室状態管理などの機能をもっており、最も実用的なプロジェクトです。実装を始めてからは楽しかったのですが、環境設定までが辛かった。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/dorm-management-app",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
          funcs: [
            "外部向けの寮の紹介ページ",
            "寮生の入寮・退寮の管理機能： 寮生がいつ入寮したのか、いつたい",
            "居室の管理機能：　",
            "寮費支払いの管理機能： どの寮生がどれだけ寮費を請求され、",
            "寮費計算の管理機能：　役職を割り当てられた人間や特別な仕事をこなした寮生には報酬が与えられ、掃除をサボるなどした寮生には罰金が加わります。この個別の細かい賞罰設定を、機能として実装しました。",
            "寮費請求：　実際に",
            "寮生の役職（委員長や会計委員など）の期間割当：　役職のある",
            "ログイン機能： LaravelのAuthを利用。"
          ],
          funcImg: "",
          techs: [
            "Vue",
            "Laravel: Migration, Model, Seeding, Resource Controller, Blade, Relationship, Auth, Guard",
            "sessionStorage",
            "Postgres: Eloquent ORMからのアクセス",
            "Cypressによるテスト自動化"
          ],
          achvs: [
            "初めての本格的なWeb App構築でした。DBの設定からフロントエンドとバックエンドの連携まで、本当に多くのことがわかりました。",
            "Vueコンポーネントが増えてくると、要素同士の疎結合や、命名規則の大切さが身にしみます。",
            "ドキュメンテーションを整備しました。Web Appを他人に説明しようとするのは想像以上に大変でした。"
          ]
        },
        {
          name: "仙台高齢化地域の可視化",
          identifier: "ageing",
          desc:
            "町ごとの高齢人口比率を、地図の上にヒートマップで描画します。私が一市民として興味のある内容でおもしろかったです。<u>Pythonでのデータ処理と可視化</u>の練習台。",
          demourl: "https://azureleaf.github.io/ageing-sendai/",
          githuburl: "https://github.com/azureleaf/ageing-sendai",
          frameworks: ["py", "js", "c"],
          backends: [],
          funcs: [
            "高齢化率を地区ごとに色分けしているので一目瞭然です。",
            "地図上でインタラクティブに操作できます。",
            "クリックすると詳細情報がポップアップで表示できます"
          ],
          funcImg: "../assets/ageing_heatmap_screenshot.jpg",
          techs: [
            "<u>Leaflet.js</u>で、OpenStreetMapの地図上に描画します。",
            "Pythonの<u>Pandas</u>やC言語でデータを加工します。",
            "<u>カラーマッピング</u>（どの値をどの色に対応させれば見やすいのか？）の有名な計算手段を<a href='https://azureleaf.github.io/ageing-sendai/colormap.html'>いくつか検討しました</a>。",
            "「町別の年齢人口分布統計のExcelファイル」「町別の緯度経度情報のExcelファイル」など<u>複数の表をうまくJOINできるようデータを整形</u>しました。",
            "「重複データを発見して取り除く」「４丁目と四丁目の表記のゆれを統一する」「データ区分ごとの集計」などは全てコーディングで処理します。",
            "以下に詳しいデータ分析を述べます"
          ],
          achvs: [
            "地図を使った可視化の勉強になりました。<u>色鮮やかでインタラクティブなUI</u>は、やはりインパクトがあります。",
            "<u>分析前の生データの質</u>がどれほど重要か、身にしみました。「苦労してデータ処理したら、後から元データの不備が判明してそこまでの苦労が水の泡」が何度もありました。"
          ]
        },
        {
          name: "激強五目並べ",
          identifier: "gomoku",
          desc:
            "コンピュータを相手に戦う五目並べです。強すぎてほぼ勝てません。<a href='https://github.com/azureleaf/gomoku'>React版もあります</a>。私が最初につくったプログラムなので思い入れが深いです。<u>Vueのイベント処理</u>の練習台。",
          demourl: "",
          githuburl: "",
          frameworks: ["vue", "react"],
          backends: [],
          funcs: [
            "人間側が盤面に石を置くと、<u>COM側が独自のアルゴリズムで盤面を評価し最善手（と思われる手）を返してきます。</u>",
            "<u>「待った」の機能</u>や、<u>盤面サイズ変更</u>などの操作機能があります。",
            "盤面動作に<u>SVGアニメーション</u>を使い、見た目の洗練さを高めています。"
          ],
          funcImg: "",
          techs: [
            "VuetifyとCDNのフォント、配色、CSSのカスタマイズによる<u>ポップなデザインの世界観</u>にかなりこだわり工夫しました。",
            "Vuexによる状態管理を多用しています。",
            "SVG Pathアニメーション"
          ],
          achvs: [
            "<u>Vuexによる状態管理</u>の基礎を理解しました。",
            "Vuetifyでの細かいCSS調整がわかりました。",
            "デザインの細かな違いが、サイト全体の印象に相当大きな影響を与えることを実感しました。"
          ]
        },
        {
          name: "仙台おでかけアシスタントBot",
          identifier: "line",
          desc:
            "<u>Heroku上で動くLINEボット</u>。GPSの現在位置を投げると、近くの地下鉄駅、バス停、仙台の天気を教えてくれる便利なやつです。",
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
            "市営バスの時刻表データが手に入らないので、このBotでは「バスがいつ発車するのか」がわかりません。<u>結局は情報の入手難度が、データ分析のネックになるんですね…</u>"
          ],
          achvs: [
            "<u>LINE Messaging API</u>と<u>Herokuへのデプロイ</u>を学びました。Herokuサーバーがアメリカにあるせいで時間の処理が狂い、面食らったことも。",
            "<u>GPS位置情報</u>の処理に触れました。",
            "<u>Shell ScriptとFFMPEG</u>で動画を効率的に編集しました。",
            "<u>Ngrok</u>の使いかたがわかりました。ただなぜかサーバーが反応しないときもあって苦労させられました。",
            "プログラミングを勉強するにしても、身近に役に立つツールを作れると達成感もひとしおです。"
          ]
        },
        {
          name: "LANストーカー",
          identifier: "stalker",
          desc:
            "LANを自動スキャンし、<u>接続中デバイスのMACアドレスから各個人を追跡</u>しようとする、性格の悪いプログラムです。身近な機器からどんな情報をとれるのか興味があったので、ネットワークの基礎を勉強する題材として作りました。",
          demourl: "https://azureleaf.github.io/lan-device-stalker/",
          githuburl: "https://github.com/azureleaf/lan-device-stalker",
          frameworks: ["js", "py"],
          backends: ["SQLAlchemy ORM + SQLite"],
          funcs: [
            "PythonからARPをブロードキャストで掛けて、反応があったデバイスのMACアドレスを記録します。",
            "このプログラムを指定した時間ごとに自動でかけ、その結果をSQLiteのDBに集積していきます",
            "保存したデータを整形し、D3.jsを使って、ヒートマップに可視化します。",
            "これにより、「どのパソコンが頻繁に使われているのか」「誰がいつ頃在室していたのか」などが推測できます。",
            "どのMACアドレスのNICが誰の所持品なのかは目視で判断するしかありませんが、それでも在室状況をかなり追えます。"
          ],
          funcImg: "",
          techs: [
            "SQLAlchemy",
            "ARP-SCANやScapyなどのネットワーク系有名ライブラリの利用",
            "D3.jsによる可視化"
          ],
          achvs: [
            "超有名な可視化ライブラリ<u>D3.js</u>の基礎がわかりました。",
            "PythonのORMに触れました。"
          ]
        },
        {
          name: "通院アシスタント",
          identifier: "hospital",
          desc:
            "私のかかりつけ病院のウェブサイトに自動アクセスしてリアルタイムの混雑状況を取得し、受診のオンライン予約まで自動でやってくれます。私にとって実生活で一番役立っています。<u>ウェブスクレイピング</u>を勉強する題材でした。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/hospital_latency",
          frameworks: ["py", "vue", "js"],
          backends: ["Express + TypeORM + MySQL + Firebase"],
          funcs: [],
          funcImg: "",
          techs: [
            "Socket.ioによるリアルタイム情報更新",
            "Node.jsからPythonを実行"
          ],
          achvs: [
            "この病院は人気が高く、予約を取るのが先着順の凄まじい競争になっていました。自動化でとても楽になりました。"
          ]
        },
        {
          name: "仙台の気候は住みやすいのか？",
          identifier: "climate",
          desc:
            "日本７大都市の気候を比較します。仙台の気候の良さは日本有数だと私は信じていますが、それを検証したかったのです。<u>Chart.jsによるデータ可視化</u>の練習台。",
          demourl: "https://azureleaf.github.io/japan-city-climate/",
          githuburl: "https://github.com/azureleaf/japan-city-climate",
          frameworks: ["js", "py"],
          backends: [],
          funcs: [
            "各都市の真夏日、降水量、平均気温など基本的な気候統計を可視化します。"
          ],
          funcImg: "",
          techs: [
            "ダウンロードしてきたデータはそのままでは利用できないので、不要な列の削除や列名の変更などをPythonで自動処理しました。"
          ],
          achvs: ["<u>Chart.js</u>によるグラフ描写ができるようになりました。"]
        },
        {
          name: "三角形の五心",
          identifier: "triangle",
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
          name: "フラクタルを描こう！",
          identifier: "fractal",
          desc:
            "<u>HTML Canvasに再帰関数を使う</u>ことで、きれいで複雑な図形を描画します。このような芸術手法を「ジェネラティブ・アート」というそうです。",
          demourl: "https://azureleaf.github.io/canvas/fractal/canvastree.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
          funcs: [
            "「ある点から出発して一定の規則で枝分かれする」という動作を繰り返し、それを可視化することで幾何学的な図形を描けます。",
            "繰り返しの回数、枝分かれの角度、長さ、配色などをユーザが自由に変更できるコントロールをつけたので、いろいろ遊ぶことができます。"
          ],
          funcImg: "",
          techs: [
            "Canvasによる描画",
            "Vuetifyによる各種コントロール要素の利用",
            "再帰の利用"
          ],
          achvs: [
            "Vuetifyの便利さがとてもよくわかりました。きれいなコンポーネント要素がサクッと実装できる。こういう機能の車輪の再発明していくのは地獄。"
          ]
        }
        // {
        //   name: "ファイルマネージャー",
        //   identifier: "filemanager",
        //   desc:
        //     "パソコン内に文書ファイルが大量にあり収拾がつかないので、それらをタグ付けなどで整理するツール。<u>フレームワーク抜きの純粋なPHPに慣れる</u>ために作成しました。",
        //   demourl: "",
        //   githuburl: "",
        //   frameworks: ["php", "js"],
        //   backends: ["SQLite"],
        //   funcs: [],
        //   funcImg: "",
        //   techs: [],
        //   achvs: [],
        // },
        // {
        //   name: "IT学習スライド",
        //   identifier: "notes",
        //   desc:
        //     "プログラミングの膨大な勉強メモをまとめたものです。<u>学習モチベーションを保ち、マークダウン記法に慣れる</u>のが主眼でした。",
        //   demourl: "",
        //   githuburl: "https://github.com/azureleaf/study-notes",
        //   frameworks: ["md"],
        //   backends: [],
        //   funcs: [
        //     "<u>Reveal.js</u>によるプレゼンテーション",
        //     "特に<a href='https://github.com/azureleaf/study-notes/blob/master/js/promise.md'>Promiseについて</a>は結構まとめました。",
        //   ],
        //   funcImg: "",
        //   techs: [],
        //   achvs: [],
        // },
        // {
        //   name: "ログイン機能を自作する",
        //   identifier: "user_login",
        //   desc:
        //     "勉強仲間との共同作品。<u>非同期通信、DBアクセス、ハッシュ化、自動テスト</u>などを一つ一つ丁寧に実装しました。",
        //   demourl: "",
        //   githuburl: "https://github.com/yuyu456-corder/user_login",
        //   frameworks: ["vue"],
        //   backends: ["Express + Sequelize + SQLite"],
        //   funcs: [],
        //   funcImg: "",
        //   techs: [],
        //   achvs: ["<u>非同期通信</u>、ORM、Bcryptによるハッシュ化、トークンの保存、Cypressでの自動テストなどを、"],
        // },
        // {
        //   name: "ポートフォリオサイト",
        //   identifier: "portfolio",
        //   desc:
        //     "このサイトそのもの。<u>マテリアルデザイン・CDN・Webpack</u>によるVue.jsのサイトをNode.jsなしで実現しました。",
        //   demourl: "",
        //   githuburl: "https://github.com/azureleaf/azureleaf.github.io",
        //   frameworks: ["vue"],
        //   backends: [],
        //   funcs: [
        //     "私のプロジェクトを見てくださる方に対して、その<u>コードの背景にある私の発想</u>まで伝わるよう表現を推敲しました。",
        //     "マテリアルデザインやアイコンを使うことで、シンプルでありながら見やすく統一感があります。",
        //     "<u>SPA（Single Page Application）</u>により、通信回数が少なく表示が高速です。（このページはもともと通信量は極小ですが）"
        //   ],
        //   funcImg: "",
        //   techs: [
        //     "<u>Vuetify</u>によるマテリアルデザインと、<u>Font Awesome</u>のアイコンセット。",
        //     "私はLinuxユーザーですので、動画の編集圧縮に<u>ffmpeg</u>を多用しました。",
        //     "GitHubの静的ページではNode.jsを動かせないため、<u>CDN (Contents Delivery Network)</u>によりVueを導入。",
        //     "<u>Webpack</u>を使用することで、CDNのページでありつつも効率的にコーディングできるようにしました。",
        //     "<u>Reveal.js</u>による、軽量なプレゼンテーション。"
        //     // "Vueは本来は複雑にコンパイルされるライブラリなので、これをCDNから使う場合は制約が多く結構苦労しました。",
        //   ],
        //   achvs: [
        //     "<u>CDNによるVue / Vue Router / Vuetify</u>の書き方がわかりました。Nuxtを使えばもっと楽だった気もします。",
        //     "<u>Vue Routerでのスクロール位置の制御</u>がわかりました。",
        //     "GitHubでの個人ページのホスティング機能を理解しました。"
        //   ]
        // }
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
          text: "デモ",
          sortable: false,
          value: "demourl"
        },
        // {
        //   text: "GitHub",
        //   sortable: false,
        //   value: "githuburl",
        // },
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
      bgColors: ["red darken-4", "green darken-4", "blue darken-4"]
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
