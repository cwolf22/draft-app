<template>
  <h1>leage add</h1>
</template>

<script>
  export default {
      methods: {
          submit() {
              this.$store.dispatch('ADD_LEAGUE');
          }
      }
  }
</script>
