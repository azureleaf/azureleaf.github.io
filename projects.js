// Define component here
// Writing template with template literal (``) sucks! Awful readability, no linting
// Before pasting the code here, you better write the template code somewhere to ensure it works
var ProjectTable = Vue.component("project", {
  template: `
        <v-content>
            <v-container>
            <v-card elevation="20" class="my-10">
                <v-card-title class="display-1 mx-4 py-8"
                >プロジェクト一覧</v-card-title
                >
                <v-card-subtitle class="ml-4 subtitle-1"
                >ポートフォリオサイトへのご訪問ありがとうございます！ここ一年ほどの私の作品を一部ご紹介します。<br>
                各プロジェクトのデモページと、プロジェクトを詳細に解説したGitHubのREADMEへのリンク先も貼りましたので、ぜひご覧ください。</v-card-subtitle
                >
                <v-card-text>
                <v-data-table
                    :headers="projectHeaders"
                    :items="projects"
                    hide-default-footer
                    :items-per-page="20"
                >
                    <template v-slot:item.name="{item}">
                    <b>{{item.name}}</b>
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
            </v-container> </v-content
        >`,
  data: function () {
    return {
      msg: "hello, world",
      projects: [
        {
          name: "仙台高齢化地域の可視化",
          desc:
            "仙台の町ごとの高齢人口比率をヒートマップで表示します。一市民として興味の湧く事柄なので、個人的に気に入っているプロジェクトです。Pandasのデータフレーム操作の便利さに感動しました。",
          demourl: "https://azureleaf.github.io/ageing-sendai/",
          githuburl: "https://github.com/azureleaf/ageing-sendai",
          frameworks: ["py", "js", "c"],
          backends: [],
        },
        {
          name: "学生寮情報管理システム",
          desc:
            "学生寮の会計機能・当番割振機能・情報投稿機能をもったWebサービス。一番本格的で実用的なプロジェクト。",
          demourl: "",
          githuburl: "",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
        },
        {
          name: "激強五目並べ",
          desc:
            "コンピュータを相手に戦う五目並べです。COM側がめちゃくちゃ強くて、ほぼ勝てない。私がWeb系の勉強をはじめて最初に作った作品なので、思い入れがあります。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/gomoku",
          frameworks: ["vue", "react"],
          backends: [],
        },
        {
          name: "三角形の五心",
          desc:
            "マウスで三角形を描くと、三角形の重心・内心・外心・傍心・垂心を自動で描画してくれます。幾何学的できれい。Canvasを使ってマウスなどとのインタラクションを勉強しました。",
          demourl:
            "https://azureleaf.github.io/canvas/triangle/triangle_centers.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
        },
        {
          name: "仙台バス停・地下鉄検索ボット",
          desc:
            "LINEのボット。彼にGPSの現在位置を投げると、一番近くにあるバス停と地下鉄の駅を検索して返してくれます。Herokuで稼働中。本当はバス発車時刻も提示してほしかったが、仙台市交通局がそのデータを公開していなかった。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/greet_bot",
          frameworks: ["py"],
          backends: ["Flask + Firebase"],
        },
        {
          name: "WiFiストーカー",
          desc:
            "LANを定期的に自動スキャンし、接続中のデバイスのMACアドレスを取得します。他の人のスマホやPCの接続有無をもとにその人の在室状況を追跡しようとする、嫌らしいプログラム。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/lan-device-stalker",
          frameworks: ["js", "py"],
          backends: ["SQLite"],
        },
        {
          name: "通院アシスタント",
          desc:
            "近所に予約制の病院があり、病院ウェブサイトでリアルタイムの診察状況を公開しています。このスクリプトはそのウェブサイトから現在の混雑状況を自動取得し、また病院ウェブサイト上での受診予約まで自動でやってくれる優れものです。ウェブスクレイピングとブラウザ操作自動化の練習台。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/hospital_latency",
          frameworks: ["py", "vue", "js"],
          backends: ["Express.js + TypeORM + MySQL"],
        },
        {
          name: "日本の大都市で気候が一番良いのはどこだ？",
          desc:
            "地理データの可視化シリーズ。日本７大都市の気温・降水量・日照を比較し、仙台がベストだということを証明したい。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/japan-city-climate",
          frameworks: ["js", "py"],
          backends: [],
        },
        {
          name: "リアルタイム掲示板",
          desc:
            "socket.io",
          demourl: "",
          githuburl: "",
          frameworks: ["js", "vue"],
          backends: ["Express + TypeORM + Posgtres"],
        },
        {
          name: "フラクタルでパセリ描画",
          desc:
            "再帰表現を使って図形を描画します。HTML Canvasの勉強のため作成。",
          demourl: "https://azureleaf.github.io/canvas/fractal/canvastree.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
        },
        {
          name: "プログラミング学習ノート",
          desc:
            "プログラミングについての膨大な勉強メモをマークダウンにまとめたものです。特に<a href='https://github.com/azureleaf/study-notes/blob/master/js/promise.md'>Promiseについて</a>は結構まとめました。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/study-notes",
          frameworks: ["js", "py"],
          backends: [],
        },
        {
          name: "Express.js練習台",
          desc:
            "バックエンドの練習台。特に何かサービスの形にはなっていませんが、Expressの基本的な機能、Axios、ORM、種々のDBにさらっと触れるためのレポジトリ。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/hello-express",
          frameworks: ["vue"],
          backends: ["Express + TypeORM + SQLite"],
        },
        {
          name: "ログイン機能をつくる",
          desc:
            "知人のGitHubレポジトリへの私のcontribution。Axiosでの通信、非同期処理、ORMでのDBへのアクセス、Bcryptによるハッシュ化、トークンの保存などを、協力しながら一つ一つ丁寧に実装しました。",
          demourl: "",
          githuburl: "https://github.com/yuyu456-corder/user_login",
          frameworks: ["vue"],
          backends: ["Express + Sequelize + SQLite"],
        },
        {
          name: "ポートフォリオサイト",
          desc:
            "このサイトそのもの。単なる静的サイトなので速攻で終わると思っていたら、CDNでVue-Routerを使うのはわりと苦戦しました。それにしてもVuetifyのマテリアルデザインはきれい。Font Awesomeのアイコン充実化に寄与しているデザイナーにも頭があがらない。",
          demourl: "https://azureleaf.github.io/",
          githuburl: "https://github.com/azureleaf/azureleaf.github.io",
          frameworks: ["vue"],
          backends: [],
        },
      ],
      projectHeaders: [
        {
          text: "Project",
          sortable: false,
          value: "name",
        },
        {
          text: "Video",
          sortable: false,
          value: "video",
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
          text: "Summary",
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
    };
  },
  methods: {
    isUsing: function (frameworks, framework) {
      return frameworks.includes(framework);
    },
  },
});
