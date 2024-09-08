<template>
  <v-card class="text-center pr-9 pl-9 pd-9 cardSize" style="border-radius: 25px;" outlined>
    <h1 style="color: #003b90; font-style: italic" class="pt-9">
      MinebeaMitsumi
    </h1>
    <v-text-field
      id="#email"
      v-model="emailId"
      outlined
      label="Email Id"
      :error="isError"
      class="pt-4"
    />
    <v-text-field
      id="#password"
      v-model="password"
      outlined
      :error="isError"
      :error-messages="errorMessages"
      label="Password"
      :append-icon="isPasswordVisible ? 'mdi-eye-off-outline ' : ' mdi-eye-outline'"
      :type="isPasswordVisible ? 'text' : 'password'"
      @click:append="changeIcon"
    />
    <v-btn id="#login-button" color="primary" block @click="signInUser">
      LOGIN
    </v-btn>
    <div class="d-flex justify-center align-center">
      <v-breadcrumbs id="#forgot-password" class="text-center" :items="items" small />
    </div>
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  layout: 'login',
  data() {
    return {
      isPasswordVisible: false,
      errorMessages: '',
      isDisableLoginButton: true,
      emailId: null,
      password: null,
      isError: false,
      items: [
        {
          text: 'Forgot password?',
          disabled: false,
          to: '/resetpassword',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      getUserInfo: "layouts/getUserInfo"
    })
  },
  watch: {
    emailId(newData) {
      if (newData) {
        this.isError = false
        this.errorMessages = ""
      }
    },
    password(newData) {
      if (newData) {
        this.isError = false
        this.errorMessages = ""
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsOverlayAndLoading: 'layouts/setIsOverlayAndLoading',
    }),
    async signInUser() {
      try {
        this.setIsOverlayAndLoading(true)
        await this.$fire.auth.signInWithEmailAndPassword(
          this.emailId,
          this.password
        ).then((userCredential) => {
          // Signed in 
          if (userCredential) {
            this.$router.push(this.$ROUTES.dsm)
          }
        })

      } catch (error) {
        // Extract the message from the error object
        const errorMessage = error.message.split(":")[1];
        this.isError = true
        this.errorMessages = errorMessage
      } finally {
        this.setIsOverlayAndLoading(false)
      }
    }, changeIcon() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
  },
}
</script>

<style>
@media only screen and (max-width: 599px) {
  .cardSize {
    width: 100vw;
    border-width: 0px !important;
  }
}

@media only screen and (min-width: 600px) {
  .cardSize {
    width: 375px;
  }
}
</style>
