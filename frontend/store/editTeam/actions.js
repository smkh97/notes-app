export default {
    async setUserEditedTeams({commit}, user) {
        const response = this.$fire.firestore
            .collection(this.$DB_COLLECTIONS.teams)
            .doc(user.userId)
        const docSnap = await response.get()  
        if (docSnap.exists) {
            const mergedData = docSnap.data()
            return mergedData.teams
        }
        return response
    },
    async updateUserTeam({ commit }, payload) {
        const response = await this.$fire.firestore
            .collection(this.$DB_COLLECTIONS.teams)
            .doc(payload.userId)
            .set(payload, { merge: true })
        return response
    },
    async deleteTeamsAndMembers({commit},payload)
    {
        const response = await this.$fire.firestore
        .collection(this.$DB_COLLECTIONS.teams)
        .doc(payload.userId)
        .update(payload, { merge: true })
        return response
    }
}
