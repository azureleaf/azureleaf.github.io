<template>
  <v-container>
    <v-app-bar app color="black" dark dense src="../assets/header.jpg">
      <div class="d-flex align-center">
        <v-avatar class="mr-2">
          <v-img
            src="../assets/rubber_ducky_material.png"
            max-height="200"
            max-width="200"
            transition="scale-transition"
            contain
          ></v-img>
        </v-avatar>
        <v-toolbar-title class="setFont">azureleaf.github.io</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-md-flex">
        <v-divider vertical></v-divider>
        <v-btn text to="/" class="px-5">Projects</v-btn>
        <v-divider vertical></v-divider>
        <v-btn text to="/skills" class="px-6">Skills</v-btn>
        <v-divider vertical></v-divider>
        <v-btn text href="https://github.com/azureleaf"
          ><v-icon class="mr-2">mdi-github</v-icon>GitHub</v-btn
        >
        <v-divider vertical></v-divider>
      </v-toolbar-items>
      <v-menu :offsetY="true">
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon
            v-on="on"
            class="d-flex d-md-none"
          ></v-app-bar-nav-icon>
        </template>
        <v-list color="grey darken-3" dark>
          <v-list-item to="/" class="px-5">
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item>
          <v-list-item to="/skills" class="px-5">
            <v-list-item-title>Skills</v-list-item-title>
          </v-list-item>
          <v-list-item href="https://github.com/azureleaf" class="px-5">
            <v-list-item-title>GitHub</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "PortfolioHeader",
  date: function() {
    return {
      isNavOpen: false
    };
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&display=swap");

.setFont {
  font-family: "Noto Serif", serif !important;
}
</style>
