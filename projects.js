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
                ポートフォリオサイトへのご訪問ありがとうございます。ここ一年くらいの私の作品の一部をご説明します。<br>
                各プロジェクトのデモページをぜひご覧ください。プロジェクトの詳細な解説は、それぞれのGitHubのリンク先に書いてあります。
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
            <v-card v-for="(project, index) in projects" elevation="10" class="my-8" >
              <v-card-title :id="project.identifier">
                {{project.name}}
                <a v-if="project.demourl.length != 0" :href="project.demourl">
                  <i class="fas fa-external-link-alt fa-lg pl-6"></i> Demo
                </a>
                <a v-if="project.githuburl.length != 0" :href="project.githuburl">
                  <i class="fab fa-github fa-lg pl-6"></i> Source
                </a>
              </v-card-title>
              <v-card-text>
                <v-card outlined class="my-2">
                  <v-card-title>機能</v-card-title>
                  <v-card-text>
                    <ul>
                      <li v-for="(func, index) in project.funcs" :key="index">{{func}}</li>
                    </ul>
                    <img :src="project.funcImg" class="mt-4"/>
                  </v-card-text>
                </v-card>
                <v-card outlined class="my-2">
                  <v-card-title>技術面</v-card-title>
                  <v-card-text>
                    <ul>
                      <li v-for="(tech, index) in project.techs" :key="index">{{tech}}</li>
                    </ul>
                  </v-card-text>
                </v-card>
                <v-card outlined>
                  <v-card-title>収穫</v-card-title>
                  <v-card-text>
                    <ul>
                      <li v-for="(achv, index) in project.achvs" :key="index">{{achv}}</li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-container>
        </v-content>`,
  data: function () {
    return {
      msg: "hello, world",
      projects: [
        {
          name: "仙台高齢化地域の可視化",
          identifier: "ageing",
          desc:
            "仙台の町ごとの高齢人口比率をヒートマップで表示します。一市民として興味のある内容なので、個人的に気に入っているプロジェクトです。",
          demourl: "https://azureleaf.github.io/ageing-sendai/",
          githuburl: "https://github.com/azureleaf/ageing-sendai",
          frameworks: ["py", "js", "c"],
          backends: [],
          funcs: [
            "地図上でインタラクティブに高齢化地域を操作できます。",
            "高齢化率で色分けしているので一目瞭然です。",
            "クリックすることで詳細情報がポップアップで表示できます"
          ],
          funcImg: "img/ageing_heatmap_screenshot.jpg",
          techs: [
            "Leaflet.jsにより、地図タイルのレイヤを設置しています。",
            "データ処理はPythonのPandasで主に行いましたが、一部C言語なども使いました。",
            "仙台市や国が公開したファイルは「五歳くぎり・町ごと・男女別年齢人口分布のデータ」「町ごとの緯度経度のデータ」なので、これを",
            "複数の字（あざ）を大字（おおあざ）にまとめる、細かな表記の違い（４丁目と四丁目、など）を統一する、などのきめ細かな処理が必要でした。",
          ],
          achvs: [
            "地図を使った可視化の勉強になりました。見た目が色鮮やかでインタラクティブなUIは、やはり使っていて楽しいものです。",
            "データ分析前にきちんとデータの整合性や形式を確認しておくことの大切さが痛いほど身にしみました",
          ],
        },
        {
          name: "学生寮運営システム",
          identifier: "dorm",
          desc:
            "ログイン機能・会計処理機能・当番割振機能をもったWebサービス。一番本格的で実用的なプロジェクト。",
          demourl: "",
          githuburl: "",
          frameworks: ["js", "php", "laravel", "vue"],
          backends: ["Laravel + Eloquent + Postgres"],
        },
        {
          name: "激強五目並べ",
          identifier: "gomoku",
          desc:
            "コンピュータを相手に戦う五目並べです。敵側がめちゃくちゃ強くて、ほぼ勝てない。<a href='https://github.com/azureleaf/gomoku'>React版もあります。</a>私がWeb系の勉強をはじめた直後にはじめたものなので、思い入れがあります。",
          demourl: "",
          githuburl: "",
          frameworks: ["vue", "react"],
          backends: [],
        },
        {
          name: "三角形の五心",
          identifier: "triangle",
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
          identifier: "line",
          desc:
            "LINEのボット。彼にGPSの現在位置を投げると、一番近くにあるバス停と地下鉄の駅を検索して返してくれます。Herokuで稼働中。本当はバス発車時刻も提示してほしかったが、仙台市交通局がそのデータを公開していなかった。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/greet_bot",
          frameworks: ["py"],
          backends: ["Flask"],
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
        },
        {
          name: "日本の大都市で気候が一番良いのはどこ？",
          identifier: "climate",
          desc:
            "日本７大都市の気温・降水量・日照を比較して、仙台がベストだということを証明したいのです。",
          demourl: "",
          githuburl: "https://github.com/azureleaf/japan-city-climate",
          frameworks: ["js", "py"],
          backends: [],
        },
        {
          name: "リアルタイムチャット",
          identifier: "chat",
          desc: "socket.io",
          demourl: "",
          githuburl: "",
          frameworks: ["js", "vue"],
          backends: ["Firebase"],
        },
        {
          name: "フラクタルでパセリ描画",
          identifier: "fractal",
          desc:
            "関数の再帰を利用することで、複雑な図形をとても簡単に描画できます。",
          demourl: "https://azureleaf.github.io/canvas/fractal/canvastree.html",
          githuburl: "https://github.com/azureleaf/canvas/",
          frameworks: ["js"],
          backends: [],
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
        },
        {
          name: "ログイン機能をつくる",
          identifier: "user_login",
          desc:
            "勉強仲間との共同作業のレポジトリ。Axiosでの通信、非同期処理、ORMでのDBへのアクセス、Bcryptによるハッシュ化、トークンの保存、Cypressでの自動テストなどを、一つ一つ丁寧に実装しました。",
          demourl: "",
          githuburl: "https://github.com/yuyu456-corder/user_login",
          frameworks: ["vue"],
          backends: ["Express + Sequelize + SQLite"],
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
        },
      ],
      projectHeaders: [
        {
          text: "Project",
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
    addSharp: function (str) {
      return "#" + str;
    },
  },
});
