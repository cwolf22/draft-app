<template>
<v-container fluid grid-list-md>
      <leagues-list :sport="'baseball'"></leagues-list>
      <leagues-list :sport="'football'"></leagues-list>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import LeaguesList from '@/components/LeaguesList';
  export default {
    components: {
      LeaguesList,
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
