<template>
  <v-app>
    <PortfolioHeader />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import PortfolioHeader from "./components/PortfolioHeader";

export default {
  name: "App",

  components: { PortfolioHeader },

  data: () => ({
    //
  })
};
</script>

<style>
u {
  color: #cc0000;
  font-weight: bold;
}
</style>
