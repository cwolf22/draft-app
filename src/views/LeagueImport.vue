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
            <v-btn dark flat @click="submit" :disabled="errors.any() || !completed">Import</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-md>
        <v-layout justify-center>
        <v-flex xs12 sm8 md7>
          <form @submit="submit">
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
                  v-model="form.user"
                  v-validate="'required'"
                  :error-messages="errors.collect('username')"
                  label="Username"
                  data-vv-name="username"
                  :hint=" form.site ? `Enter your ${form.site} Username` : ''"
                  persistent-hint
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
                  :hint=" form.site ? `Enter your ${form.site} Password` : ''"
                  persistent-hint
                  required></v-text-field>
                <v-layout>
                  <v-spacer></v-spacer>
                  <v-btn @click.prevent="resetForm" color="error">Clear</v-btn>
                  <v-btn @click.prevent="submit" type="submit" :disabled="errors.any() || !completed">Import</v-btn>
                </v-layout>
          </form>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      </v-container>
      </v-card> 
    </v-dialog>
    <v-dialog
      v-model="worker.show"
     
      persistent
      width="300">
      <v-card
        :color="worker.color"
        dark>
        <v-card-text>
            <v-layout>
              <template v-if="worker.color == 'primary'">
                  Importing League...
              </template>
              <template v-else-if="worker.color == 'success'">
                  Import Complete!
                  <v-spacer />
                  <v-icon>done</v-icon>
              </template>
              <template v-else>
                  Import Failed!
              </template>
           <!--<v-spacer /><v-icon style="margin-top:-10px">indeterminate_check_box</v-icon> -->
            </v-layout>
          <v-progress-linear
            :indeterminate="worker.color == 'primary'"
            :value="worker.color == 'primary'? 0 : 100"
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
        working: true,
        form: {
            user: '',
            password: '',
            sport: '',
            site: ''
        },
        worker: {
          show: false,
          color: "primary",
        }
      }
    },
    computed: {
        completed() {
            return this.form.user && this.form.password && this.form.sport && this.form.site;
        }
    },
    methods: {
        resetForm() {
            this.form.user = '',
            this.form.password = '',
            this.form.sport = '',
            this.form.site = '',
            setTimeout(() => this.errors.clear(), 50);
        },
        close() { 
            this.resetForm();
            this.$router.back();
        },
        submit() {
          this.worker.show = true;
          this.$store.dispatch('IMPORT_LEAGUES', { 
              username: this.form.user, 
              password: this.form.password, 
              sport: this.form.sport, 
              type: this.form.site })
            .then((data) => {
              this.worker.color="success";
              setTimeout(() => {
                this.worker.show = false;
                this.worker.color = 'primary';
                this.resetForm();
                this.$router.back();
              }, 1500)
            }).catch(err => {
              this.worker.color="error";
              setTimeout(() => {
                this.worker.show = false;
                this.worker.color = 'primary';
              }, 1500)
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
