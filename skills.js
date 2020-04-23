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
          <v-card-title class="font-weight-bold" :color="bgColors[index % 3]"
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
          groupComment: "私がどういう人間なのかまず",
          skills: [
            {
              title: "プログラミング",
              desc:
                "始めたのは大学入学後ですが、プログラミングは自分の性分によく合っていると感じます。今後Web開発したいもののプランはいくつもありますが、そのために勉強すべきことも本当に多いとつくづく実感させられます。",
            },
            {
              title: "語学",
              desc:
                "私の趣味です。英語は口頭のコミュニケーションに問題ないレベルで、また中国語資料でも情報収集できます。プログラマは英文（特にStackOverflow）によく触れるので、趣味と実益双方を兼ねています。",
            },
            {
              title: "性格",
              desc:
                "ひとつの物事に没頭して作業を続けられる性格です。ただし何事もやりすぎては意味がありませんので、他人との関わりの中でこの性格を上手く制御し活かすべきものだと思います。",
            },
            {
              title: "コミュニケーション能力",
              desc:
                "コミュ力が非常に高い人間はたくさんおり、私は及ぶべくもありません。私は理系としては平均くらいではないでしょうか。しかし、プログラミングを勉強する人たちに声をかけて数人で毎週勉強会をやったり、仙台のIT関係の勉強会にあちこち首をつっこんだりする程度の行動力はあります。「陽キャじゃないけど説明力はとても高い」とは私に対するある人の評。",
            },
            {
              title: "体力",
              desc:
                "仙台周辺の町やら山やら毎日歩いており、体はタフな方だと思います。生活の中で運動や気分転換の習慣があることは精神衛生上も役立っています。一日１万から２万歩程度が多いですが、最大だと秋保温泉まで一日45km歩きました。お気に入りの行先は愛子の蕃山。",
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
                "今はTypeScriptはあまり使い込んでいませんが、今後JSから完全移行したいです。",
            },
            {
              title: "<u>Python</u>",
              desc: "一番使っているのはJSですが、一番好きなのはPython。",
            },
            {
              title: "PHP",
              desc: "PHPの言語自体はともかく、Laravelは良いものだと思います。",
            },
            {
              title: "C / C++",
              desc:
                "大学でCは制御プログラムで、C++はOpenCVを使う際に使いました。最近は巨大ファイルの処理などで速度が必要な時のみ使います。",
            },
            {
              title: "Java",
              desc:
                "大学でImageJという画像処理ソフトのプラグインを改良するのに使いました。",
            },
            {
              title: "VBA",
              desc:
                "エクセルのマクロでしょっちゅう使っていましたが、遅いし行数制限はあるしでイマイチだった思い出。",
            },
          ],
        },
        {
          groupName: "開発ツール",
          groupComment:
            "個人プロジェクト向けに使ったものが多いですが、外部向けに実際に使ったのは、大学での研究と、学生団体や研究室のウェブサイト管理・サーバー管理をしていた時に使ったものが多いです。この中で今後最も力を入れなければならないのが、Docker（とKubernetes）です。",
          skills: [
            {
              title: "OS",
              desc: "<u>Ubuntu Bionic</u> / Windows / CentOS + Nginx",
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
                "Wireshark（共用ネットワークで野良DHCPサーバが立ってトラブった時に使いました）",
            },
          ],
        },
        {
          groupName: "フロントエンド",
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
          groupComment: "Expressを主に触っていましたが、結局どのフレームワークもかなり似通っていると思います。ORMを使うと、DBの違いもあまり気にならない。",
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
                "bcrypt / Passport.js / <u>axios</u> / socket.io / <u>Babel</u> / <u>gulp</u> / <u>Webpack</u>",
            },
            { title: "その他", desc: "Heroku" },
          ],
        },
        {
          groupName: "データ処理",
          groupComment:
            "機械学習はMNISTの手書き文字入力や猫画像認識のチュートリアルを動かした程度です。月並みな表現ですが、AIは私が生きる時代における最重要技術だと思います。今後一番力を入れたい領域です。",
          skills: [
            { title: "", desc: "<u>Pandas</u> / <u>Numpy</u>" },
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
