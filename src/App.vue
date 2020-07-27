<template>
  <v-app>
    <PortfolioHeader />
    <v-main>
      <router-view />
    </v-main>
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
