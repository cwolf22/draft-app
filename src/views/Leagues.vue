<template>
  <span>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg3>
          <v-layout wrap>
            <div>
              <v-btn large @click="submit">+<br/>Add league</v-btn>
            </div>
            </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="working"
      hide-overlay
      persistent
      width="300">
      <v-card
        color="primary"
        dark>
        <v-card-text>
          Signing In...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>

  export default {
    data() {
        return {
          working: false
        }
      },
    methods: {
      submit() {
        this.working = true
        this.$store.dispatch('IMPORT_LEAGUES', { username: 'cliffhanger178', password: 'hilliard1', sport:'baseball', type: 'espn' })
         .then((data) => {
           this.working = false;
           console.log(this.data)
         }).catch(err => {
           this.working = false;
           console.log(err)
         });
      }
    }
  }
</script>
