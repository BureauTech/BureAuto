<template>
  <v-app>
    <Topbar />
    <router-view />
  </v-app>
</template>

<script>

import Topbar from "./components/Topbar/Topbar.vue"

export default {
    name: "App",
    components: {
        Topbar
    }
    // computed: {
    //     showMenu: function() {
    //         return this.$route.path
    //     }
    // }
}

</script>
<style>
#app {
  background: linear-gradient(
    359.76deg,
    rgba(42, 100, 132, 0.8) 0.23%,
    rgba(196, 196, 196, 0) 99.82%
  );
}

.toasted-font {
  font-family: "Roboto", sans-serif;
}

.v-card__text, .v-card__title {
  word-break: normal !important;
}
</style>