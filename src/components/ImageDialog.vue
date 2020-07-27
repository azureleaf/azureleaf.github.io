<template>
  <v-dialog v-model="isDialogOpen" max-width="1000px">
    <template v-slot:activator="{ on }">
      <span style="color: dodgerblue;"
        ><v-icon color="blue">mdi-magnify-plus-outline</v-icon
        >クリックして拡大</span
      >
      <v-img :src="thumbnail" v-on="on" width="350" class="imgBorder"></v-img>
    </template>
    <video
      v-if="isMp4"
      id="demo"
      width="560"
      height="600"
      controls
      autoplay
      style="margin: 0 auto; background-color: black;"
    >
      <source :src="uri" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <v-img v-else :src="uri"></v-img>
  </v-dialog>
</template>
<script>
export default {
  props: ["uri", "thumbnailUri"],
  data: function() {
    return {
      isDialogOpen: false
    };
  },
  computed: {
    isMp4() {
      return this.uri.endsWith(".mp4");
    },
    thumbnail() {
      if (this.isMp4) {
        return this.thumbnailUri;
      } else {
        return this.uri;
      }
    }
  }
};
</script>
<style scoped>
.imgBorder {
  border: solid 4px deepskyblue;
}
</style>
