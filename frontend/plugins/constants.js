const ROUTES = {
    dsm: '/dsm',
    resetPassword: '/resetpassword',
    login: '/login',
    editTeam: '/editteam',
    retrospective: '/retrospective',
    sprintReviewPlanning: '/sprintreview-planning',
}

const NAV_LIST = [
    {
        icon: 'mdi-note-multiple-outline',
        name: 'DSM',
        route: '/dsm',
    },
    {
        icon: 'mdi-run-fast',
        name: 'Sprint Review / Planning',
        route: '/sprintreview-planning',
    },
    {
        icon: 'mdi-account-group-outline',
        name: 'Retrospective',
        route: '/retrospective',
    },
]

const DB_COLLECTIONS = {
    teams:"teams",
}

export default (context, inject) => {
    inject('ROUTES', ROUTES)
    inject('NAV_LIST', NAV_LIST)
    inject('DB_COLLECTIONS',DB_COLLECTIONS)
}
