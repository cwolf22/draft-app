<template>
  <v-container grid-list-md>
    <v-data-iterator
        :items="league.teams"
        :rows-per-page-items="[12]"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
      <template v-slot:header>
        <!-- <span style="text-transform: capitalize;"> Rosters</span> -->
      </template>
        <template v-slot:item="props">
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <v-card class="p4">
              <v-card-title><h4>{{ props.item.location }} {{ props.item.nickname }}</h4>
                <v-spacer></v-spacer>
                <div style="text-transform: capitalize;">{{ props.item.owners[0].firstName }} {{ props.item.owners[0].lastName }}</div>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile v-for="player in props.item.roster" :key="player.id">
                  <v-list-tile-content>Player:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ player.fullName }}</v-list-tile-content>
                </v-list-tile>
                <v-divider light></v-divider>
                <v-card-actions>
                  <v-layout>
                    <v-spacer></v-spacer>
                    <v-btn>Contact Owner</v-btn>
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
export default {
  props: ['league', 'sport'],
  data() {
    return {
      loaded: false,
      pagination: {
        rowsPerPage: 12,
      },
    };
  },
  methods: {
    getTeam(league) {
      return league.teams.find(team => team.id == league.teamId);
    },
    getTeamName(team) {
      return `${team.location} ${team.nickname}`;
    },
  },
};
</script>
