<template>
<v-container fluid grid-list-md>
    <v-breadcrumbs :items="breadcrumb">
      <template v-slot:divider>
        <v-icon>forward</v-icon>
      </template>
    </v-breadcrumbs>
    <v-container v-if="!LEAGUES_LOADED">
      <v-progress-linear :indeterminate="true" />
    </v-container>
    <leagues-list v-else v-for="item in sportsList" :key="item.sport" :sport="item.sport" :displayOptions="item.options"/>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import LeaguesList from '@/components/LeaguesList';

export default {
  components: {
    LeaguesList,
  },
  data() {
    return {
      sports: [{
        sport: 'baseball',
        options: [4],
        }, {
          sport: 'football',
          options: [4]
      }],
    };
  },
  computed: {
    ...mapGetters(['LEAGUES_LOADED']),
    sportsList() {
      if (!this.$route.params.sport) return this.sports;
      return [{
        sport: this.$route.params.sport,
        options: [4, 8, 12],
      }];
    },
    breadcrumb() {
      const breadcrumb = [{
        text: 'Leagues',
        exact: true,
        to: '/leagues',
      }];
      if (this.$route.params.sport) {
        breadcrumb.push({
          text: this.$route.params.sport.charAt(0).toUpperCase() + this.$route.params.sport.slice(1),
          exact: true,
          to: `/leagues/${this.$route.params.sport}`,
        });
      }
      return breadcrumb;
    },
  },
  created() {
    this.$store.dispatch('RETRIEVE_LEAGUES', { refresh: false })
      .catch(error => this.error = error);
  },
};
</script>
