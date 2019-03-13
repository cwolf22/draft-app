<template>
  <section>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app>
      <v-list dense>
        <v-list-tile to="/" v-ripple>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-if="!AUTHENTICATED">
          <v-list-tile to="/login" v-ripple="{ center: true }">
            <v-list-tile-action>
              <v-icon>create</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login/Sign Up</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-else>
          <v-list-tile to="/account" v-ripple="{ center: true }">
            <v-list-tile-action>
              <v-icon>account_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Account</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group prepend-icon="input">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Leagues</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile to="/leagues" exact v-ripple="{ center: true }">
              <v-list-tile-action>
                <v-icon>view_array</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Overview</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/leagues/import">
              <v-list-tile-action>
                <v-icon>add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Import...</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile to="/calendar" v-ripple="{ center: true }">
            <v-list-tile-action>
              <v-icon>calendar_today</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Calendar</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout" v-ripple="{ center: true }">
            <v-list-tile-action>
              <v-icon>cancel</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left  color="primary" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Fantasy App</v-toolbar-title>
      <v-spacer />
      <v-btn flat v-if="!AUTHENTICATED" to="/login" active-class="">Login / Register</v-btn>
      <v-btn flat v-else @click="logout">Logout</v-btn>
    </v-toolbar>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import LeagueImport from '@/views/LeagueImport';

export default {
  components: {
    LeagueImport,
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapGetters(['AUTHENTICATED']),
  },
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT');
      this.$router.push('/login');
    },
  },
};
</script>
