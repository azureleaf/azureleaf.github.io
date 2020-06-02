<template>
  <v-app>
    <v-app-bar app color="blue darken-4" dark dense>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        /> -->
        <v-avatar class="mr-2">
          <v-img
            src="./assets/rubber_ducky_material.png"
            max-height="200"
            max-width="200"
            transition="scale-transition"
            contain
          ></v-img>
        </v-avatar>
        <v-toolbar-title class="font-regular setFont"
          >Azureleaf's Portfolio</v-toolbar-title
        >
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items id="tb-items">
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
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");

.setFont {
  font-family: "Fredoka One", cursive !important;
}
</style>
