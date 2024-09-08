<template>
  <v-list
    nav
    dense
    :style="[
      $vuetify.breakpoint.mdAndDown ? { marginTop: $vuetify.application.top + 'px' } : '']"
  >
    <div v-for="(nav, index) in $NAV_LIST" :key="index">
      <v-list-item link :to="nav.route">
        <v-list-item-icon>
          <v-icon color="white">
            {{ nav.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">
          {{ nav.name }}
        </v-list-item-title>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
export default {
  data: () => ({

  }),
  }
</script>