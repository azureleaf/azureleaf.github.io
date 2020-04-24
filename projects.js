// Define component here
// Writing template with template literal (``) sucks! Awful readability, no linting
// Before pasting the code here, you better write the template code somewhere to ensure it works
var ProjectTable = Vue.component("project", {
  template: `
    <v-content>
        <v-container>
        <v-card elevation="10" class="mt-10">
          <v-card-title class="display-1 pb-8">プロジェクト一覧</v-card-title>
            <v-card-subtitle class="subtitle-1">
            ポートフォリオサイトにご訪問いただきありがとうございます！最近の私の作品を一部ご説明します。各プロジェクトのデモページもぜひご覧ください。
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
              <b><router-link :to="addSharp(item.identifier)">{{item.name}}</router-link></b>
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
              </template>
            </v-data-table>
            </v-card-text>
        </v-card>
        <v-card v-for="(project, index) in projects" :key="index" elevation="10" class="my-8" >
          <v-toolbar flat class="white--text" :color="bgColors[index % 3]" :id="project.identifier">
            <v-toolbar-title>
              <span class="font-weight-bold">
                {{index + 1}}. {{project.name}}
              </span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="subtitle-1 pl-2 py-2">
              <a v-if="project.demourl.length != 0" :href="project.demourl" class="pr-6">
                <i class="fas fa-external-link-alt fa-lg pr-1"></i>デモページ</a>
              <a v-if="project.githuburl.length != 0" :href="project.githuburl" class="">
                <i class="fab fa-github fa-lg pr-1"></i>GitHubページ
              </a>
            </div>
            <v-card outlined class="my-2">
              <v-card-title>機能</v-card-title>
              <v-card-text>
                <ul>
                  <li
                    v-for="(func, index) in project.funcs"
                    :key="index"
                    class="comfy_list">
                    {{func}}
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
                    :key="index" v-html="achv"
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
          name: "仙台高齢化ビジュアライゼーション",
          identifier: "ageing",
          desc:
            "仙台の町ごとの高齢人口比率を地図上にヒートマップで可視化します。これは私も一住民として興味のある内容なので、気に入っているプロジェクトです。",
          demourl: "https://azureleaf.github.io/ageing-sendai/",
          githuburl: "https://github.com/azureleaf/ageing-sendai",
          frameworks: ["py", "js", "c"],
          backends: [],
          funcs: [
            "地図上でインタラクティブに操作できます。",
            "高齢化率で色分けしているので一目瞭然です。",
            "クリックすると詳細情報がポップアップで表示できます",
          ],
          funcImg: "img/ageing_heatmap_screenshot.jpg",
          techs: [
            "<u>Leaflet.js</u>で、OpenStreetMapの地図上に文字や図形を配置します。",
            "Pythonの<u>Pandas</u>やC言語でデータを加工します。",
            "<u>カラーマッピング</u>（どの値をどの色に対応させれば見やすいのか？）の典型的な計算手法をいくつか検討しました。",
            "仙台市の「年齢人口分布のエクセルファイル」や国の「町ごとの緯度経度のエクセルファイル」など、<u>複数の表をうまくJOINできるようデータを整形</u>しました。",
            "複数の字（あざ）を、それが属する大字（おおあざ）にまとめるコーディング処理。",
            "「４丁目」と「四丁目」などの表記のゆれを統一するコーディング処理。",
            "年少人口・生産年齢人口・老年人口、老年化指数などを集計するコーディング処理。",
          ],
          achvs: [
            "地図を使った可視化の勉強になりました。<u>色鮮やかでインタラクティブなUI</u>は、やはりインパクトがあり見る人の興味を引きます。",
            "データ分析前にきちんとデータの質を検証しておくことの大切さが痛いほど身にしみました",
          ],
        },
        {
          name: "学生寮運営システム",
          identifier: "dorm",
          desc:
            "学生寮での業務効率化ツール。ログイン機能・会計処理機能・当番割振機能をもっており、一番本格的で実用的なプロジェクトです。",
          demourl: "",
          githuburl: "",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "激強五目並べ",
          identifier: "gomoku",
          desc:
            "コンピュータを相手に戦う五目並べです。敵側がめちゃくちゃ強くて、ほぼ勝てない。<a href='https://github.com/azureleaf/gomoku'>React版もあります</a>。Web系の勉強で最初につくったものなので、思い入れが深いです。",
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
            "マウスで三角形を描くと、三角形の重心・内心・外心・傍心・垂心を自動で描画してくれます。EdTech（IT技術による教育の効率化）を意識したツールです。",
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
            "<u>JSDoc</u>などのコーディングフォーマット",
            ".map()やオブジェクト指向を使った、可読性の高いコードの書き方を勉強する機会となりました。",
          ],
        },
        {
          name: "仙台バス停・地下鉄検索ボット",
          identifier: "line",
          desc:
            "LINEのボット。彼にGPSの現在位置を投げると、一番近くにあるバス停と地下鉄の駅を検索して返してくれます。Herokuで稼働中。本当はバス発車時刻も提示してほしかったが、仙台市交通局がそのデータを公開していなかった。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/greet_bot",
          frameworks: ["py"],
          backends: ["Flask + Firebase"],
          funcs: [
            "スマホのLINEアプリ上でこのボットをともだちに登録し、現在位置を投げると反応します。",
            "「現在地から一番近いバス停の一覧」「現在地から一番近い仙台市営地下鉄の駅と、そこからの直近の発車時刻」を教えてくれます。",
            "仙台の天気を教えてくれます。",
          ],
          funcImg: "",
          techs: [
            "<u>LINE API</u>でアプリ側と連携。アクセストークンでLINEサーバに認証します。",
            "Pythonの<u>Flask</u>バックエンドを<u>Heroku</u>上で動かしています。",
            "<u>OpenWeather API</u>で天気を取得。",
            "バス停と地下鉄の緯度経度情報は、国交省の「国土数値情報」を使用。",
            "地下鉄の発車時刻は、<u>仙台市交通局ウェブサイトからウェブスクレイピング。</u>",
            "緯度経度をメートル距離に変換するのは<u>球面三角法</u>で計算。",
            "ただし、このボットは重要な機能が欠けています。それは<u>「バスがいつ発車するのか」</u>という情報。物理的に近くにあるバス停だけわかっても意味がないのです。",
            "なので、本当は仙台市営バスの全時刻表データが欲しかったのですが、公開されていないようです。<u>こういった情報の入手困難が、結局データ分析のネックになるんですよね。。。</u>",
          ],
          achvs: [
            "<u>LINE API</u>や<u>Heroku</u>の使用方法を学びました。",
            "<u>GPS情報</u>の処理に触れることができました。",
            "特に地下鉄発車時刻は、実際に私が使う時便利です。プログラミングを勉強するにしても、実際に役立つものを作れると達成感もひとしおです。",
          ],
        },
        {
          name: "WiFiストーカー",
          identifier: "stalker",
          desc:
            "LANを定期的に自動スキャンし、接続中のデバイスのMACアドレスを取得します。他の人のスマホやPCの接続有無をもとにその人の在室状況を追跡しようとする、嫌らしいプログラム。",
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
            "近所にある某病院のウェブサイトを自動でウェブスクレイピングして今の混雑状況を分析し、またオンラインでの受診予約まで自動でやってくれる優れものです。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/hospital_latency",
          frameworks: ["py", "vue", "js"],
          backends: ["Express + TypeORM + MySQL"],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "仙台の気候は本当によいのか？",
          identifier: "climate",
          desc:
            "日本７大都市の気候を比較して、仙台がベストだと証明したいのです。さらに仙台が年々暑くなってきているのか確かめたい。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/japan-city-climate",
          frameworks: ["js", "py"],
          backends: [],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "迅速テキスト会議",
          identifier: "chat",
          desc:
            "同一の LAN / WiFi に接続している人間がその場でテキストチャットや投票できるWebサービス。参加者側のインストール不要、ログイン不要、外部サーバ不要なので迅速。",
          demourl: "",
          githuburl: "",
          frameworks: ["py", "vue"],
          backends: ["Flask"],
          funcs: [
            "QRコードを読み取ってローカルホストアドレスにアクセスしやすい。",
          ],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "フラクタルでジェネラティブアート",
          identifier: "fractal",
          desc:
            "関数の再帰を利用することで、複雑な図形をとても簡単に描画できます。",
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
          name: "プログラミング学習ノート",
          identifier: "notes",
          desc:
            "プログラミングについての膨大な勉強メモをマークダウンにまとめたものです。特に<a href='https://github.com/azureleaf/study-notes/blob/master/js/promise.md'>Promiseについて</a>は結構まとめました。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/study-notes",
          frameworks: ["js", "py"],
          backends: [],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "ログイン機能を自作する",
          identifier: "user_login",
          desc:
            "勉強仲間との共同作品。Axiosでの通信、非同期処理、ORM、Bcryptによるハッシュ化、トークンの保存、Cypressでの自動テストなどを、一つ一つ丁寧に実装しました。",
          demourl: "",
          githuburl: "https://github.com/yuyu456-corder/user_login",
          frameworks: ["vue"],
          backends: ["Express + Sequelize + SQLite"],
          funcs: [],
          funcImg: "",
          techs: [],
          achvs: [],
        },
        {
          name: "ポートフォリオサイト",
          identifier: "portfolio",
          desc:
            "このサイトそのもの。単なる静的サイトなのでVuetifyを使い速攻で終わると思っていたら、CDNでVue-Routerを使うのはわりと苦戦しました。",
          demourl: "https://azureleaf.github.io/",
          githuburl: "https://github.com/azureleaf/azureleaf.github.io",
          frameworks: ["vue"],
          backends: [],
          funcs: [
            "マテリアルデザインにより、シンプルありながら見やすく、スタイリッシュで統一感があると思います。",
            "アイコンを多用し、単調な感じを減らしています。",
          ],
          funcImg: "",
          techs: [
            "このページには繰り返し処理がかなりありますが、Vue.jsで簡単に記述できました。",
            "<u>Vuetify</u>によるマテリアルデザイン。",
            "<u>Font Awesome / Material Design Icon</u>のアイコンセット。",
            "ここに上げる動画の変換などは、<u>ffmpeg</u>というCUIツールを多用しました。",
            "GitHubの静的ページではNode.jsを動かせないため、Vueなどは全て<u>CDN (Contents Delivery Network)</u>により導入。",
          ],
          achvs: [
            "<u>CDNによるVue / Vue Router / Vuetify</u>の書き方がわかりました。本当はNuxtとかを使うともっと楽だった気もします。",
            "GitHubの無料での個人ページ・プロジェクトのホスティング機能を理解しました。",
            "<u>Vue Routerでのスクロール位置の制御</u>の方法を勉強しました。",
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
        {
          text: "GitHub",
          sortable: false,
          value: "githuburl",
        },
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
      bgColors: ["red darken-4", "green darken-4", "blue darken-4"],
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
