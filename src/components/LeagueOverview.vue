<template>
    <v-container>
        <v-layout column>
            <h2>{{ league.name }} <small style="font-weight:normal;"><i>({{league.type}}-{{league.id}})</i></small></h2>
            <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Host:</v-list-tile-content>
                  <v-list-tile-content>
                     ESPN
                </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>League Creators:</v-list-tile-content>
                  <v-list-tile-content>
                      <template v-for="(owner, index) in leagueCreators">
                        {{owner.firstName}} {{owner.lastName}} ({{owner.displayName}})<template v-if="index + 1 < leagueCreators.length">,</template>
                      </template>
                </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>League Managers:</v-list-tile-content>
                  <v-list-tile-content>
                      <template v-for="(owner, index) in leagueManagers">
                        {{owner.firstName}} {{owner.lastName}} ({{owner.displayName}})<template v-if="index + 1 < leagueManagers.length">,</template>
                      </template>
                </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Draft Date:</v-list-tile-content>
                  <v-list-tile-content>
                     N/A
                </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Last Import :</v-list-tile-content>
                  <v-list-tile-content>
                     {{new Date(league.ts._seconds * 1000)}} by {{league.importBy}}
                </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['league'],
  computed: {
    leagueCreators() {
      const creators = [];
      if (this.league) {
        this.league.teams.forEach((team) => {
          team.owners.forEach((owner) => {
            if (owner.isLeagueCreator) creators.push(owner);
          });
        });
        return creators;
      }
    },
    leagueManagers() {
      const managers = [];
      if (this.league) {
        this.league.teams.forEach((team) => {
          team.owners.forEach((owner) => {
            if (owner.isLeagueManager) managers.push(owner);
          });
        });
      }
      return managers;
    },
  },
};
</script>
