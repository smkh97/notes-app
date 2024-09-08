export default () => ({
    isOverlayAndLoading: false,
    isAuthenticated: false,
    userInfo: {
        email: null,
        displayName: null,
        userId:null
    },
    snackbar: {
        title: null,
        message: null,
        type: null,
        icon: null,
        timeout: 5000,
    },
    dialog: {
        title: null,
        label:null,
        isShow:false,
        value: null,
    },
})
