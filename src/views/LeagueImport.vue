<template>
  <section>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>  
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Import League</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="submit" :disabled="errors.any() || !completed">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-md>
        <v-layout justify-center>
        <v-flex xs12 sm8 md7>
          <form @submit="close">
              <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-select
                  :items="['ESPN']"
                  label="Site"
                  prepend-icon="storage"
                  v-model="form.site"
                  :error-messages="errors.collect('site')"
                  data-vv-name="site"
                  v-validate="'required'"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['Baseball']"
                  label="Sport"
                  prepend-icon="layers"
                  v-model="form.sport"
                  :error-messages="errors.collect('sport')"
                  data-vv-name="sport"
                  v-validate="'required'"
                  required
                ></v-select>
              </v-flex>
              </v-layout>
                <v-text-field
                  prepend-icon="person"
                  v-model="form.username"
                  v-validate="'required'"
                  :error-messages="errors.collect('username')"
                  label="Username"
                  data-vv-name="username"
                  required
                  ></v-text-field>
                <v-text-field 
                  prepend-icon="lock" 
                  v-model="form.password" 
                  v-validate="'required'"
                  label="Password" 
                  :error-messages="errors.collect('password')"
                  data-vv-name="password"
                  type="password"
                  required></v-text-field>
          </form>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      </v-container>
      </v-card> 
    </v-dialog>
    <v-dialog
      v-model="working"
     
      persistent
      width="300">
      <v-card
        color="primary"
        dark>
        <v-card-text>
            <v-layout>
          Importing League... <!--<v-spacer /><v-icon style="margin-top:-10px">indeterminate_check_box</v-icon> -->
            </v-layout>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        working: false,
        form: {
            user: '',
            password: '',
            sport: '',
            site: ''
        },
      }
    },
    computed: {
        completed() {
            return this.form.email && this.form.password && this.form.sport && this.form.site;
        }
    },
    methods: {
        resetForm() {
            this.form.user = '',
            this.form.password = '',
            this.form.sport = '',
            this.form.site = ''
        },
        close() { 
            this.show = false;
            this.resetForm();
            this.$router.back();
        },
        submit() {
            alert('called')
          this.$emit('update:show', false)
          this.working = true
          this.$store.dispatch('IMPORT_LEAGUES', { 
              username: this.form.username, 
              password: this.form.password, 
              sport: this.form.sport, 
              type: this.form.type })
            .then((data) => this.working = false)
            .catch(err => {
              this.working = false;
              this.$emit('update:show', true)
          });
        }
    },
    watch: {
    '$route.meta' ({showImport}) {
      if (showImport) this.show = true
      else this.show = false
    }
  }
  }
</script>
