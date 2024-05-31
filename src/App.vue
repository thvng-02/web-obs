<template>
  <v-app>
    <nav-bar />
    <v-main class="accent">
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>



<script type="text/javascript">
import NavBar from "./components/navBar.vue";

export default {
  components: {
    NavBar,
  },
  created(){
    this.$store.commit('updatePiUrl', location.origin)
  }
};
</script>
<style scoped>
  .topped {
    z-index: 3;
    border-top: 4px solid var(--v-accent-base) !important;
    background-color: var(--v-primary-base)  !important
  }
</style>