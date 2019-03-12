<template>
<v-app id="inspire">
  <navigation />
    <v-content>
      <router-view />
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>
    <league-import/>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation';
import LeagueImport from '@/views/LeagueImport';

export default {
  name: 'App',
  components: {
    Navigation,
    LeagueImport,
  },
};
</script>

<style>
.align-end {
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
}
</style>
