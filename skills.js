var SkillTable = Vue.component("skill", {
  template: `
    <v-content>
      <v-container>
        <v-card elevation="20" class="mt-10">
          <v-card-title class="display-1 mx-4 py-8"
            >スキル</v-card-title
          >
          <v-card-subtitle class="ml-4 subtitle-1"
            >私が今までに使ったツールです。なかなか長いのでざっとご覧ください。★がついているのは、特によく使っているものです。
          </v-card-subtitle>
        </v-card>
        <v-card v-for="(group, index) in groups" elevation="10" class="my-8" >
          <v-app-bar flat class="white--text" :color="bgColors[index % 3]">
          <v-card-title class="font-weight-bold" :color="bgColors[index % 3]"
            >{{group.groupName}}</v-card-title
          >
          </v-app-bar>
          <v-card-text>
            <v-data-table
              :headers="skillHeaders"
              :items="group.skills"
              hide-default-footer
              :items-per-page="30"
            >
              <template v-slot:item.title="{item}">
                <b>{{item.title}}</b>
              </template>
              <template v-slot:item.desc="{item}">
                <p class="my-3">{{item.desc}}</p>
              </template>
              <template v-slot:item.star="{item}">
                <span v-if="item.star == '1'">★</span>
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
                "始めたのは大学入学後ですが、プログラミングは自分の性によく合っていると感じます。今後Web開発したいもののプランはいくつもありますが、そのために勉強すべきことも本当に多いと最近実感します。",
            },
            {
              title: "語学",
              desc:
                "私の趣味です。英語は口頭のコミュニケーションに問題ないレベルで、また中国語資料でも情報収集できます。プログラマは英文の資料（特にStackOverflow）がとても多いので、趣味と実益双方を兼ねています。",
            },
            {
              title: "性格",
              desc:
                "抽象的な話ですが、ひとつの物事に没頭して作業を続けられる性格です。これは多くのプログラマに共通するでしょうか。ただし何事もやりすぎは逆効果ですので、他人とのコミュニケーションを通じてこの性格を上手く制御し活かすべきものだと思います。「陽キャじゃないけど説明力はとても高い」が私に対するある人の評。",
            },
            {
              title: "健康",
              desc:
                "仙台周辺の町やら山やら毎日歩いており、体力はある方です。生活の中で運動や気分転換の習慣があることは精神衛生上も役立っています。一日１万から２万歩程度が多いですが、最大で一日45km（秋保温泉まで往復）歩きました。お気に入りの行先は愛子の蕃山。",
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
              title: "JavaScript / TypeScript",
              desc:
                "Promiseとasync/awaitの理解が独学の中での一つの関門でした。TypeScriptはあまり使い込んでいませんが、今後JSから完全移行したい。",
              star: "1",
            },
            {
              title: "Python",
              desc: "一番使っているのはJSですが、一番好きなのはPython。",
              star: "1",
            },
            {
              title: "PHP",
              desc:
                "時間が経っても、PHPの変数名に「＄」をつけるのに未だに慣れない。",
            },
            {
              title: "C / C++",
              desc:
                "Cは制御関係で、C++はOpenCVを使う際に使いました。とにかく速いので、最近は巨大CSVの編集などに使います。",
            },
            {
              title: "Java",
              desc:
                "ImageJという画像処理ソフトのプラグインを改良するのに使いました。",
            },
          ],
        },
        {
          groupName: "開発ツール",
          skills: [
            {
              title: "Ubuntu (18.04)",
              desc:
                "現在のメインOS。これでAdobe製品とMS Officeが使えたら最強なんですが...",
              star: "1",
            },
            {
              title: "Windows",
              desc:
                "Windowsの強制アップデート、謎のCPU使用率100%、メモリ浪費には疲れ果てました。",
            },
            {
              title: "CentOS + Nginx",
              desc: "研究室のウェブサイト運用で使用。",
            },
            {
              title: "WordPress",
              desc: "学生団体のサイトを管理していた時に使用。",
            },
            {
              title: "Visual Studio Code",
              desc: "",
              star: "1",
            },
            {
              title: "Visual Studio",
              desc: "",
            },
            { title: "Vim", desc: "" },
            {
              title: "IntelliJ IDEA",
              desc: "EclipseのUIが嫌いだったので。",
            },
            {
              title: "GitHub / BitBucket / GitLab",
              desc: "GitLabでは他のプログラミング勉強仲間と協業しました。",
              star: "1",
            },
            { title: "Trello", desc: "" },
            {
              title: "Slack / Chatwork / LINE",
              desc: "LINEはボットを作りました。",
              star: "1",
            },
            {
              title: "Docker",
              desc:
                "他の人のパソコンを使ってコーディングしていた頃に、お借りした環境を汚さないために使っていました。DockerとKubernetesは今の所そこまで勉強できていませんが、今後かなり本格的に勉強したいです。",
            },
            { title: "VirtualBox + Vagrant", desc: "" },
            {
              title: "Wireshark",
              desc:
                "共用ネットワークで野良DHCPサーバが立ってトラブった時に使いました。",
            },
          ],
        },

        {
          groupName: "コード品質",
          skills: [
            { title: "Prettier", desc: "", star: "1" },
            { title: "ESLint / TSLint", desc: "", star: "1" },
            { title: "Vetur", desc: "" },
            { title: "Cypress", desc: "Integration test" },
            { title: "Jest", desc: "Unit test" },
            { title: "Postman", desc: "API test" },
            { title: "Php cs fixer", desc: "" },
            { title: "PHP Intelephense", desc: "" },
            { title: "pipenv / virtualenv", desc: "Pythonの仮想環境" },
          ],
        },
        {
          groupName: "フロントエンド",
          skills: [
            {
              title: "Vue.js",
              desc: "初心者にとってやさしすぎる",
              star: "1",
            },
            { title: "Vue-Router", desc: "" },
            { title: "Vuex", desc: "" },
            {
              title: "Vuetify",
              desc:
                "このポートフォリオサイト自体もVuetifyでできています。マテリアルデザインはきれい。",
            },
            {
              title: "React",
              desc:
                "個人的にはVue.jsの方が好きなのですが、React Nativeの魅力はかなり大きい。",
            },
            { title: "Stylus", desc: "" },
            { title: "Pug", desc: "" },
            { title: "Axios", desc: "" },
            { title: "socket.io", desc: "" },
          ],
        },
        {
          groupName: "バックエンド",
          skills: [
            { title: "Node.js", desc: "", star: "1" },
            { title: "Express.js", desc: "", star: "1" },
            { title: "Bcrypt", desc: "ハッシュ関数" },
            { title: "Passport.js", desc: "ログイン処理" },
            { title: "Laravel", desc: "" },
            { title: "Flask", desc: "" },
            { title: "TypeORM", desc: "" },
            { title: "Sequelize ORM", desc: "" },
            { title: "Eloquent ORM", desc: "" },
            { title: "Heroku", desc: "" },
          ],
        },
        {
          groupName: "DB",
          skills: [
            { title: "SQLite", desc: "" },
            { title: "MySQL", desc: "" },
            { title: "PostgreSQL", desc: "" },
            { title: "MongoDB", desc: "" },
            { title: "Firebase", desc: "" },
          ],
        },
        {
          groupName: "データ処理",
          skills: [
            { title: "Pandas / Numpy", desc: "" },
            { title: "Scikit-learn", desc: "" },
            {
              title: "Tensorflow / PyTorch",
              desc:
                "MNISTの手書き文字入力や猫画像認識のチュートリアルを動かしました。月並みな表現ですが、AIは私が生きる時代における最重要技術だと思います。今後一番力を入れたい。",
            },
            { title: "BeautifulSoup", desc: "HTMLファイルの解析" },
            { title: "Selenium", desc: "ブラウザ操作の自動化" },
          ],
        },
        {
          groupName: "可視化",
          skills: [
            {
              title: "Chart.js",
              desc: "図表描画。シンプルで軽い。",
            },
            { title: "Three.js", desc: "3DCGライブラリ。" },
            { title: "Matplotlib", desc: "" },
            { title: "Leaflet.js", desc: "" },
          ],
        },
      ],
      skillHeaders: [
        {
          text: "",
          sortable: false,
          value: "star",
          width: "10",
        },
        {
          text: "Title",
          sortable: false,
          value: "title",
          width: "25%",
        },
        {
          text: "Comment",
          sortable: false,
          value: "desc",
        },
      ],
      bgColors: ["red darken-4", "green darken-4", "blue darken-4"],
    };
  },
});
