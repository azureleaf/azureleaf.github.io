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
                "格闘しながら細部を少しずつ少しずつ積み上げていく作業が自分の性分にとても合っていると感じます。今後作りたいもののプランはいくつもありますが、勉強すべきことの膨大さを毎日痛感させられています。"
            },
            {
              title: "外国語学習",
              desc:
                "語学は私の一番好きな趣味なのですが、プログラミングはドキュメントもStackOverflowも英文だらけなので趣味と実益を兼ねています。英語の日常会話には問題なく、中国語でも情報収集できます。"
            },
            {
              title: "性格",
              desc:
                "ひとつの対象にのめりこみやすい性格です。ただ何事もやりすぎては意味がありませんので、他人との関わりの中でこの性格を上手く制御し活かすべきものだと思います。"
            },
            {
              title: "コミュニケーション",
              desc:
                "世間にいるコミュ力がずば抜けた人々には及ぶべくもありませんが、私から声をかけて仲間内で定期的にプログラミング勉強の進捗報告会をしたり、仙台のIT勉強会にあちこち首を突っ込む程度の活動力はあります。説明が丁寧で上手いと評価されることも。"
            },
            {
              title: "体力",
              desc:
                "仙台周辺の町や山を毎日歩いており、タフな方だと思います。散歩の習慣は私の精神衛生上かなり役立っています。現時点での一日の最長歩行記録は、柴田町船岡までの往復60km。"
            },
            {
              title: "犬派",
              desc:
                "犬好きです。一番飼いたいのは「甲斐犬」という、精悍な外観と運動量、忠実さがすばらしい日本の伝統犬種です。"
            }
          ]
        },
        {
          groupName: "言語",
          skills: [
            {
              title: "<u>JavaScript</u> / TypeScript",
              desc:
                "作るプログラムがある程度長くなってくると、クラスやオブジェクトの型も複雑になりコードが書きにくくなることを実感します。今後はTSを積極的に使いたい。"
            },
            {
              title: "<u>Python</u>",
              desc:
                "一番好きな言語です。言語自体も簡潔ですし、なによりライブラリが圧倒的に豊富。"
            },
            {
              title: "PHP",
              desc:
                "Laravelはオールインワンで、よいフレームワークだと思います。"
            },
            {
              title: "C / C++",
              desc:
                "大学で制御プログラムやOpenCVを使う際に使いました。最近も速度が必要な場面で使います。が、この言語はあまりにも覚えるべき内容が多いので、Rustなど現代的な言語を使うべきだと強く思います。"
            },
            {
              title: "Java",
              desc: "大学でImageJという画像処理ソフトを改良するのに使いました。"
            }
          ]
        },
        {
          groupName: "開発ツール",
          skills: [
            {
              title: "OS",
              desc:
                "<u>Ubuntu Bionic</u> / Windows / CentOS + Nginx（大学研究室のサーバ運用）"
            },
            {
              title: "Editor",
              desc: "<u>Visual Studio Code</u> / Vim / Visual Studio / PyCharm"
            },
            {
              title: "環境管理",
              desc:
                "<u>GitHub</u> / <u>GitLab</u> / BitBucket / Docker / VirtualBox + Vagrant / <u>pipenv</u> / virtualenv"
            },
            {
              title: "Coding Format",
              desc:
                "<u>Prettier</u> / <u>Vetur</u> / <u>ESLint</u> / TSLint / <u>Autopep8</u> / <u>Flake8</u> / php cs fixer / PHP Intelephense"
            },
            { title: "テスト系", desc: "Cypress / Jest / Postman" },
            {
              title: "その他",
              desc:
                "Wireshark（野良DHCPサーバを退治した時に使用） / WordPress / <u>Slack</u> / Trello"
            }
          ]
        },
        {
          groupName: "ライブラリ",
          groupComment:
            "Vue.jsが好きです。機械学習は現時点ではMNISTの手書き文字入力や猫の画像分類のチュートリアルを動かした程度なのですが、AIは私が生きる世代の最重要技術だと思います。今後一番力を入れたい領域です。",
          skills: [
            {
              title: "Web",
              desc:
                "<u>Vue.js</u> / <u>Vue-Router</u> / <u>Vuex</u> / <u>Vuetify</u> / React"
            },
            { title: "HTML / CSS", desc: "Pug / Stylus / Bootstrap" },
            {
              title: "Backend",
              desc:
                "<u>Laravel</u> / <u>Express.js</u> / Flask / <u>axios</u> / bcrypt / socket.io / Webpack"
            },
            {
              title: "ORM",
              desc: "<u>Eloquent</u> / Sequelize / TypeORM / SQLAlchemy"
            },
            {
              title: "DB",
              desc: "SQLite / MySQL / PostgreSQL / MongoDB / Firebase"
            },
            {
              title: "Web API等",
              desc: "AWS EC2 / Heroku / LINE API / OpenWeather API"
            },
            {
              title: "機械学習系",
              desc: "Scikit-learn / Tensorflow / PyTorch"
            },
            {
              title: "ウェブスクレイピング",
              desc:
                "<u>BeautifulSoup</u> / Selenium / <u>Pandas</u> / <u>Numpy</u>"
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
      bgColors: ["pink darken-4", "green darken-4", "blue darken-4"]
    };
  }
};
</script>
