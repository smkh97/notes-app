<template>
  <v-card class="pa-0" style="border-radius: 25px">
    <v-toolbar class="elevation-0">
      <v-toolbar-title>Edit Team</v-toolbar-title>
      <v-spacer />
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" @click="addTeams" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add Teams</span>
      </v-tooltip>
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="editMode">
            <v-icon>
              {{ isEdit ? 'mdi-pencil' : 'mdi-pencil-off' }}
            </v-icon>
          </v-btn>
        </template>
        <span>Edit Teams</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col
          v-for="(team, indexs) in teams"
          :key="indexs"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
        >
          <v-card outlined style="border-radius: 25px" class="mt-3">
            <v-toolbar class="elevation-0">
              <v-toolbar-title v-if="team.isEdit">
                <v-text-field
                  v-model="team.name"
                  class="mt-7"
                  label="Enter team name"
                  append-icon="mdi-content-save"
                  @click:append="checkIsNoTeamName(indexs)"
                />
              </v-toolbar-title>
              <v-toolbar-title v-else-if="isEdit">
                {{ team.name }}
                <v-btn icon @click="team.isEdit = true">
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
              </v-toolbar-title>
              <v-toolbar-title v-else>
                {{ team.name }}
              </v-toolbar-title>
              <v-spacer />
              <v-tooltip v-if="isEdit" top>
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="deleteTeam(indexs)">
                    <v-icon>
                      mdi-trash-can
                    </v-icon>
                  </v-btn>
                </template>
                <span>Delete team</span>
              </v-tooltip>
              <v-tooltip v-else top>
                <template #activator="{ on, attrs }">
                  <v-btn v-bind="attrs" icon v-on="on" @click="addMembers(indexs)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add members</span>
              </v-tooltip>
            </v-toolbar>
            <v-divider />
            <v-card-text class="pr-0 pt-0 pl-0">
              <v-simple-table height="300" class="borderColor">
                <template #default>
                  <tbody>
                    <tr
                      v-for="(
                        item, index
                      ) in team.members"
                      :key="index.toString()"
                    >
                      <td>
                        <span v-if="item.isMemberEdit">
                          <v-text-field
                            v-model="item.nickName"
                            label="Enter member name"
                            append-icon="mdi-content-save"
                            @click:append="checkIsNoName(indexs, index)"
                          />
                        </span>
                        <span v-else-if="isEdit">
                          {{ item.nickName }}
                          <v-btn icon small @click="item.isMemberEdit = true">
                            <v-icon>
                              mdi-pencil
                            </v-icon>
                          </v-btn>
                        </span>
                        <span v-else>
                          {{ item.nickName }}
                        </span>
                      </td>
                      <td class="text-right">
                        <v-btn v-if="isEdit" icon medium @click="deleteMembers(indexs, index)">
                          <v-icon>
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-toolbar class="elevation-0" />
  </v-card>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

const MAXIMUM_TEAM_LENGTH = 11; // Team length allowed for max db write for a single user

