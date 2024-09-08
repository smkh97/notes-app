<template>
  <v-app>
    <Overlay />
    <Loading />
    <SnackBar />
    <v-main>
      <v-container fluid class="ml-0 mr-auto mt-sm-16 mt-md-16 mt-lg-16 mt-xl-16 pa-0">
        <div class="d-flex justify-center align-center">
          <Nuxt />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
import Loading from '~/components/Loading.vue';
import Overlay from '~/components/Overlay.vue';
import SnackBar from '~/components/SnackBar.vue';

export default {
  name: 'Login',
  components: { Overlay, Loading, SnackBar },
}
</script>

<style>
@media only screen and (max-width: 600px) {
  .cardWidth {
    width: 100vw;
  }
}
</style>
  