<template>
  <v-container style="padding-top:0px;">
    <v-data-iterator
        :items="leagues"
        :rows-per-page-items="displayOptions"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>
            <v-btn :to="`/leagues/${sport}`" light flat large class="btn-header">{{ sport.toUpperCase() }}</v-btn>
          </v-toolbar-title>
          <v-spacer/>
             <v-btn to="/leagues/import" light>Import</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:prepend-action>
        <v-layout>
        <v-spacer></v-spacer>
        <v-btn flat :to="`/leagues/${sport}`" hover> {{ sport }}</v-btn>
        </v-layout>
      </template>
        <template v-slot:no-data>
          <v-layout justify-center>
          <v-flex xs12 sm6 md4 lg3 justify-center class="pt-5">
            <v-card>
              <v-card-text>
                You currently have no leagues.  Would you like to import?
              </v-card-text>
              <v-card-actions>
                <v-btn to="/leagues/import" block color="primary">Import</v-btn>
              </v-card-actions>
            </v-card>
            </v-flex>
          </v-layout>
        </template>
        <template v-slot:item="props">
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <v-card :to="`/leagues/${sport}/${props.item.id}`" hover v-ripple>
              <v-card-title><h4>{{ props.item.name }}</h4>
                <v-spacer></v-spacer>
                {{ props.item.type.toUpperCase()}}
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Team:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ GET_TEAM(props.item.id).name }}</v-list-tile-content>
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
                  <v-list-tile-content>Last Import:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ new Date(props.item.ts._seconds * 1000).toDateString() }}</v-list-tile-content>
                </v-list-tile>
                 <v-divider light></v-divider>
                <v-card-actions>
                  <v-layout>
                    <v-btn v-if="GET_TEAM(props.item.id).owners[0].isLeagueManager">Admin</v-btn>
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
  props: ['sport', 'displayOptions'],
  data() {
    return {
      loaded: false,
      error: null,
      pagination: {
        rowsPerPage: 4,
      },
    };
  },
  computed: {
    ...mapGetters(['LEAGUES', 'GET_TEAM']),
    leagues() {
      return this.LEAGUES.filter(league => league.sport == this.sport);
    },
  },
};
</script>

<style scoped>
 .btn-header {
    color:white;
    font-size: 1em;
 }
</style>
<style>
  .leagues-list .v-data-iterator__actions {
    justify-content:center;
  }
</style>
