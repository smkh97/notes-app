<template>
  <div>
    <v-app-bar color="primary" :clipped-left="true" fixed app elevation="0">
      <v-app-bar-nav-icon style="z-index: 1;" color="white" @click="openCloseDrawer" />
      <h2 style="color: white; font-style: italic; z-index: 1;">
        MinebeaMitsumi
      </h2>
      <v-spacer />
      <Profile />
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mdAndDown"
      v-model="isMobile"
      :clipped="true"
      color="primary"
      app
      :width="$vuetify.breakpoint.xs ? '100vh': 'auto'"
      touchless
      style="z-index: 2;"
    >
      <v-divider />
      <SideMenu />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-else
      color="primary"
      :mini-variant.sync="mini"
      :clipped="true"
      :expand-on-hover="isDrawer"    
      app
      touchless
      style="z-index: 2;"
    >
      <v-divider />
      <SideMenu />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Profile from './Profile.vue'
import SideMenu from './SideMenu.vue'

export default {
  components: { Profile, SideMenu },
  data: () => ({
    isDrawer: true, // Boolean flag for opening and closing drawer
    mini:true, // Vuetify prop for half nav drawer 
    isMobile:false // Boolean flag for mobile detection
  }),
  methods: {
    ...mapMutations({
      setIsOverlayAndLoading: "layouts/setIsOverlayAndLoading"
    }),
    /**
    * Handles drawer closing and opening with mini side drawer
    * with state sync
    */
    openCloseDrawer() {
      if(this.$vuetify.breakpoint.mdAndDown)
      {
       this.isMobile = !this.isMobile
      }
      this.isDrawer = !this.isDrawer
      this.mini = !this.mini
    }

  },

}
</script>