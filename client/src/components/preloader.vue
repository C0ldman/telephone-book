<template>
  <v-overlay v-if="this.show" class="preloader">
    <v-progress-circular class="preloader-circle" :indeterminate="true" :rotate="20" :size="100"
                         :width="10" color="#03a9f4"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'preloader',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.preloader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.preloader-circle {
  margin: auto;
}
</style>
