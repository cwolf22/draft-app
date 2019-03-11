<template>
  <v-container fluid> 
      <v-breadcrumbs :items="breadcrumb">
      <template v-slot:divider>
        <v-icon>forward</v-icon>
      </template>
    </v-breadcrumbs>
    <v-tabs v-model="active">
      <v-tab ripple>Overview</v-tab>
      <v-tab-item>
        <league-overview :league="league" :sport="sport"></league-overview>
      </v-tab-item>
      <v-tab ripple>Rosters</v-tab>
      <v-tab-item>
        <rosters :league="league" :sport="sport"/>
      </v-tab-item>
      <v-tab ripple>Action Items</v-tab>
      <v-tab-item>
        <v-container>Action Items (upcoming draft, off season stuff)</v-container>
      </v-tab-item>
      <v-tab ripple>Player Rankings</v-tab>
      <v-tab-item>
        <v-container>Player Rankings (perhaps will only display for teams who havent drafted yet)</v-container>
      </v-tab-item>
      <v-tab ripple :disabled="!isAdmin">Admin</v-tab>
      <v-tab-item>
        <v-container v-if="isAdmin">Admin Stuff (set up draft, create housekeeping items, etc.)</v-container>
      </v-tab-item>
    </v-tabs>
  
  </v-container>
</template>

<script>
import Rosters from '@/components/Rosters'
import LeagueOverview from '@/components/LeagueOverview'
import { mapGetters } from 'vuex';
  export default {
    components: {
      Rosters,
      LeagueOverview
    },
    data() {
      return {
        active: null,
      }
    },
    computed: {
      ...mapGetters(['LEAGUES']),
      league() {
        return this.LEAGUES.find(l => l.id == this.$route.params.id);
      },
      sport() {
        return this.$route.params.sport;
      },
      breadcrumb() {
        return [
        {
          text: 'Leagues',
          exact: true,
          to: '/leagues'
        },
        {
          text: this.sport.charAt(0).toUpperCase() + this.sport.slice(1),
          exact: true,
          to: `/leagues/${this.sport}`
        },
        {
          text: this.$route.params.id.toUpperCase(),
          exact: true,
          to: `/leagues/${this.sport}/${this.$route.params.id}`
        }
      ]
      },
      isAdmin() {
        if (!this.league) return false;
        let owner = null;
        this.league.teams.find(team => {
          team.owners.find(mngr => {
            if (mngr.id !== this.league.ownerId) return false;
            owner = mngr;
            return true;
          });
          return owner;
        })
        return owner.isLeagueManager;
      }
    },
    created() {
      this.$store.dispatch('RETRIEVE_LEAGUES', { refresh: false })
        .then(response => this.loaded = true)
        .catch(error => this.error = error)
    },
  }
</script>
