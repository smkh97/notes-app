export default function ({ store, redirect, $ROUTES, route, $fire }) {
    // Check if the user is not authenticated and not already on the login page
    if (
        !$fire.auth.currentUser &&
        (route.path !== $ROUTES.login) &&
        (route.path !== $ROUTES.resetPassword)
    ) {
        return redirect($ROUTES.login)
    }
    if (route.path === '/' && $fire.auth.currentUser) {
        return redirect($ROUTES.dsm)
    }
    if (route.path === $ROUTES.login && $fire.auth.currentUser) {
        return redirect($ROUTES.dsm)
    }
    if (route.path === $ROUTES.resetPassword && $fire.auth.currentUser) {
        return redirect($ROUTES.dsm)
    }
}
