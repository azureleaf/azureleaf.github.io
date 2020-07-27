<template>
  <v-dialog v-model="isDialogOpen" max-width="1000px">
    <template v-slot:activator="{ on }">
      <span style="color: dodgerblue;"
        ><v-icon color="blue">mdi-magnify-plus-outline</v-icon
        >クリックして拡大</span
      >
      <v-img :src="thumbnail" v-on="on" width="350" class="imgBorder"></v-img>
    </template>
    <v-carousel v-if="isCarousel" height="800" :continuous="false" dark>
      <v-carousel-item v-for="(slide, i) in uri" :key="i" :src="slide.src">
        <v-row class="fill-height pb-12" align="end" justify="center">
          <div
            v-if="slide.caption"
            class="headline font-weight-bold white--text pa-2"
            v-html="slide.caption"
            style="background-color: rgba(0,0,0,0.7)"
          ></div>
        </v-row>
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
      return Array.isArray(this.uri);
    },
    thumbnail() {
      if (this.isCarousel || this.isMp4) {
        // For movie / slides, use the prepared image as the thumbnail
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
