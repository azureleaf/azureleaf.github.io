<template>
  <v-container>
    <v-card elevation="10" class="mt-10">
      <v-card-title class="headline font-weight-bold pb-8"
        >プロジェクト一覧</v-card-title
      >
      <v-card-subtitle class="subtitle-1">
        ポートフォリオサイトへのご訪問ありがとうございます。最近の私の制作物をご紹介いたします。<br />
        デモページもぜひご覧ください。各プロジェクトのGitHubページでは、ここよりも更に詳しく説明しています。
        <router-link to="/skill">LINK</router-link>
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
          <v-icon class="mr-1" large>mdi-github</v-icon>GitHub
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
            "学生寮の<u>業務自動化ツール</u>。寮生管理、会計処理、居室管理、当番割振、文書編集などの機能をもっており、最も実用的なプロジェクトです。",
          demourl: "",
          githuburl: "",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
          funcs: [],
          funcImg: "",
          techs: ["Cypressによるテスト自動化"],
          achvs: []
        },
        {
          name: "仙台高齢化地域の可視化",
          identifier: "ageing",
          desc:
            "町ごとの高齢人口比率を、地図の上にヒートマップで描画します。私も一住民として興味がある内容なのでおもしろかったです。<u>Pythonでのデータ処理と可視化</u>の練習台。",
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
          backends: ["Firebase"],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: []
        },
        {
          name: "仙台地下鉄検索Bot",
          identifier: "line",
          desc:
            "<u>Heroku上で動くLINEボット</u>。GPSの現在位置を投げると、近くの地下鉄駅、バス停、仙台の天気を教えてくれます。",
          demourl: "https://azureleaf.github.io/greet_bot/",
          githuburl: "https://github.com/azureleaf/greet_bot",
          frameworks: ["py"],
          backends: ["Flask + SQLite + Heroku"],
          funcs: [
            "テキストでメッセージを投げると、仙台の現在の天気情報と３時間毎の予報をダイジェストで教えてくれます。",
            "現在地の GPS 情報を伝えると、そこから近い地下鉄駅の名前と直線距離、および直近の発車時刻を教えてくれます。",
            "現在地の GPS 情報を伝えると、そこから近いバス停の名前と直線距離を教えてくれます。"
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
          name: "WiFiストーカー",
          identifier: "stalker",
          desc:
            "LANを自動スキャンし、接続中デバイスのMACアドレスから各個人を追跡する、性格の悪いプログラムです。<u>ネットワーク</u>を勉強する助けとして作成。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/lan-device-stalker",
          frameworks: ["js", "py"],
          backends: ["SQLAlchemy ORM + SQLite"],
          funcs: [],
          funcImg: "",
          techs: ["SQLAlchemy"],
          achvs: []
        },
        {
          name: "通院アシスタント",
          identifier: "hospital",
          desc:
            "私のかかりつけ病院のウェブサイトに自動アクセスしてリアルタイムの混雑状況を取得し、受診のオンライン予約まで自動でやってくれます。<u>ウェブスクレイピング</u>の題材。",
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
            "日本７大都市の気候を比較します。仙台が年々暑くなっているのかも検証したい。<u>データ可視化と時系列解析</u>の練習台。",
          demourl: "https://azureleaf.github.io/japan-city-climate/",
          githuburl: "https://github.com/azureleaf/japan-city-climate",
          frameworks: ["js", "py"],
          backends: [],
          funcs: [
            "各都市の真夏日、降水量、平均気温など基本的な気候統計を可視化します。",
            "ユーザーの重視する属性（暑いのが好き？寒いのは平気？など）によって、各都市のオススメ度を計算し推薦します。",
            "仙台で温暖化が進行しているといえるのか、統計的に判断できるか解説ページを提供します。"
          ],
          funcImg: "",
          techs: [
            "ダウンロードしてきたデータはそのままでは利用できないので、不要な列の削除や列名の変更などをPythonで自動処理しました。",
            "ややマジメな話ですが、時系列解析について詳しくご説明します。"
          ],
          achvs: [
            "<u>Chart.js</u>によるグラフ描写ができるようになりました。",
            "時系列解析を学校で習った時はあやふやな理解だったのが、実際に作業することで実感がわきました。"
          ]
        },
        {
          name: "三角形の五心",
          identifier: "triangle",
          desc:
            "マウスで三角形を描くと、三角形の重心などを補助線付きで自動描画します。<u>EdTech（ITによる教育の効率化）</u>を意識したツールです。",
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
          name: "フラクタルを描こう",
          identifier: "fractal",
          desc:
            "<u>HTML Canvasに再帰関数を使う</u>ことで、きれいで複雑な図形を描画します。このような芸術手法を「ジェネラティブ・アート」というそうです。",
          demourl: "https://azureleaf.github.io/canvas/fractal/canvastree.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: []
        },
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
        {
          name: "ポートフォリオサイト",
          identifier: "portfolio",
          desc:
            "このサイトそのもの。<u>マテリアルデザイン・CDN・Webpack</u>によるVue.jsのサイトをNode.jsなしで実現しました。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/azureleaf.github.io",
          frameworks: ["vue"],
          backends: [],
          funcs: [
            "私のプロジェクトを見てくださる方に対して、その<u>コードの背景にある私の発想</u>まで伝わるよう表現を推敲しました。",
            "マテリアルデザインやアイコンを使うことで、シンプルでありながら見やすく統一感があります。",
            "<u>SPA（Single Page Application）</u>により、通信回数が少なく表示が高速です。（このページはもともと通信量は極小ですが）"
          ],
          funcImg: "",
          techs: [
            "<u>Vuetify</u>によるマテリアルデザインと、<u>Font Awesome</u>のアイコンセット。",
            "私はLinuxユーザーですので、動画の編集圧縮に<u>ffmpeg</u>を多用しました。",
            "GitHubの静的ページではNode.jsを動かせないため、<u>CDN (Contents Delivery Network)</u>によりVueを導入。",
            "<u>Webpack</u>を使用することで、CDNのページでありつつも効率的にコーディングできるようにしました。",
            "<u>Reveal.js</u>による、軽量なプレゼンテーション。"
            // "Vueは本来は複雑にコンパイルされるライブラリなので、これをCDNから使う場合は制約が多く結構苦労しました。",
          ],
          achvs: [
            "<u>CDNによるVue / Vue Router / Vuetify</u>の書き方がわかりました。Nuxtを使えばもっと楽だった気もします。",
            "<u>Vue Routerでのスクロール位置の制御</u>がわかりました。",
            "GitHubでの個人ページのホスティング機能を理解しました。"
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
