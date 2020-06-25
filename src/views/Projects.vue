<template>
  <v-container>
    <v-card elevation="10">
      <v-card-title class="headline font-weight-bold pb-8"
        >プロジェクト一覧</v-card-title
      >
      <v-card-subtitle class="subtitle-1">
        <ul>
          <li>
            ポートフォリオサイトへのご訪問ありがとうございます。
          </li>
          <li>
            プログラミング勉強の題材として私がつくったものを、一部ご紹介します。「自分が実際に使いたいツールを制作しよう」を主眼に置きました。
          </li>
          <li>
            制作物それぞれにデモページを設けましたので、ぜひご覧ください。なお、各プロジェクトのGitHubページに更に詳しい説明があります。
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
      projectIds: [],
      projects: [
        {
          name: "学生寮会計システム",
          identifier: "dorm",
          desc:
            "学生寮の<u>業務自動化ツール</u>。寮生の個人情報や寮施設の情報管理や会計処理の機能をもっており、最も実用的なプロジェクトです。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/dorm-management-app",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
          funcs: [
            "私が実際に住んでいる某寮で使うことを想定した作りになっています。",
            "<b>寮紹介：</b>　外部の入寮希望者向けに、寮の概要などを説明します。",
            "<b>寮生情報の管理</b>： 寮生の入寮日やメールアドレスなどの個人情報を管理します。",
            "<b>居室の管理</b>：　部屋ごとの空室状況や故障箇所の情報を管理します。",
            "<b>寮費の計算</b>：　寮内で特別な仕事をこなした寮生には報酬が与えられ、掃除をサボるなどした寮生には罰金が課されます。この賞罰を反映させる機能がついています。",
            "<b>寮費支払の記録</b>： 月々の寮費・報酬・罰金・支払結果（誰が寮費の支払いを完了したのか？誰が寮費を滞納しているのか？）を把握する機能です。",
            "<b>寮生の役職履歴の記録</b>：　寮内の特別な役職者の任期を編集できます。これは寮費報酬計算に反映されます。",
            "<b>ログイン</b>： 閲覧や情報編集の権限を管理します。"
          ],
          funcImg: "",
          techs: [
            "<u>Vue.js</u> (Frontend)",
            "<u>Laravel</u>: Migration, Model, Seeding, Resource Controller, Blade, Relationship, Auth, Guard",
            "sessionStorage",
            "Postgres: Eloquent ORMからのアクセス",
            "Cypressによるテスト自動化",
            "<u>AWSへの展開</u>"
          ],
          achvs: [
            "初めての本格的なWeb App構築でした。DBの設定からフロントエンドとバックエンドの連携まで、本当に多くの新しい知見を得ました。",
            "Vueコンポーネントが増えてくると、要素同士の疎結合の重要さや、命名規則の大切さが身にしみます。",
            "ドキュメンテーションを整備しました。自分にとってはわかりきっている機能やコードの構造も、他人に説明しようとするのは想像以上に大変でした。",
            "業界でデファクトスタンダードになっているAWSにようやく触れ、本格的なエンジニアになるために一歩近づけたと思います。"
          ]
        },
        {
          name: "仙台高齢化地域の可視化",
          identifier: "ageing",
          desc:
            "町ごとの高齢人口の比率を、地図の上にヒートマップとして描画します。私が一市民として興味のある内容でした。<u>Pythonでのデータ処理と可視化</u>の練習台。",
          demourl: "https://azureleaf.github.io/ageing-sendai/",
          githuburl: "https://github.com/azureleaf/ageing-sendai",
          frameworks: ["py", "js", "c"],
          backends: [],
          funcs: [
            "高齢化率を地区ごとに色分けしているので、一目瞭然です。",
            "地図上でインタラクティブに操作できます。",
            "クリックすると詳細情報がポップアップで表示できます"
          ],
          funcImg: "../assets/ageing_heatmap_screenshot.jpg",
          techs: [
            "<u>Leaflet.js</u>で、OpenStreetMapの地図上に描画します。",
            "Pythonの<u>Pandas</u>やC言語でデータを加工します。",
            "<u>カラーマッピング</u>（どの値をどの色に対応させれば見やすいのか？）の有名な計算手段を<a href='https://azureleaf.github.io/ageing-sendai/colormap.html'>いくつか検討しました</a>。",
            "「町別の年齢人口分布統計のExcelファイル」「町別の緯度経度情報のExcelファイル」など<u>複数の表をうまくJOINできるようデータを整形</u>しました。",
            "「重複データを発見して取り除く」「４丁目と四丁目の表記のゆれを統一する」「データ区分ごとの集計」などの面倒だけど考慮しなければならない煩雑な処理は、全てコーディングで処理します。",
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
          demourl: "https://azureleaf.github.io/gomoku-vue/",
          githuburl: "https://github.com/azureleaf/gomoku-vue",
          frameworks: ["vue", "react"],
          backends: [],
          funcs: [
            "人間側が盤面に石を置くと、<u>COM側が独自のアルゴリズムで盤面を評価し最善手（と思われる手）を返してきます。</u>",
            "<u>盤面サイズ変更</u>やリセットの機能があります。",
            "盤面動作に<u>SVGアニメーション</u>を使い、見た目の洗練さを高めています。",
            "「勝者や引き分けを表示する」「ゲーム勝敗が確定した場合にはそれ以降のクリックを受け付けない」など、操作感の細かい部分も詰めました。"
          ],
          funcImg: "",
          techs: [
            "１．　人間側プレイヤーが盤面をクリックします。",
            "２．　クリックされたマス目に「O」を表示し、Vueコンポーネントは現在の局面をVuexに伝えます。",
            "３．　Vuexは現在の盤面を評価します。全てのマス目に対して<u>テンプレートマッチング</u>を行い、<u>マス目毎にスコアを算出します</u>。例えば「O」が４つ並んでいる場所がある場合は勝利が目前なので、その４連に隣接するマス目が持つ「Oにとってのスコア」は非常に高くなります。",
            "４．　O（人間側プレイヤー）にとってのスコアと、X（COM側プレイヤー）にとってのスコアの両方を計算します。",
            "５．　この段階で<u>「テンプレートマッチングが一個も引っかからない場合」</u>は両者手詰まりなので「引き分け」とし、ゲームをロックします。",
            "６．　この段階で<u>「石が５個並んでいるプレイヤーがいる場合」</u>にはそのプレイヤーを勝者とし、ゲームをロックします。",
            "７．　O側のスコアと、X側のスコアをマス毎に足し合わせます。将棋に<u>「敵の打ちたいところに打て」</u>という格言がありますが、五目並べでも<u>人間側にとって良い手となる場所にCOM側が先回りして石を置くことで、人間側を妨害できることになります。</u>",
            "８．　<u>足し合わせたスコアが一番高いマス</u>を見つけ、そこをCOM側の最善手として決定します。"
          ],
          achvs: [
            "Vuetifyによるマテリアルデザイン、CDNによるWebフォント、配色、CSSのカスタマイズによる<u>ポップなデザインの世界観</u>にこだわりました。",
            "Vuexによる状態管理を多用しています。",
            "SVG Pathアニメーションの基礎がわかりました。",
            "Vuetifyにおける細かいCSS調整がわかりました。",
            "<u>デザインの細かな違いが、サイト全体の印象や操作感に相当に大きな影響を与える</u>ことを実感しました。"
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
          name: "LANストーカー",
          identifier: "stalker",
          desc:
            "LANを自動スキャンし、<u>接続中デバイスのMACアドレスから各個人を追跡</u>しようとする、性格の悪いプログラムです。ネットワークの基礎を勉強する際に、身近な機器で何か遊べないか興味が湧きつくりました。",
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
          name: "通院アシスタント",
          identifier: "hospital",
          desc:
            "私のかかりつけ病院のオンライン受診予約を自動で行います。またリアルタイムの混雑状況を定時取得してくれます。実生活でとても役立っているプログラムです。<u>ウェブスクレイピング</u>を勉強する題材でした。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/hospital_latency",
          frameworks: ["py", "vue", "js"],
          backends: ["Localhost (Termux) + SQLite"],
          funcs: [],
          funcImg: "",
          techs: [
            // "Socket.ioによるリアルタイム情報更新",
            // "Node.jsからPythonを実行"
          ],
          achvs: [
            "この病院は人気が高く、予約を取るのが先着順の凄まじい競争になっていました。自動化でとても楽になりました。"
          ]
        },
        {
          name: "仙台の気候指標を図解する",
          identifier: "climate",
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
          name: "三角形の五心を描こう",
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
          name: "フラクタルを描こう",
          identifier: "fractal",
          desc:
            "<u>HTML Canvasに再帰を使う</u>ことで、きれいで複雑な図形を描画します。「ジェネラティブ・アート」という、プログラミングを使った芸術手法です。",
          demourl: "https://azureleaf.github.io/canvas/fractal/canvastree.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
          funcs: [
            "「ある点から出発して一定の規則で枝分かれする」という非常に単純な動作を繰り返し、それを可視化することで幾何学的な図形を描けます。",
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
