<template>
  <v-card class="text-center pr-9 pl-9 pd-9 cardSize" outlined>
    <h1 style="color: #003b90; font-style: italic" class="pt-9">
      MinebeaMitsumi
    </h1>
    <v-text-field
      id="#email"
      v-model="emailId"
      outlined
      label="Email Id"
      :error-messages="errorMessages"
      :error="isError"
      class="pt-4"
    />
    <v-btn id="#login-button" color="primary" block @click="resetPassword">
      RESET PASSWORD
    </v-btn>
    <div class="d-flex justify-center align-center">
      <v-breadcrumbs id="#forgot-password" class="text-center" :items="items" small />
    </div>
  </v-card>
</template>
  
<script>
import { mapMutations } from 'vuex'
export default {
  layout: 'login',
  data() {
    return {
      isPasswordVisible: false,
      errorMessages: '',
      isDisableLoginButton: true,
      emailId: null,
      isError: false,
      items: [
        {
          text: 'Go back to login',
          disabled: false,
          to: '/login',
        },
      ],
    }
  },

  watch: {
    emailId(newData) {
      if (newData) {
        this.isError = false
        this.errorMessages = ""
      }
    },
  },

  methods: {
    ...mapMutations({
      setIsOverlayAndLoading: 'layouts/setIsOverlayAndLoading',
      setSnackbar: "layouts/setSnackbar"
    }),
    async resetPassword() {
      try {
        this.setIsOverlayAndLoading(true)
        await this.$fire.auth.sendPasswordResetEmail(
          this.emailId,
        )
        this.setIsOverlayAndLoading(false)
        this.setSnackbar({ message: "Password reset email has been sent . Please reset using that link", type: "success" });
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
    width: 350px;
  }
}
</style>
  