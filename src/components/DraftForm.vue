<template>
    <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="draft-matrix">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Draft Setup</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="e1--" :disabled="e1 == 1">Back</v-btn>
            <v-btn dark flat @click="e1 != 5 ? e1++ : e1--" :disabled="!    ensureStep">{{e1 == 5 ? 'Save' : 'Next'}}</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
        <v-stepper v-model="e1">
            <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">What is the Matrix?</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Select Dates</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Configure Time Window</v-stepper-step>
            <v-divider></v-divider>
             <v-stepper-step step="4">Select Times</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="5">Review</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-layout row wrap justify-center>
                    <v-flex xs12 md10 lg8>
                            The draft date matrix is a simple, yet effective process for determing which date and time work best for you leage.  The Matrix setup works as follows:
                            <v-list three-line>
                                <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-icon>assignment</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>Matrix Setup</v-list-tile-title>
                                    <v-list-tile-sub-title>Setup the Matrix.  continue with this form to select dates and times for drafting and specify a deadline for owner respnse.</v-list-tile-sub-title>
                                </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-icon>assignment_turned_in</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>Owner Response</v-list-tile-title>
                                    <v-list-tile-sub-title>Owners will be alerted once the draft Matrix has been setup.  they will be able to submit a response by accessing <strong>Action Items</strong> tab.</v-list-tile-sub-title>
                                </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-icon>calendar_today</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>Set Draft Date</v-list-tile-title>
                                    <v-list-tile-sub-title>Once the deadline has passed (or earlier if you dont care to wait), you can review the results and set the draft date and time.</v-list-tile-sub-title>
                                </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <v-flex xs12 class="text-xs-center">
                        <v-btn flat @click="close">Cancel</v-btn>
                        <v-btn color="primary" @click="e1++" :disabled="!ensureStep">Continue</v-btn>
                        </v-flex>
                        </v-layout>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-layout row wrap justify-center>
                        <v-flex xs12 md10 lg8>
                        <v-date-picker
                                v-model="dates"
                                multiple
                                full-width
                                :landscape="$vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm' ? false:true"
                                class="mt-5 mb-5"></v-date-picker>
                        </v-flex>
                        <v-flex xs12 class="text-xs-center">
                        <v-btn flat @click="e1--">Back</v-btn>
                        <v-btn color="primary" @click="e1++" :disabled="!ensureStep">Continue</v-btn>
                        </v-flex>
                    </v-layout>
                 </v-stepper-content>
                 <v-stepper-content step="3">
                    <v-layout row wrap justify-center>
                        <v-flex xs12 md10 lg6>
                            <template v-for="picker in pickers">
                                <v-time-picker xs12 lg6 v-model="picker.start">
                                </v-time-picker>
                                <v-time-picker xs12 lg6 v-model="picker.end">
                                </v-time-picker>
                            </template>
                        </v-flex>
                        <v-flex xs12 class="text-xs-center">
                        <v-btn flat @click="e1--">Back</v-btn>
                        <v-btn color="primary" @click="e1++" :disabled="!ensureStep">Continue</v-btn>
                        </v-flex>
                    </v-layout>
                 </v-stepper-content>
                 <v-stepper-content step="4">
                    <v-layout row wrap justify-center>
                        <v-flex xs12 md10 lg8>
                            Specify Timeslots.  You can specify Universal timeslots for all days or each day specifically.  If a universal timeslot is specificed, you can override days inidividually.
                        </v-flex>
                        <template v-for="(date,i) in sortedDates">
                            <v-flex xs10 lg8>
                                <v-expansion-panel>
                                    <v-expansion-panel-content>
                                    <template v-slot:header>
                                        <div>{{moment(date).format('dddd, MMMM Do YYYY')}}</div>
                                    </template>
                                    Contextual Feelin :: {{date}}</br>asdasd</br>asdasd
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-flex>
                            <v-flex xs2>
                                <v-switch class="ml-5" v-model="switch1" :label="`Override`"></v-switch>
                            </v-flex>
                        </template>
                        <v-flex xs12 class="text-xs-center">
                            <v-btn flat @click="e1--">Back</v-btn>
                            <v-btn color="primary" @click="e1++" :disabled="!ensureStep">Continue</v-btn>
                        </v-flex>
                    </v-layout>
                </v-stepper-content>
                <v-stepper-content step="5">
                    <v-layout row wrap justify-center>
                    <v-flex xs12 md10 lg8>
                            confirm
                        </v-flex>
                        <v-flex xs12 class="text-xs-center">
                        <v-btn flat @click="e1--">Back</v-btn>
                        <v-btn color="primary" @click="e1++" :disabled="!ensureStep">Continue</v-btn>
                        </v-flex>
                        </v-layout>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {
      dates: [],
      switches: [],
      times: [],
      pickers: [{
          start: '09:00',
          end: '12:00'
        }, {
          start: '12:00',
          end: '15:00'
        }, {
          start: '15:00',
          end: '18:00'
        }, {
          start: '18:00',
          end: '21:00'
        }, {
          start: '21:00',
          end: '00:00'
      }],
      e1: 0,
      deadline: '',
      switch1 : false,
    };
  },
  computed: {
      ensureStep() {
          switch(this.e1) {
              case 1:
              return true;
              case 2:
              return this.dates.length > 0;
              case 3:
              return true;
              case 4:
              this.times.length > 0;
              default:
              return true;
          }
      },
      sortedDates() {
          return this.dates.sort();
      },
  },
  methods: {
    resetForm() {
      this.e1 = 1;
      this.dates = [];
      this.times = [];
      this.deadline = '';
      setTimeout(() => this.errors.clear(), 50);
    },
    close() {
      this.resetForm();
      this.$emit('close');
    },
    submit() {
      alert('handler')
    },
  },
};
</script>
<style>
.draft-matrix .v-picker--landscape .v-picker__title {
    width:225px;
}
.draft-matrix .v-picker--landscape .v-picker__body {
    margin-left: 225px;
}
</style>
