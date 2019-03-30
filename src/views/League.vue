<template>
  <v-container fluid>
      <v-breadcrumbs :items="breadcrumb">
      <template v-slot:divider>
        <v-icon>forward</v-icon>
      </template>
    </v-breadcrumbs>
    <v-container v-if="!LEAGUES_LOADED">
      <v-progress-linear :indeterminate="true" />
    </v-container>
    <v-tabs v-else v-model="active">
      <v-tab ripple :to="{name: 'Overview'}">Overview</v-tab>
      <v-tab ripple :to="{name: 'My-Team'}">My Team</v-tab>
      <v-tab ripple :to="{name: 'Rosters'}">Rosters</v-tab>
      <v-tab ripple :to="{name: 'Actions'}">Action Items</v-tab>
      <v-tab ripple :to="{name: 'Rankings'}">Player Rankings</v-tab>
      <v-tab ripple :disabled="!isAdmin" :to="{name: 'Admin'}">Admin</v-tab>
    </v-tabs>
    <transition name="slide-x-reverse-transition" mode="out-in">
      <router-view v-if="GET_LEAGUE(this.$route.params.id)" :league="GET_LEAGUE(this.$route.params.id)" :sport="sport" :isAdmin="isAdmin" />
    </transition>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      active: null,
    };
  },
  computed: {
    ...mapGetters(['GET_LEAGUE', 'LEAGUES_LOADED']),
    sport() {
      return this.$route.params.sport;
    },
    breadcrumb() {
      return [
        {
          text: 'Leagues',
          exact: true,
          to: '/leagues',
        },
        {
          text: this.sport.charAt(0).toUpperCase() + this.sport.slice(1),
          exact: true,
          to: `/leagues/${this.sport}`,
        },
        {
          text: this.$route.params.id.toUpperCase(),
          exact: false,
          to: `/leagues/${this.sport}/${this.$route.params.id}`,
        },
      ];
    },
    isAdmin() {
      const league = this.GET_LEAGUE(this.$route.params.id);
      if (!league) return false;
      let owner = null;
      league.teams.find((team) => {
        team.owners.find((mngr) => {
          if (mngr.id !== league.ownerId) return false;
          owner = mngr;
          return true;
        });
        return owner;
      });
      return owner.isLeagueManager;
    },
  },
  created() {
    this.$store.dispatch('RETRIEVE_LEAGUES', { refresh: false })
      .then(response => this.loaded = true)
      .catch(error => this.error = error);
  },
};
</script>