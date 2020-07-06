<template>
  <v-dialog v-model="isDialogOpen" max-width="1000px">
    <template v-slot:activator="{ on }">
      <span style="color: dodgerblue;"
        ><v-icon color="blue">mdi-magnify-plus-outline</v-icon
        >クリックして拡大</span
      >
      <v-img :src="uri" v-on="on" width="350" class="imgBorder"></v-img>
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
