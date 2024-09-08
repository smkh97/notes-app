<template>
  <v-card style="border-radius: 25px;" class="pa-4">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="2"
        xl="2"
      >
        <v-btn
          block
          color="primary"
          x-large
          height="200px"
          style="border-radius: 25px;"
          @click="routeToEditor"
        >
          <v-icon x-large>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        v-for="(cards, index) in teams"
        :key="index"       
        cols="12"
        sm="6"
        md="3"
        lg="2"
        xl="2"
      >
        <v-card height="200px" ripple x-large style="border-radius: 25px; cursor: pointer;">
          <v-card-title primary-title class="justify-center">
            {{ cards.template_name }}
          </v-card-title>
          <v-card-actions class="justify-center">
            <div class="grey--text text-caption text-center">
              <span>Last updated</span> 
              <br>
              <span>
                {{ cards.last_created }}
              </span>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    teams: [
      {
        template_name: "DSM",
        last_created: new Date().toLocaleString(),
        template_id: "unique number",
        href:"/registered-template"

      },
      {
        template_name: "DSM",
        last_created: new Date().toLocaleString(),
        template_id: "unique number",
        href:"/registered-template"

      }, {
        template_name: "DSM",
        last_created: new Date().toLocaleString(),
        template_id: "unique number",
        href:"/registered-template"

      },],
  }),
  methods:{
    routeToEditor()
    {
      this.$router.push("/neweditor")
    }
  }

}

</script>