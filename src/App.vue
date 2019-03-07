<template>
<v-app id="inspire">
  <navigation />
    <v-content>
      <router-view />
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from '@/components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  },
}
</script>
