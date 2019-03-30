<template>
  <div>{{ GET_TEAM(this.$route.params.id) }}</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['GET_TEAM']),
  },
};
</script>
