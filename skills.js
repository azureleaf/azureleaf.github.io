var SkillTable = Vue.component("skill", {
  template: `
    <v-content>
      <v-container>
        <v-card elevation="20" class="mt-10">
          <v-card-title class="display-1 pb-8"
            >スキル</v-card-title
          >
          <v-card-subtitle class="subtitle-1"
            >私が今までに使ったツールです。下線を引いたものは、特によく使っているものです。
          </v-card-subtitle>
        </v-card>
        <v-card v-for="(group, index) in groups" elevation="10" class="my-8" >
          <v-app-bar flat class="white--text" :color="bgColors[index % 3]">
            <v-card-title class="font-weight-bold"
              >{{group.groupName}}</v-card-title
            >
          </v-app-bar>
          <v-card-subtitle>
            {{ group.groupComment}}
          </v-card-subtitle>
          <v-card-text>
            <v-data-table
              :headers="skillHeaders"
              :items="group.skills"
              hide-default-footer
              :items-per-page="30"
            >
              <template v-slot:item.title="{item}">
                <b v-html="item.title"></b>
              </template>
              <template v-slot:item.desc="{item}">
                <p class="my-3" v-html="item.desc"></p>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>
  `,
  data: function () {
    return {
      groups: [
        {
          groupName: "私について",
          skills: [
            {
              title: "プログラミング",
              desc:
                "始めたのは大学入学後ですが、プログラミングは自分の性分によく合っていると感じます。今後Web開発したいもののプランはいくつもありますが、勉強すべきことも本当に多いとつくづく実感させられます。",
            },
            {
              title: "語学",
              desc:
                "私の趣味です。英語は日常会話には問題なく、また中国語資料でも情報収集できます。プログラマの世界はStackOverflowをはじめ英文だらけなので、趣味と実益双方を兼ねています。",
            },
            {
              title: "性格",
              desc:
                "ひとつの物事に没頭して作業し続ける性格です。ただ何事もやりすぎては意味がありませんので、他人との関わりの中でこの性格を上手く制御し活かすべきものだと思います。",
            },
            {
              title: "コミュニケーション能力",
              desc:
                "世の中にはコミュ力の非常に高い人間がいて圧倒されます。私は理系としては平均くらいでしょうか。とはいえ、プログラミングを勉強する人たちに私から声をかけて数人で毎週勉強会をやったり、仙台のIT関係の勉強会にあちこち首を突っ込むくらいの行動力はあり、通常の社会生活には問題ありません。「陽キャじゃないけど説明力がとても高い」とは私に対するある人の評。",
            },
            {
              title: "体力",
              desc:
                "仙台周辺の町やら山やら毎日歩いており、タフな方だと思います。生活の中で運動習慣があることは精神衛生上も役立っています。通常は一日１万歩程度ですが、最長だと秋保温泉まで一日45km歩きました。お気に入りの行先は愛子の蕃山。",
            },
            {
              title: "犬派",
              desc:
                "スキルと無関係な話ですが私は犬がとても好きで、今飼いたい犬種は和犬なら甲斐犬、洋犬ならボーダーコリーかオーストラリアン・シェパードです。",
            },
          ],
        },
        {
          groupName: "言語",
          skills: [
            {
              title: "<u>JavaScript</u> / TypeScript",
              desc:
                "今後TSに積極的に移行したいです。",
            },
            {
              title: "<u>Python</u>",
              desc: "一番使っているのはJSですが、一番好きなのはPython。",
            },
            {
              title: "PHP",
              desc: "Laravelはよくまとまっており、とても良いものだと思います。",
            },
            {
              title: "C / C++",
              desc:
                "大学でCは制御プログラムで、C++はOpenCVを使う際に使いました。最近は巨大ファイルの処理など速度が必要な時使います。",
            },
            {
              title: "Java",
              desc:
                "大学でImageJという画像処理ソフトのプラグインを改良するのに使いました。",
            },
            {
              title: "VBA",
              desc:
                "エクセルのマクロで使いましたが、遅いし行数制限はあるしでイマイチだった思い出。",
            },
          ],
        },
        {
          groupName: "開発ツール",
          groupComment:
            "この中で今後特に力を入れたいのは、DockerとKubernetesです。",
          skills: [
            {
              title: "OS",
              desc: "<u>Ubuntu Bionic</u> / Windows / CentOS + Nginx（大学研究室のサーバ運用で使いました）",
            },
            {
              title: "Editor",
              desc:
                "<u>Visual Studio Code</u> / Vim / Visual Studio / PyCharm / IntelliJ IDEA",
            },
            {
              title: "Git",
              desc: "<u>GitHub</u> / <u>GitLab</u> / BitBucket",
            },
            {
              title: "コミュニケーション",
              desc: "<u>Slack</u> / Chatwork / Trello",
            },
            {
              title: "仮想環境系",
              desc: "Docker / VirtualBox + Vagrant / <u>pipenv</u> / virtualenv",
            },
            {
              title: "コードフォーマット（VS Code）",
              desc:
                "<u>Prettier</u> / <u>Vetur</u> / <u>ESLint</u> / TSLint / <u>Autopep8</u> / <u>Flake8</u> / php cs fixer / PHP Intelephense",
            },
            { title: "テスト系", desc: "Cypress / Jest / Postman" },
            {
              title: "その他",
              desc:
                "Wireshark（共用ネットワークで野良DHCPサーバが立ってトラブった時に使いました） / WordPress(学生団体のサイト運用で使用) ",
            },
          ],
        },
        {
          groupName: "フロントエンド",
          groupComment: "Vue.jsが好きです。",
          skills: [
            {
              title: "Vue",
              desc:
                "<u>Vue.js</u> / <u>Vue-Router</u> / <u>Vuex</u> / <u>Vuetify</u>（このポートフォリオサイトでもマテリアルデザインのため使っています。）",
            },
            { title: "React", desc: "React" },
            { title: "HTML / CSS", desc: "Pug / Stylus / Bootstrap" },
          ],
        },

        {
          groupName: "バックエンド",
          groupComment: "Expressを主に触っていましたが、結局どのフレームワークもORMも思想は似ているため違いはあまりないように感じます。",
          skills: [
            {
              title: "Webフレームワーク",
              desc: "<u>Express.js</u> / Flask / Laravel",
            },
            { title: "ORM", desc: "<u>TypeORM</u> / Sequelize / Eloquent" },
            {
              title: "DB",
              desc: "<u>SQLite</u> / MySQL / PostgreSQL / MongoDB / Firebase",
            },
            {
              title: "Node.js",
              desc:
                "<u>axios</u> / bcrypt / Passport.js / socket.io / Babel / gulp / Webpack",
            },
            { title: "その他", desc: "Heroku" },
          ],
        },
        {
          groupName: "データ処理",
          groupComment:
            "機械学習はMNISTの手書き文字入力や猫の画像分類のチュートリアルを動かした程度なのですが、AIは私が生きる世代の最重要技術だと思いますので、今後一番力を入れたい。",
          skills: [
            { title: "行列処理", desc: "<u>Pandas</u> / <u>Numpy</u>" },
            {
              title: "機械学習系",
              desc: "Scikit-learn / Tensorflow / PyTorch",
            },
            {
              title: "ウェブスクレイピング",
              desc: "<u>BeautifulSoup</u> / Selenium",
            },
            {
              title: "可視化",
              desc: "Chart.js / Three.js / Matplotlib / Leaflet.js",
            },
          ],
        },
      ],
      skillHeaders: [
        {
          text: "Name",
          sortable: false,
          value: "title",
          width: "20%",
        },
        {
          text: "Content",
          sortable: false,
          value: "desc",
        },
      ],
      bgColors: ["red darken-4", "green darken-4", "blue darken-4"],
    };
  },
});
