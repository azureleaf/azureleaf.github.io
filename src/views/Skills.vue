<template>
  <v-container>
    <v-card elevation="20">
      <v-card-title class="headline font-weight-bold pb-8">スキル</v-card-title>
      <v-card-subtitle class="subtitle-1"
        >私が今までに使ったツールです。下線を引いたのは特に頻繁に使っているものです。
      </v-card-subtitle>
    </v-card>
    <v-card
      v-for="(group, index) in groups"
      :key="index"
      elevation="10"
      class="my-8"
    >
      <v-app-bar
        flat
        class="white--text font-weight-bold"
        :color="bgColors[index % 3]"
      >
        <v-toolbar-title>
          {{ group.groupName }}
        </v-toolbar-title>
      </v-app-bar>
      <v-card-subtitle>
        {{ group.groupComment }}
      </v-card-subtitle>
      <v-card-text>
        <v-data-table
          :headers="skillHeaders"
          :items="group.skills"
          hide-default-footer
          :items-per-page="30"
        >
          <template v-slot:item.title="{ item }">
            <b v-html="item.title"></b>
          </template>
          <template v-slot:item.desc="{ item }">
            <p class="my-3" v-html="item.desc"></p>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Skills",
  data: function() {
    return {
      groups: [
        {
          groupName: "私について",
          skills: [
            {
              title: "プログラミング",
              desc:
                "自分の性分にとても合っていると感じます。今後作りたいものはいくつもありますが、勉強すべきことの膨大さを毎日痛感させられます。"
            },
            {
              title: "外国語学習",
              desc:
                "語学は私の趣味ですが、プログラマの世界はStackOverflowをはじめ英文だらけなので実益も兼ねています。英語の日常会話には問題なく、中国語の資料でも情報収集できます。"
            },
            {
              title: "性格",
              desc:
                "ひとつのことに没頭して作業し続ける性格です。ただ何事もやりすぎては意味がありませんので、他人との関わりの中でこの性格を上手く制御し活かすべきものだと思います。"
            },
            {
              title: "コミュニケーション能力",
              desc:
                "世間にいるコミュ力がずば抜けた人々には及ぶべくもありませんが、私から声をかけて仲間内で定期的にプログラミングの進捗報告をしたり、仙台のIT勉強会にあちこち首を突っ込む程度には活動力はあります。説明が丁寧で上手いといわれることも。"
            },
            {
              title: "体力",
              desc:
                "仙台周辺の町や山を毎日歩いており、タフな方だと思います。散歩の習慣は私の精神衛生上かなり役立ちます。現時点での一日の最長歩行記録は、柴田町船岡までの往復60km。"
            },
            {
              title: "犬派",
              desc:
                "スキルと無関係な話ですが私は犬がとても好きで、今飼いたい犬種は和犬なら甲斐犬、洋犬ならボーダーコリー。"
            }
          ]
        },
        {
          groupName: "言語",
          groupComment: "流行に乗ってRustとGoを勉強したい。",
          skills: [
            {
              title: "<u>JavaScript</u> / TypeScript",
              desc: "今後TSに移行しようと思います。"
            },
            {
              title: "<u>Python</u>",
              desc: "一番使っているのはJSですが、一番好きなのはPython。"
            },
            {
              title: "PHP",
              desc:
                "Laravelはよくまとまっており、良いフレームワークだと思います。"
            },
            {
              title: "C / C++",
              desc:
                "大学でCは制御プログラムで、C++はOpenCVを使う際に使いました。最近も巨大ファイルの処理など速度が必要な時使います。"
            },
            {
              title: "Java",
              desc:
                "研究室でImageJという画像処理ソフトのプラグインを改良するのに使いました。"
            }
          ]
        },
        {
          groupName: "開発ツール",
          groupComment: "今後はKubernetesを使いこなせるようになりたい。",
          skills: [
            {
              title: "OS",
              desc:
                "<u>Ubuntu Bionic</u> / Windows / CentOS + Nginx（大学研究室のサーバ運用）"
            },
            {
              title: "Editor",
              desc:
                "<u>Visual Studio Code</u> / Vim / Visual Studio / PyCharm / IntelliJ IDEA"
            },
            {
              title: "Git",
              desc: "<u>GitHub</u> / <u>GitLab</u> / BitBucket"
            },
            {
              title: "コミュニケーション",
              desc: "<u>Slack</u> / Chatwork / Trello"
            },
            {
              title: "仮想環境系",
              desc: "Docker / VirtualBox + Vagrant / <u>pipenv</u> / virtualenv"
            },
            {
              title: "コードフォーマット（VS Code）",
              desc:
                "<u>Prettier</u> / <u>Vetur</u> / <u>ESLint</u> / TSLint / <u>Autopep8</u> / <u>Flake8</u> / php cs fixer / PHP Intelephense"
            },
            { title: "テスト系", desc: "Cypress / Jest / Postman" },
            {
              title: "その他",
              desc: "Wireshark（野良DHCPサーバを退治した時に使用） / WordPress"
            }
          ]
        },
        {
          groupName: "フロントエンド",
          groupComment: "Vue.jsが好きです。",
          skills: [
            {
              title: "Vue",
              desc:
                "<u>Vue.js</u> / <u>Vue-Router</u> / <u>Vuex</u> / <u>Vuetify</u>"
            },
            { title: "React", desc: "React" },
            { title: "HTML / CSS", desc: "Pug / Stylus / Bootstrap" }
          ]
        },

        {
          groupName: "バックエンド",
          groupComment:
            "WebフレームワークやORMにいくつか触りましたが、基本思想にはあまり違いがない気がします。",
          skills: [
            {
              title: "Webフレームワーク",
              desc: "<u>Express.js</u> / Flask / Laravel"
            },
            {
              title: "ORM",
              desc: "<u>TypeORM</u> / Sequelize / Eloquent / SQLAlchemy"
            },
            {
              title: "DB",
              desc: "SQLite / MySQL / PostgreSQL / MongoDB / Firebase / Redis"
            },
            {
              title: "Node.js",
              desc:
                "<u>axios</u> / bcrypt / Passport.js / socket.io / Babel / gulp / Webpack"
            },
            {
              title: "クラウド関係",
              desc:
                "AWS EC2 / AWS CloudWatch / Fluentd / Elastic Search / Kibana / Heroku"
            },
            {
              title: "その他",
              desc: "LINE API / OpenWeather API"
            }
          ]
        },
        {
          groupName: "データ処理",
          groupComment:
            "機械学習はMNISTの手書き文字入力や猫の画像分類のチュートリアルを動かした程度なのですが、AIは私が生きる世代の最重要技術だと思います。今後一番力を入れたい領域です。",
          skills: [
            { title: "行列処理", desc: "<u>Pandas</u> / <u>Numpy</u>" },
            {
              title: "機械学習系",
              desc: "Scikit-learn / Tensorflow / PyTorch"
            },
            {
              title: "ウェブスクレイピング",
              desc: "<u>BeautifulSoup</u> / Selenium"
            },
            {
              title: "可視化",
              desc: "<u>Chart.js</u> / Three.js / Matplotlib / Leaflet.js"
            }
          ]
        }
      ],
      skillHeaders: [
        {
          text: "Name",
          sortable: false,
          value: "title",
          width: "20%"
        },
        {
          text: "Content",
          sortable: false,
          value: "desc"
        }
      ],
      bgColors: ["red darken-4", "green darken-4", "blue darken-4"]
    };
  }
};
</script>
