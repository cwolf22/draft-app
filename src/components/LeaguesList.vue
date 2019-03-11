<template>
  <v-container>
    <h2> {{ sport }}</h2>
    <v-data-iterator
        :items="leagues"
        :rows-per-page-items="[4]"
        :pagination.sync="pagination"
        :loading="!loaded"
        row
        wrap
      >
        <template v-slot:no-data>
            <v-btn large to="/leagues/import"> No Leagues Yet<br/> + </br>Import a league</v-btn>
        </template>
        <template v-slot:item="props">
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <v-card :to="`/leagues/${props.item.id}`" hover>
              <v-card-title><h4>{{ props.item.name }}</h4>
                <v-spacer></v-spacer>
                {{ props.item.type.toUpperCase()}}
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Team:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ getTeamName(getTeam(props.item)) }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Team Id:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.teamId }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Teams:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.teams.length }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Teams:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.teams.length }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Last Import:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ new Date(props.item.ts._seconds * 1000).toDateString() }}</v-list-tile-content>
                </v-list-tile>
                 <v-divider light></v-divider>
                <v-card-actions>
                  <v-layout>
                    <v-btn v-if="getTeam(props.item).owners[0].isLeagueManager">Admin</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn>View</v-btn>
                  </v-layout>
                </v-card-actions>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default { 
    props: ['sport'],
    data() {
      return {
        loaded: false,
        error: null,
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 4
      },
      }
    },
    computed: {
      ...mapGetters(['LEAGUES']),
      leagues() {
        return this.LEAGUES.filter(league => league.sport == this.sport)
      }
      
    },
    methods: {
      getTeam(league) {
        return league.teams.find(team => team.id == league.teamId)
      },
      getTeamName(team) {
        return `${team.location} ${team.nickname}`
      }
    },
  }
</script>