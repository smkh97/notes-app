export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    target: "static",
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - frontend',
        title: 'frontend',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        "@/plugins/constants.js",
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],
    router: {
        middleware: "auth",
    },
    

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        "vue2-editor/nuxt",
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: process.env.API_KEY,
                    authDomain: process.env.AUTH_DOMAIN,
                    projectId:  process.env.PROJECT_ID,
                    storageBucket:  process.env.STORAGE_BUCKET,
                    messagingSenderId: process.env.SENDER_ID,
                    appId: process.env.APP_ID,
                },
                services: {
                    auth: {
                        persistence: 'local', // default
                        initialize: {
                            onAuthStateChangedMutation: 'layouts/onAuthChanged',
                        },
                        ssr: false, // default
                    },
                    firestore:true
                },
            },
        ],
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.DOMAIN
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: '#d4d4d4',
                    accent: '#FFFFFF',
                    secondary: '#A9A9A9',
                    info: '3498DB',
                    warning: '#F39C12',
                    error: 'E74C3C',
                    success: '2ECC71',
                },
                light: {
                    primary: '#004ea8',  // Use #004ea8 as the primary color for a bold impact
                    accent: '#f5f5f5',  // Soft off-white for contrast and readability
                    secondary: '#F1F1F1',  // Light gray for supporting elements and backgrounds
                    info: '#2ecc71',  // Green for informational messages
                    warning: '#f39c12',  // Orange for warnings
                    error: '#e74c3c',  // Red for errors
                    success: '#3498db',  // Lighter blue for success messages
                    }
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
}
