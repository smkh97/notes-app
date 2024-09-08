<template>
  <v-progress-linear :active="getIsOverlayAndLoading" :indeterminate="true" color="red" permanent />
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
