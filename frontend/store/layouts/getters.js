export default {
    getIsOverlayAndLoading(state) {
        return state.isOverlayAndLoading
    },
    getIsAuthenticated(state) {
        return state.isAuthenticated
    },
    getUserInfo(state) {
        return state.userInfo
    },
    snackbar: (state) => {
        return state.snackbar
    },
    getDialog: (state) => {
        return state.dialog
    },
}
