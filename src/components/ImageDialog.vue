<template>
  <v-dialog v-model="isDialogOpen" max-width="1000px">
    <template v-slot:activator="{ on }">
      <span style="color: dodgerblue;"
        ><v-icon color="blue">mdi-magnify-plus-outline</v-icon
        >クリックして拡大</span
      >
      <v-img :src="thumbnail" v-on="on" width="350" class="imgBorder"></v-img>
    </template>
    <v-carousel v-if="isCarousel">
      <v-carousel-item
        v-for="(slide, i) in uri"
        :key="i"
        :src="slide.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
    </v-carousel>
    <video
      v-else-if="isMp4"
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
      if (this.isCarousel) return false;
      return this.uri.endsWith(".mp4");
    },
    isCarousel() {
      console.log("hello!!!", this.uri);
      return Array.isArray(this.uri);
    },
    thumbnail() {
      if (this.isCarousel) {
        // For slides, use the first slide as thumbnail
        return this.uri[0].src;
      } else if (this.isMp4) {
        // For MP4 movie, use the prepared image as the thumbnail
        return this.thumbnailUri;
      } else {
        // For a single image, use it as the thumbnail
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
