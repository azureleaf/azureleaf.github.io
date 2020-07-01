<template>
  <v-dialog v-model="isDialogOpen" max-width="800px">
    <template v-slot:activator="{ on }">
      <span style="color: deepskyblue;">クリックして拡大</span>
      <v-img :src="uri" v-on="on" width="300" class="imgBorder"></v-img>
    </template>
    <v-img :src="uri"></v-img>
  </v-dialog>
</template>
<script>
export default {
  props: ["uri"],
  data: function() {
    return {
      isDialogOpen: false
    };
  }
};
</script>
<style scoped>
.imgBorder {
  border: solid 4px deepskyblue;
}
</style>
