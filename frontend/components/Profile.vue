<template>
  <v-menu bottom min-width="225px" rounded="25" offset-y content-class="round">
    <template #activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="secondary" size="48">
          <span class="text-h5">{{ getUserInfo.emailId.split("")[0] }}{{ getUserInfo.emailId.split("")[1] }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card style="border-radius: 25px;">
      <v-list rounded>
        <div class="mx-auto text-center">
          <v-avatar color="secondary">
            <span class="text-h5">{{ getUserInfo.emailId.split("")[0] }}{{ getUserInfo.emailId.split("")[1] }}</span>
          </v-avatar>
          <p class="text-caption mt-1">
            {{ getUserInfo.emailId }}
          </p>
          <v-divider class="my-3" />
          <v-list-item-group color="primary">
            <v-list-item link :to="$ROUTES.editTeam">
              <v-list-item-icon>
                <v-icon color="primary">
                  mdi-cog
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title />
                Edit team
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-icon>
                <v-icon color="primary">
                  mdi-logout
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title />
                Logout
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-list>
    </v-card>
  </v-menu>
</template>


<script>
import { mapMutations, mapGetters } from "vuex"
export default {
  data: () => ({
    user: {
      initials: 'JD',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
    },
    selectedItem: 1,
    }),
  computed: {
    ...mapGetters({
      getUserInfo: "layouts/getUserInfo"
    })
  },
  methods: {
    ...mapMutations({
      setIsOverlayAndLoading: "layouts/setIsOverlayAndLoading"
    }),
    /**
    * Handles user session to logout and procceds to route
    * the user for login page and
    * finally terminates the loading 
    */
    async logOut() {
      try {
        this.setIsOverlayAndLoading(true);
        await this.$fire.auth.signOut();
        this.$router.push("/login");
      }
      catch (error) {
        this.setIsOverlayAndLoading(false);
      }
      finally {
        this.setIsOverlayAndLoading(false);
      }
    }
  },
}
</script>

<style>
.round {
  border-radius: 25px;
}
</style>