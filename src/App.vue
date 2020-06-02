<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <span>Azureleaf's Project</span>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items id="tb-items">
        <v-divider vertical></v-divider>
        <v-btn text to="/" class="px-5"> Projects</v-btn>
        <v-divider vertical></v-divider>
        <v-btn text to="/skill" class="px-6"> Skills</v-btn>
        <v-divider vertical></v-divider>
        <v-btn text href="https://github.com/azureleaf"
          ><v-icon>mdi-github</v-icon>GitHub</v-btn
        >
        <v-divider vertical></v-divider>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <ProjectPageTitle />
    </v-content>
  </v-app>
</template>

<script>
import ProjectPageTitle from "./components/ProjectPageTitle";

export default {
  name: "App",

  components: {
    ProjectPageTitle
  },

  data: () => ({
    //
  })
};
</script>
