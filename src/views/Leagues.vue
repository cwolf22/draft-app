<template>
<v-container fluid grid-list-md>
      <v-data-iterator
        :items="LEAGUES"
        :rows-per-page-items="[4]"
        :pagination.sync="pagination"
        :loading="!loaded"
        row
        wrap
      >
          <v-layout row wrap>
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
                  <v-list-tile-content class="align-end">{{ getTeamName(props.item) }}</v-list-tile-content>
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
                  <v-layout justify-end>
                    <v-btn>asd</v-btn>
                  </v-layout>
                </v-card-actions>
              </v-list>
            </v-card>
          </v-flex>
        </template>
        <v-layout>
      </v-data-iterator>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
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
    },
    methods: {
      getTeamName(league) {
        const team = league.teams.find(team => team.id == league.teamId)
        return `${team.location} ${team.nickname}`
      }
    },
    created() {
      this.$store.dispatch('RETRIEVE_LEAGUES')
        .then(response => {
          this.loaded = true;
          })
        .catch(error => this.error = error)
    },
  }
</script>