export default {

  data: () => ({
    isEdit: false, // Boolean flag to enable or disable editing mode
    isTeamTitle: false, // Boolean flag to check if empty title is present
    teamTitle: '', // Text field to set team title 
    teams: [], // Array of teams list
  }),
  computed: {
    ...mapGetters({
      getUserInfo: "layouts/getUserInfo",
      getUserTeams: "editTeam/getUserTeams"
    })
  },
  mounted() {
    // Init the teams for the user from backend db
    this.getTeam()
  },
  methods: {
    ...mapActions({
      updateUserTeam: "editTeam/updateUserTeam",
      setUserEditedTeams: "editTeam/setUserEditedTeams",
      deleteTeamsAndMembers: "editTeam/deleteTeamsAndMembers"
    }),
    ...mapMutations({
      setIsOverlayAndLoading: 'layouts/setIsOverlayAndLoading',
      setSnackbar: 'layouts/setSnackbar',
      setDialog: 'layouts/setDialog',
    }),
    /**
     * Evaluates if maximum team length is met ,
     * if not update the state , else log the snackbar
     */
    addTeams() {
      if (this.teams.length < MAXIMUM_TEAM_LENGTH) {
        this.teams.push({
          name: '',
          members: [],
          isEdit: true,
        })
      } else {
        this.setSnackbar({
          message: 'Max number of teams Reached',
          type: 'error',
        })
      }
    },
    /**
     * Takes in number and pushes the new data value for user management
    * @param {Number} index takes in the index at which the point of member should be created
    */
    addMembers(index) {
      this.teams[index].members.push({
        nickName: '',
        isMemberEdit: true,
      })
    },
    /**
     *  Boolean flag to enable disable edit mode
     */
    editMode() {
      this.isEdit = !this.isEdit
    },
    /**
     * Deletes the local index from the teams array state and calls actions to 
     * delete the team from the db , if its not isAutoDelete
     * @param {Number} index takes in the index at which the point of team should be created
     * @param {Boolean} isAutoDelete splice the local team and does not update an empty team to the db
     */
    deleteTeam(index, isAutoDelete) {
      if (isAutoDelete) {
        this.teams.splice(index, 1)
      }
      else {
        this.teams.splice(index, 1)
        this.deleteEditedTeams()
      }
    },
     /**
      * Deletes single memebers from the team and updates the team array 
      * delete the team member from the db , if its not isAutoDelete
      * @param {Number} index takes in the index at which the point of member should be deleted
      * @param {Number} subIndex takes in the index at which the point of member should be created
      * @param {Boolean} isAutoDelete splice the local team and does not update an empty team to the db
      */
    deleteMembers(index, subIndex, isAutoDelete) {
      if (isAutoDelete) {
        this.teams[index].members.splice(subIndex, 1)
      }
      else {
        this.teams[index].members.splice(subIndex, 1)
        this.deleteEditedTeams()
      }

    },
     /**
      * calls api and deletes the edited team
      */
    async deleteEditedTeams() {
      try {
        this.setIsOverlayAndLoading(true)
        const payload = {
          userId: this.getUserInfo.userId,
          teams: this.teams
        }
        await this.deleteTeamsAndMembers(payload)
        this.setSnackbar({
          message: 'Your changes are saved successfully',
          type: 'success',
        })
      }
      catch (error) {
        this.setSnackbar({
          message: error,
          type: 'error',
        })
      }
      finally {
        this.setIsOverlayAndLoading(false)
      }
    },
     /**
      * checks if user has entered a null name on edit mode
      * @param {Number} indexs parent index of the loop
      * @param {index} index child member index of the loop
      */
    checkIsNoName(indexs, index) {
      if (this.teams[indexs].members[index].nickName === '') {
        this.deleteMembers(indexs, index, true)
        this.setSnackbar({
          message:
            'Members with no name will be deleted automatically',
          type: 'error',
        })
      } else {
        this.teams[indexs].members[index].isMemberEdit = false
        this.updateEditedTeams()
      }
    },
    checkIsNoTeamName(indexs) {
      if (this.teams[indexs].name === '') {
        this.deleteTeam(indexs, true)
        this.setSnackbar({
          message: 'Teams with no name will be deleted automatically',
          type: 'error',
        })
      } else {
        this.teams[indexs].isEdit = false
        this.updateEditedTeams()
      }
    },
    async getTeam() {
      try {
        this.setIsOverlayAndLoading(true)
        const response = await this.setUserEditedTeams({ userId: this.getUserInfo.userId })
        this.teams = response
      }
      catch (error) {
        this.setSnackbar({
          message: error,
          type: 'error',
        })
      }
      finally {
        this.setIsOverlayAndLoading(false)
      }
    },
    async updateEditedTeams() {
      try {
        this.setIsOverlayAndLoading(true)
        const payload = {
          userId: this.getUserInfo.userId,
          teams: this.teams
        }
        await this.updateUserTeam(payload)
        this.setSnackbar({
          message: 'Your changes are saved successfully',
          type: 'success',
        })
      }
      catch (error) {
        this.setSnackbar({
          message: error,
          type: 'error',
        })
      }
      finally {
        this.setIsOverlayAndLoading(false)
      }
    }
  },
}
</script>
