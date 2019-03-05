

<template>
  <span>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <form @submit="submit">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  prepend-icon="person"
                  v-model="email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  label="E-mail"
                  data-vv-name="email"
                  required
                  ></v-text-field>
                <v-text-field 
                  prepend-icon="lock" 
                  v-model="password" 
                  v-validate="'required'"
                  label="Password" 
                  :error-messages="errors.collect('password')"
                  data-vv-name="password"
                  type="password"
                  required></v-text-field>
              </v-card-text>
              <v-card-actions>
                <span>Don't have an account? <router-link to="register">Sign Up</router-link></span>
                <v-spacer></v-spacer>
                <v-btn @click.prevent="submit" type="submit" :disabled="errors.any() || !completed">Login</v-btn>
              </v-card-actions>
            </v-card>
          </form>
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
        email: '',
        password: '',
        working: false
      }
    },
    computed: {
      completed() {
        return this.email && this.password;
      },
    },
    methods: {
      submit() {
        this.working = true;
        this.$store.dispatch('LOGIN', { email: this.email, password: this.password })
         .then(() => {
           this.working = false;
           this.$router.push('/leagues');
         }).catch(err => {
            this.working = false;
            console.log(err)
         });
      }
    }
  }
</script>
