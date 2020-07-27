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
            <v-container v-if="project.slides" fluid>
              <v-row justify="center">
                <v-col lg="3">
                  <ImageDialog
                    :uri="project.slides"
                    thumbnailUri=""
                  ></ImageDialog>
                </v-col>
              </v-row>
            </v-container>
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
              <v-row justify="center">
                <v-col
                  v-for="(img, index) in project.techImgs"
                  :key="index"
                  lg="3"
                >
                  <ImageDialog
                    :uri="img"
                    :thumbnailUri="project.thumbnail"
                  ></ImageDialog>
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
            "人間側が盤面に石を置くと、<u>コンピュータ側が独自のアルゴリズムで盤面を評価し、効果的な手を返してきます。</u>",
            "<u>盤面サイズ変更</u>や<u>盤面リセット</u>などの機能があります。",
            "<u>SVGアニメーション</u>、最後に置かれた石の強調表示、手数の表示、勝者や引き分けの表示などUIの細かい部分まで詰めて洗練させました。"
          ],
          funcImg: "",
          techImgs: [
            "gomoku-capture.jpg",
            "./gomoku-event-flow.jpg",
            "./gomoku-score-matrix.jpg",
            "./gomoku-matching-flow.jpg"
          ],
          techs: [],
          achvs: [
            "<u>Vuexによる状態管理</u>を理解しました。",
            "Vuetifyによるマテリアルデザイン、CDNによるWebフォント、配色、CSSのカスタマイズにかなりこだわり、<u>ポップな世界観</u>をデザインしました。",
            "<u>デザインの細かな違いが、サイト全体の印象や操作感に相当に大きな影響を与える</u>ことを実感しました。"
          ]
        },
        {
          name: "寮会計システム",
          identifier: "dorm",
          rating: 3,
          desc:
            "男子寮の<u>業務自動化ツール</u>。寮生情報管理や会計処理機能があり、最も実用的なプロジェクトです。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/dorm-management-app",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
          funcs: [
            "私が実際に住んでいる男子寮で使うことを想定した作りになっています。",
            "<u>寮紹介</u>：　入寮希望者向けの寮の基本情報です。",
            "<u>寮生情報の管理</u>： 寮生個人の基本情報を管理します。",
            "<u>居室の管理</u>：　部屋ごとの空室状況や故障箇所の情報を管理します。",
            "<u>賞罰の計算</u>：　「委員長」や「会計委員」など寮の役職を務める寮生には報酬を与え、清掃当番をサボった寮生などには罰金を課します。",
            "<u>寮費支払の記録</u>： 月々の寮費の支払記録（寮費の内訳は？寮費をちゃんと払ったのは誰か？寮費を滞納している不届き者は誰か？）を管理します。",
            "<u>役職履歴の記録</u>：　役職者の任期を管理し、賞罰に反映します。"
          ],
          funcImg: "",
          slides: [
            {
              src: "dorm-app-slides/101_resized.png",
              caption:
                "既に入居済の部屋や、設備の不備などにより住めない部屋があります。\n101号室は、暖房器具が無いため住めない状態です。"
            },
            {
              src: "dorm-app-slides/102_resized.png",
              caption:
                "暖房器具を新規購入しました。\n101号室の「編集」ボタンを押し、情報を更新します。"
            }
          ],
          techs: [
            "<u>Vue.js + Vue Router</u>によるSingle Page Application",
            "<u>Laravelのルーティング</u>: Blade, Resource Controller, Laravel Mix",
            "<u>LaravelのDB管理</u>: Migration, Model, Seeding",
            "<u>Eloquent ORM + Postgres</u>: Foreign Key, one-to-manyなどのrelationships, $appendsアクセサによるカラム値の自動生成",
            "<u>AWS EC2</u>への展開",
            "sessionStorage"
          ],
          techImgs: ["./dorm-app-er.jpg", "./dorm-app-components.jpg"],
          achvs: [
            "Axiosで頻繁にDBにアクセスするため、<u>async/awaitなどの非同期処理と、v-ifやcomputedによるレンダリングのタイミング管理</u>を工夫する必要がありました。",
            "Vueコンポーネントが増えてくると<u>要素同士の疎結合や、命名規則の一貫性</u>の大切さが身にしみました。センスのない命名をしてしまったために後からプロジェクト内部での変数名の整合性がとれなくなってしまい、それを直すためDBのカラム名や変数名を何十箇所も修正する必要に迫られ、ひどい目に合いました。",
            "<u>draw.ioを使った流れ図の作成など、ドキュメンテーション</u>に注力しました。他人の目線で説明するのは想像以上に大変でした。",
            "初めての本格的なWeb App構築でした。業界スタンダードになっているAWSに触れ、エンジニアに一歩近づけた気がします。"
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
            "<u>球面三角法</u>によりGPSの緯度経度の差分からメートル距離を算出。",
            "このBotのバス情報には「バスがいつ発車するのか」がわからないという重大な欠点があります。市営バスの時刻表データが手に入らないのでどうしようもなく、<u>結局は情報の入手難度がデータ分析のネック</u>になるという壁にぶちあたりました。"
          ],
          techImgs: ["./line-capture.mp4", "line-sequence.jpg"],
          thumbnail: "./line-thumbnail.png",
          achvs: [
            "<u>LINE Messaging API</u>と<u>Herokuへのデプロイ</u>を学びました。Herokuサーバーがアメリカにあるせいで時間の処理が狂い、面食らったことも。",
            "<u>Shell ScriptとFFMPEG</u>で動画を効率的に編集しました。",
            "<u>Ngrok</u>の使いかたがわかりました。ただなぜかサーバーが反応しないときもあって苦労させられました。"
          ]
        },
        {
          name: "仙台高齢化地域の可視化",
          identifier: "ageing",
          rating: 3,
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
          techs: [
            "<u>Leaflet.js</u>で、OpenStreetMapの地図上に描画します。",
            "Pythonの<u>Pandas</u>やC言語でデータを加工します。",
            "<u>カラーマッピング</u>（どの値をどの色に対応させれば見やすいのか？）の有名な計算手段を<a href='https://azureleaf.github.io/ageing-sendai/colormap.html'>いくつか検討しました</a>。",
            "「町別の年齢人口分布統計のExcelファイル」「町別の緯度経度情報のExcelファイル」など<u>複数の表をうまくJOINできるようデータを整形</u>しました。",
            "「重複データを発見して取り除く」「４丁目と四丁目の表記のゆれを統一する」「データ区分ごとの集計」などの面倒だけど考慮しなければならない煩雑な処理は、全てコーディングで処理します。"
          ],
          techImgs: ["./ageing_heatmap_screenshot.jpg", "./ageing.jpg"],
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
            "<u>予約の自動操作機能</u>: この病院では、診察前にインターネット上で診療を予約し、予約番号を取得する必要があります。ブラウザを自動で操作し、患者情報（氏名、生年月日、診察券番号など）を入力できます。",
            "<u>予約タイマー機能</u>: タイマーを設定できるので、予約受付開始時間になると勝手にやってくれます。",
            "<u>混雑状況の取得機能</u>: この病院は診察中の患者の予約番号をインターネット上で公開しています。ここに自動で定時に（たとえば15分置き）自動アクセスし、ウェブページを解析し、診察状況をDBに蓄積していきます。",
            "<u>混雑状況の傾向を可視化</u>: 上記のプログラムで溜めたデータを集計し、毎日どれくらいの速度で診察が進むのかをざっとグラフに図示します。"
          ],
          funcImg: "",
          techImgs: ["./hospital_reserve.mp4", "hospital-throughput.png"],
          thumbnail: "./hospital-thumbnail.png",
          techs: [
            "自動予約の動作に、テストツールである<u>Selenium</u>",
            "ウェブサイトへの自動アクセスとウェブスクレイピングに<u>BeautifulSoup</u>モジュール",
            "Pythonの<u>sched</u>によるスクリプトのタイマー実行、<u>matplotlib</u>によるグラフ描画なども利用",
            "自動予約の動作を以下に示します。（本来は自動予約作業を翌朝にスケジューリングしますが、この動画では実演のため即時実行しています。再生速度は実際と同じです。）"
          ],
          achvs: [
            "この病院は人気が高く、予約を取るのが先着順なので凄まじい競争になっていました。<u>早朝に早起きしてパソコンの前で待ち構え、予約受付開始とともにできるだけ早く予約を完了する必要がありました</u>が、自動化でとても楽になりました。"
          ]
        },
        {
          name: "チャットツール ChatQuack",
          identifier: "chat",
          rating: 2,
          desc:
            "国産チャットアプリ「Chatwork」を勉強のため模写し、その中で<u>NuxtとFirebase</u>を使ってみました。",
          demourl: "https://vue-auth-test-ff8ed.web.app/",
          githuburl: "https://github.com/azureleaf/chat-quack/",
          frameworks: ["nuxt", "firebase"],
          backends: ["Firebase Hosting + Firestore"],
          funcs: [
            "複数のメンバーの間でメッセージを送れます。グループチャットも可能です。",
            "オンラインのFirestoreを通じ即時反映されます。（※ただしデモページで公開しているのは、Firestoreを使わない版です。チャット履歴は永続化されていません。）"
          ],
          funcImg: "",
          techs: [
            "<u>Firestore</u>によるシンプルかつリアルタイムなチャットを実現しています。",
            "<u>Nuxt.js + Vuetify</u>によるマテリアルデザイン。",
            "<u>Firebase Hosting</u>でのデプロイ。"
          ],
          techImgs: ["/chat-capture.jpg"],
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
            "Canvas内部で<u>３点をクリック</u>すると、その三角形の重心・外心・内心・垂心・傍心の<u>五心を補助線とともに描画</u>します。",
            "三角形の自動生成機能や、五心それぞれの表示を切り替えるチェックボックスにより、表示内容を様々にカスタマイズできます。",
            "ウィンドウのサイズなどを検知し、見やすい最適なレイアウトで表示します。"
          ],
          funcImg: "",
          techs: [
            "Vue.jsを使わない、<u>生のJavaScriptでのDOM処理</u>を行っています。",
            "DOM要素のうち繰り返し処理が必要な箇所は、<u>document.createElement()</u>などを使って一括で生成。",
            "UI要素やGridレイアウトによるBreakpoint指定に<u>Bootstrap</u>を活用。"
          ],
          techImgs: ["goshin-capture.jpg"],
          achvs: [
            "<u>HTML Canvas</u>のイベント処理、Bootstrapの使い方がわかりました。",
            "<u>JSDoc</u>などコーディング規約を知りました。",
            ".forEach()やオブジェクト指向を使って可読性を向上させることを勉強しました。"
          ]
        },
        {
          name: "フラクタルを描こう",
          identifier: "fractal",
          rating: 2,
          desc:
            "<u>HTML Canvasに再帰を使う</u>ことで、きれいで複雑な図形を描画します。「ジェネラティブ・アート」という、プログラミングを使った芸術手法です。",
          demourl: "https://azureleaf.github.io/canvas/fractal/canvastree.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
          funcs: [
            "<u>「ある点から出発し、決められた角度で枝分かれする」</u>という非常に単純な動作を繰り返し、それを可視化することで複雑で美しい幾何学図形を描けます。",
            "繰り返しの回数、枝分かれの角度、長さ、配色などを<u>ユーザが自由に変更できるコントロール</u>をつけたので、設定を変えて遊ぶことができます。"
          ],
          funcImg: "",
          techs: [
            "<u>Canvas</u>による描画。",
            "<u>Vuetifyによる各種コントロール要素（カラーピッカー、スライダー、ボタンなど）</u>の利用。",
            "<u>再帰</u>の活用。"
          ],
          techImgs: ["fractal-capture.jpg"],
          achvs: [
            "Vuetifyの便利さがとてもよくわかりました。きれいなコンポーネント要素がサクッと実装できます。こういった機能について車輪の再発明していくのは地獄ですし人生の時間を浪費することになるので、本当にありがたいです。"
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
            "気象庁ウェブサイトから入手した生データはそのままでは利用できないので、不要な列の削除や列名の変更などをPythonで自動処理しました。このような処理は地味ですが本当に手間がかかります。"
          ],
          techImgs: ["climate-capture.jpg"],
          achvs: ["<u>Chart.js</u>によるグラフ描写ができるようになりました。"]
        },
        {
          name: "LANストーカー",
          identifier: "stalker",
          rating: 1,
          desc:
            "LANを自動スキャンし、<u>接続中デバイスのMACアドレスを追跡する</u>性格の悪いプログラムです。ネットワークを勉強する際に、身近な機器で何か遊べないか興味が湧きつくりました。",
          demourl: "https://azureleaf.github.io/lan-device-stalker/",
          githuburl: "https://github.com/azureleaf/lan-device-stalker",
          frameworks: ["js", "py"],
          backends: ["SQLAlchemy ORM + SQLite"],
          funcs: [
            "PythonからARPをブロードキャストで掛けて、反応があったデバイスのMACアドレスを記録します。（LANに接続していないデバイスは当然追跡できません）",
            "このプログラムを指定した時間ごとに自動でかけ、その結果をSQLiteのDBに集積していきます",
            "保存したデータを整形し、D3.jsを使って、<u>ヒートマップとして可視化</u>します。",
            "これにより、<u>「誰がいつ頃在室していたのか」「どのパソコンが頻繁に使われているのか」</u>などが推測できます。",
            "どのMACアドレスのNICが誰の持ち物なのか、目視で判断し紐付けします。一度紐付けを済ませると、それ以降は各個人の在室状況を追えるようになります。"
          ],
          funcImg: "",
          techs: [
            "<u>SQLAlchemy</u>により、SQL文を直接書くことなくDBを操作しています。",
            "<u>ARP-SCAN</u>や<u>Scapy</u>などのネットワーク系有名ライブラリを利用。",
            "D3.jsによる可視化。",
            "Pythonのschedライブラリによるスケジューリング実行機能。"
          ],
          techImgs: ["stalker-capture.jpg"],
          achvs: [
            "超有名な可視化ライブラリ<u>D3.js</u>の基礎がわかりました。",
            "PythonのORMに触れました。PythonのORMは初めてでした。"
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
