<template>
  <v-app>
    <SnackBar />
    <NavBar />      
    <v-main class="pt-12" :style="{ 'background-color': $vuetify.theme.themes.light.secondary }">
      <Overlay />
      <Loading />
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Loading from '~/components/Loading.vue';
import Overlay from '~/components/Overlay.vue';
import SnackBar from '~/components/SnackBar.vue';

export default {
  name: 'Default',
  components: { Overlay, Loading, SnackBar},
  middleware: 'auth',
}

</script>
