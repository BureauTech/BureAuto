<template>
  <v-app>
    <Topbar v-if="showMenu" />
    <router-view />
  </v-app>
</template>

<script>

import Topbar from "./components/Topbar/Topbar.vue"

export default {
    name: "App",
    components: {
        Topbar
    },
    computed: {
        showMenu: function() {
            return this.$route.path
        }
    }
}

</script>
<style>
#app {
  background: linear-gradient(
    359.76deg,
    #2a6484 0.23%,
    rgba(196, 196, 196, 0) 99.82%
  );
  opacity: 0.8;
}

.toasted-font {
  font-family: "Roboto", sans-serif;
}
</style>