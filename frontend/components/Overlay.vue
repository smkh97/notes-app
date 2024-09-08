<template>
  <v-overlay :value="getIsOverlayAndLoading" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            getIsOverlayAndLoading: "layouts/getIsOverlayAndLoading"
        })
    },
}
</script>



