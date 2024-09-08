export default {
    setIsOverlayAndLoading(state, isOverlayAndLoading) {
        state.isOverlayAndLoading = isOverlayAndLoading
    },
    onAuthChanged: (state, { authUser, claims }) => {
        if (!authUser) {
            state.isAuthenticated = false
        } else {
            state.userInfo.emailId = authUser.email
            state.userInfo.userId = authUser.uid
            state.isAuthenticated = true
        }
    },
    setSnackbar(state, snackbar) {
        state.snackbar.title = snackbar.title
        state.snackbar.message = snackbar.message
        state.snackbar.type = snackbar.type || state.snackbar.type
        state.snackbar.icon = snackbar.icon || state.snackbar.icon
        state.snackbar.timeout = snackbar.timeout || state.snackbar.timeout
        state.snackbar.layout = snackbar.layout
    },
    setDialog(state, dialog) {
        state.dialog.title = dialog.title
        state.dialog.label = dialog.label
        state.dialog.isShow = true
    },
    setDialogValue(state, dialogValue) {
        state.dialog.value = dialogValue
        state.dialog.title = null
        state.dialog.label = null
        state.dialog.isShow = false
    },
}
