<template>
  <span>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg3>
          <v-layout wrap>
            <v-card to="/login" hover ripple img="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span><br>
            <span>Whitehaven Beach</span><br>
            <span>Whitsunday Island, Whitsunday Islands</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
            <div>
              <v-btn large>+<br/>Add league</v-btn>
            </div>
            </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </span>
</template>

<script>

  export default {
   
  }
</script>
