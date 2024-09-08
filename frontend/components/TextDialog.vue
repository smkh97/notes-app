<template>
  <div class="text-center">
    <v-dialog v-model="isShow" width="auto" content-class="round">
      <v-card class="pa-2" style="border-radius: 25px;">
        <v-card-title class="text-h6 lighten-2">
          {{ details.title }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="textValue" color="primary" :label="details.label" outlined rounded />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text rounded @click="cancelDialog()">
            Close
          </v-btn>
          <v-btn color="primary" text rounded @click="setValue()">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    indexs: {
      type: Object,
      default: null
    },
    details: {
      type: Object,
      default: null
    },

  },
  data() {
    return {
      textValue: null,
      isShow: true,
    }
  },
  /**
   * Intialize dialog and display the value passed to it 
   */
  methods: {
    setValue() {
      this.setDialogValue(this.textValue)
    },

  }
}
</script>

<style>
.round {
  border-radius: 25px;
}
</style>