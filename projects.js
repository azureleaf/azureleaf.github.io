// Define component here
// Writing template with template literal (``) sucks! Awful readability, no linting
// Before pasting the code here, you better write the template code somewhere to ensure it works
var ProjectTable = Vue.component("project", {
  template: `
    <v-content>
        <v-container>
        <v-card elevation="10" class="mt-10">
          <v-card-title class="headline font-weight-bold pb-8">プロジェクト一覧</v-card-title>
            <v-card-subtitle class="subtitle-1">
            ポートフォリオサイトへのご訪問ありがとうございます！<br>最近の私の制作物をご紹介いたします。デモページもぜひご覧ください。
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
              <template v-slot:item.projIndex="{item}">
                {{ projectIds.indexOf(item.identifier) + 1 }}
              </template>
              <template v-slot:item.name="{item}">
                <b><router-link :to="addSharp(item.identifier)">{{item.name}}</router-link></b><br>
              </template>
              <template v-slot:item.desc="{item}">
              <p class="my-3"><span v-html="item.desc"></span></p>
              </template>
              <template v-slot:item.demourl="{item}">
              <a v-if="item.demourl.length != 0" :href="item.demourl"
                  ><i class="fas fa-external-link-alt fa-2x"></i
              ></a>
              </template>
              <template v-slot:item.githuburl="{item}">
              <a v-if="item.githuburl.length != 0" :href="item.githuburl">
                <i class="fab fa-github fa-2x"></i>
              </a>
              </template>
              <template v-slot:item.backends="{item}">
              <span v-if="item.backends.length == 0">-</span>
              <p
                  v-else
                  v-for="backend in item.backends"
                  class="ma-0 pa-0"
              >
                {{backend}}
              </p>
              </template>
              <template v-slot:item.frameworks="{item}">
                <i
                    v-if="isUsing(item.frameworks, 'js')"
                    class="fab fa-js fa-2x iconColor"
                ></i>
                <i
                    v-if="isUsing(item.frameworks, 'php')"
                    class="fab fa-php fa-2x iconColor"
                ></i>
                <i
                    v-if="isUsing(item.frameworks, 'laravel')"
                    class="fab fa-laravel fa-2x iconColor"
                ></i>
                <i
                    v-if="isUsing(item.frameworks, 'vue')"
                    class="fab fa-vuejs fa-2x iconColor"
                ></i>
                <i
                    v-if="isUsing(item.frameworks, 'react')"
                    class="fab fa-react fa-2x iconColor"
                ></i>
                <i
                    v-if="isUsing(item.frameworks, 'py')"
                    class="fab fa-python fa-2x iconColor"
                ></i>
                <i
                    v-if="isUsing(item.frameworks, 'c')"
                    class="fab fa-cuttlefish fa-2x iconColor"
                ></i>
                <i
                    v-if="isUsing(item.frameworks, 'html')"
                    class="fab fa-html5 fa-2x iconColor"
                ></i>
                <i
                v-if="isUsing(item.frameworks, 'md')"
                  class="fab fa-markdown fa-2x iconColor"
                ></i>
              </template>
            </v-data-table>
            </v-card-text>
        </v-card>
        <v-card v-for="(project, index) in projects" :key="index" elevation="10" class="my-8" >
          <v-toolbar flat class="white--text" :color="bgColors[index % 3]" :id="project.identifier" dark>
            <v-toolbar-title>
              <span class="font-weight-bold">
                {{index + 1}}. {{project.name}}
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
              <i class="fas fa-external-link-alt fa-lg pr-1"></i>デモを開く</v-btn
            >
            <v-btn
              v-if="project.githuburl.length != 0"
              outlined
              large
              tile
              :href="project.githuburl"
              class="px-3 font-weight-bold subtitle-1"
            >
              <i class="fab fa-github fa-lg pr-2"></i>GitHubを開く
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
                    >
                  </li>
                </ul>
                <img :src="project.funcImg" class="mt-4"/>
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
                    class="comfy_list">
                  </li>
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
                    class="comfy_list">
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>`,
  data: function () {
    return {
      // List of all the project id strings
      // Will be set on mounted
      projectIds: [],
      projects: [
        {
          name: "仙台高齢化地域の可視化",
          identifier: "ageing",
          desc:
            "仙台の町ごとの高齢人口比率を地図上にヒートマップで表現します。私も一住民として興味のある内容なので、おもしろかったです。<u>データ処理とデータ可視化</u>の練習台。",
          demourl: "https://azureleaf.github.io/ageing-sendai/",
          githuburl: "https://github.com/azureleaf/ageing-sendai",
          frameworks: ["py", "js", "c"],
          backends: [],
          funcs: [
            "高齢化率を地区ごとに色分けしているので一目瞭然です。",
            "地図上でインタラクティブに操作できます。",
            "クリックすると詳細情報がポップアップで表示できます",
          ],
          funcImg: "img/ageing_heatmap_screenshot.jpg",
          techs: [
            "<u>Leaflet.js</u>で、OpenStreetMapの地図上に描画します。",
            "Pythonの<u>Pandas</u>やC言語でデータを加工します。",
            "<u>カラーマッピング</u>（どの値をどの色に対応させれば見やすいのか？）の有名な計算手段をいくつか検討しました。",
            "「町別の年齢人口分布統計のExcelファイル」「町別の緯度経度情報のExcelファイル」など<u>複数の表をうまくJOINできるようデータを整形</u>しました。",
            "「重複データを発見して取り除く」「４丁目と四丁目の表記のゆれを統一する」「データ区分ごとの集計」などは全てコーディングで処理します。",
          ],
          achvs: [
            "地図を使った可視化の勉強になりました。<u>色鮮やかでインタラクティブなUI</u>は、やはりインパクトがあります。",
            "<u>分析前の生データの質がどれほど重要か</u>、痛いほど身にしみました。苦労してデータ処理したのに、後から元データの不備が判明しそこまでの苦労が水の泡…という悲劇が何度もありました。",
          ],
        },
        {
          name: "寮運営システム",
          identifier: "dorm",
          desc:
            "学生寮の<u>業務自動化ツール</u>。ログイン機能・会計処理機能・当番割振機能をもっており、最も実用的なプロジェクトです。",
          demourl: "",
          githuburl: "",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
          funcs: [],
          funcImg: "",
          techs: ["Cypressによるテスト自動化"],
          achvs: [],
        },
        {
          name: "激強五目並べ",
          identifier: "gomoku",
          desc:
            "コンピュータを相手に戦う五目並べです。強すぎてほぼ勝てません。<a href='https://github.com/azureleaf/gomoku'>React版もあります</a>。Web系の勉強で最初につくったものなので、思い入れが深いです。<u>Vueのイベント処理</u>の練習台。",
          demourl: "",
          githuburl: "",
          frameworks: ["vue", "react"],
          backends: [],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "三角形の五心",
          identifier: "triangle",
          desc:
            "ユーザがマウスで三角形を描くと、三角形の重心などを補助線とともにきれいに自動描画します。<u>EdTech（ITによる教育の効率化）</u>を意識したツールです。",
          demourl:
            "https://azureleaf.github.io/canvas/triangle/triangle_centers.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [
            "Canvasを使ったマウスクリックなどのイベント処理を勉強しました。",
            "<u>JSDoc</u>などコーディングフォーマットを知りました。",
            "配列の.map()やオブジェクト指向を使った、可読性の高いコードの書き方に慣れました。",
          ],
        },
        {
          name: "仙台地下鉄検索Bot",
          identifier: "line",
          desc:
            "<u>Heroku上で動くLINEボット</u>です。彼にGPSの現在位置を投げると、近くにあるバス停と地下鉄の駅を検索して返してくれます。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/greet_bot",
          frameworks: ["py"],
          backends: ["Flask + SQLite"],
          funcs: [
            "スマホのLINEアプリ上でこのボットをともだちに登録し、現在位置を投げると反応します。",
            "「現在地から一番近いバス停の一覧」「現在地から一番近い地下鉄駅と発車時刻」を教えてくれます。",
            "<u>OpenWeather API</u>から取得した仙台の天気を教えてくれます。",
          ],
          funcImg: "",
          techs: [
            "Pythonの<u>Flask</u>フレームワークをHeroku上で動かしています。",
            "バス停と地下鉄駅の緯度経度情報は、国交省ウェブサイトから入手してデータ整形。",
            "地下鉄時刻表は、<u>仙台市交通局ウェブサイトからウェブスクレイピング。</u>",
            "<u>球面三角法</u>で緯度経度差分からメートル距離を算出。",
            "市営バスの時刻表データが手に入らないので、このBotでは「バスがいつ発車するのか」がわかりません。<u>結局は情報の入手難度が、データ分析のネックになるという・・・</u>",
          ],
          achvs: [
            "<u>LINE Messaging API</u>や<u>Heroku</u>の使い方を学びました。",
            "<u>GPS位置情報</u>の処理に触れました。",
            "地下鉄発車時刻がわかるのは実際便利です。プログラミングを勉強するにしても、自分の役に立つものを作れると達成感もひとしおです。",
          ],
        },
        {
          name: "WiFiストーカー",
          identifier: "stalker",
          desc:
            "LANを自動スキャンし、接続中デバイスのMACアドレスから人々の在室状況を追跡する、いやらしいプログラムです。<u>ネットワーク技術</u>を勉強する助けとして作成。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/lan-device-stalker",
          frameworks: ["js", "py"],
          backends: ["SQLite"],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "通院アシスタント",
          identifier: "hospital",
          desc:
            "私のかかりつけ病院のウェブサイトに自動アクセスしてリアルタイムの混雑状況を取得し、受診のオンライン予約まで自動でやってくれます。<u>ウェブスクレイピングとブラウザ操作自動化</u>の題材。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/hospital_latency",
          frameworks: ["py", "vue", "js"],
          backends: ["Firebase"],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [
            "この病院は人気のため、予約を取るのが先着順の凄まじい競争になっていました。自動化はまあズルですけど、とても楽になりました。",
          ],
        },
        {
          name: "仙台の気候は住みやすい？",
          identifier: "climate",
          desc:
            "日本７大都市の気候データを比較します。仙台が年々暑くなってきているのかも確かめたい。<u>データ可視化と統計分析（時系列解析）</u>の練習台。",
          demourl: "https://azureleaf.github.io/japan-city-climate/",
          githuburl: "https://github.com/azureleaf/japan-city-climate",
          frameworks: ["js", "py"],
          backends: [],
          funcs: [
            "各都市の真夏日、降水量、平均気温その他の基本的な気候統計を可視化します。",
            "ユーザーの重視する属性（暑いのが好き？寒いのは平気？など）によって、各都市のオススメ度を計算し推薦します。",
            "仙台で温暖化が進行しているといえるのか、統計的に判断できるか解説ページを提供します。",
          ],
          funcImg: "",
          techs: [
            "ダウンロードしてきたデータはそのままでは利用できないので、不要な列の削除や列名の変更などをPythonで自動処理しました。",
            "ややマジメな話ですが、時系列解析について詳しくご説明します。",
          ],
          achvs: [
            "<u>Chart.js</u>によるグラフ描写ができるようになりました。",
            "時系列解析を学校で習った時はあやふやな理解だったのが、実際に作業することで実感がわきました。",
          ],
        },
        {
          name: "チヤツトワーク",
          identifier: "chat",
          desc:
            "<u>socket.ioによるリアルタイム通信</u>を勉強するために、既存のチャットツールを模倣したツールを作ってみました。",
          demourl: "",
          githuburl: "",
          frameworks: ["js", "vue"],
          backends: ["Express + TypeORM + MySQL"],
          funcs: [""],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "ジェネラティブアート",
          identifier: "fractal",
          desc:
            "<u>再帰関数</u>を利用することで、複雑な図形を短いコードで描画できます。絵心がない私ですが、このような幾何学図形の美しさはわかる気がします。",
          demourl: "https://azureleaf.github.io/canvas/fractal/canvastree.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "IT学習ノート",
          identifier: "notes",
          desc:
            "プログラミングの膨大な勉強メモをまとめたものです。<u>学習モチベーションを保ち、マークダウン記法に慣れる</u>のが主眼でした。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/study-notes",
          frameworks: ["md"],
          backends: [],
          funcs: [
            "特に<a href='https://github.com/azureleaf/study-notes/blob/master/js/promise.md'>Promiseについて</a>は結構まとめました。",
          ],
          funcImg: "",
          techs: [],
          achvs: [],
        },
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
            "このサイトそのもの。<u>VuetifyとCDN</u>でスタイリッシュなVueのサイトをNode.jsなしで実現しました。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/azureleaf.github.io",
          frameworks: ["vue"],
          backends: [],
          funcs: [
            "私のプロジェクトを見てくださる方に対して、その<u>コードの背景にある私の考え方や人間性まで伝わるよう表現を工夫しました。</u>",
            "マテリアルデザインにより、シンプルでありながら見やすく統一感があります。",
            "画像やアイコンを多用することで、文字だらけで単調な感じを減らせた...と信じています。",
          ],
          funcImg: "",
          techs: [
            "<u>Vuetify</u>によるマテリアルデザイン。",
            "<u>Font Awesome</u>のアイコンセット。",
            "動画の編集圧縮に<u>ffmpeg</u>を多用。",
            "GitHubの静的ページではNode.jsを動かせないため、<u>CDN (Contents Delivery Network)</u>によりVueを導入。",
            "<u>Webpack</u>を使用することで、CDNのページでありつつも効率的にコーディングできるようにしました。"
            // "Vueは本来は複雑にコンパイルされるライブラリなので、これをCDNから使う場合は制約が多く結構苦労しました。",
          ],
          achvs: [
            "<u>CDNによるVue / Vue Router / Vuetify</u>の書き方がわかりました。Nuxtを使えばもっと楽だった気もします。",
            "GitHubでの個人ページのホスティング機能を理解しました。",
            "<u>Vue Routerでのスクロール位置の制御</u>がわかりました。",
          ],
        },
      ],
      projectHeaders: [
        {
          text: "#",
          sortable: false,
          value: "projIndex",
        },
        {
          text: "ページ内リンク",
          sortable: false,
          value: "name",
        },
        {
          text: "Demo",
          sortable: false,
          value: "demourl",
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
          width: "40%",
        },
        {
          text: "Framework",
          sortable: false,
          value: "frameworks",
        },
        {
          text: "Backend",
          sortable: false,
          value: "backends",
        },
      ],
      bgColors: ["pink darken-4", "green darken-4", "blue darken-4"],
    };
  },
  methods: {
    isUsing: function (frameworks, framework) {
      return frameworks.includes(framework);
    },
    addSharp: function (str) {
      return "#" + str;
    },
  },
  created: function () {
    this.projects.map((project) => {
      this.projectIds.push(project.identifier);
    });
  },
});
