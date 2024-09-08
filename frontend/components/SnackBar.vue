<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="message" :timeout="snackbar.timeout" :color="snackbar.type" text>
      <v-layout>
        <v-icon v-if="snackbar.icon" left :color="snackbar.type">
          {{ snackbar.icon }}
        </v-icon>
        <div>
          <b v-if="snackbar.title">{{ snackbar.title }}</b>
          <div style="{whiteSpace: 'pre-line'}">
            {{ snackbar.message }}
          </div>
        </div>
      </v-layout>
      <template #action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="resetSnackbar(false)">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
  
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
   computed: {
    ...mapGetters({
      snackbar: "layouts/snackbar"
    }),
    message: {
      get() {
        return this.snackbar.message;
      },
      set(val) {
        this.resetSnackbar(val);
      }
    }
  },
  methods: {
    ...mapMutations({
      setSnackbar: "layouts/setSnackbar"
    }),
    /**
     * Resets the snackbar
     * @param {Boolean} val  
     */
    resetSnackbar(val) {
      if (!val) {
        this.setSnackbar({ message: null });
      }
    }
  },

};

</script>
  