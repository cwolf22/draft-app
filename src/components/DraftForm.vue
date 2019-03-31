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
            <v-stepper-step step="3">Configure Time Windows</v-stepper-step>
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
                    color="primary"
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
                <template v-for="(picker, i) in pickers">
                  <v-flex xs1 class="text-xs-right">
                    <v-btn fab dark small color="error" @click="pickers.splice(i,1)">
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs2 class="pl-5">
                    <v-text-field
                      v-model="picker.label"
                      v-validate="'required'"
                      :error-messages="errors.collect('label')"
                      label="Label"
                      data-vv-name="label"
                      required
                      ></v-text-field>
                  </v-flex>
                  <v-flex xs4 class="pl-5">
                    <v-menu
                      :ref="`menu${i}-start`"
                      v-model="picker.start.menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="picker.start.time"
                      :allowed-minutes="allowedMinutes"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                      >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="picker.start.time"
                          label="Start Time"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                          ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="picker.start.menu"
                        v-model="picker.start.time"
                        full-width
                        :max="picker.end.time"
                        :allowed-minutes="allowedMinutes"
                        @click:minute="$refs[`menu${i}-start`][0].save(picker.start.time)"
                        ></v-time-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs4 class="pl-5">
                    <v-menu
                      :ref="`menu${i}-end`"
                      v-model="picker.end.menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="picker.end.time"
                      :allowed-minutes="allowedMinutes"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                      >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="picker.end.time"
                          label="Picker in menu"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                          ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="picker.end.menu"
                        v-model="picker.end.time"
                        full-width
                        :min="picker.start.time"
                        :allowed-minutes="allowedMinutes"
                        @click:minute="$refs[`menu${i}-end`][0].save(picker.end.time)"
                        ></v-time-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs1 />
                </template>
                <v-flex xs12 class="text-xs-center">
                  <v-btn flat @click="e1--">Back</v-btn>
                  <v-btn color="primary" @click="e1++" :disabled="!ensureStep">Continue</v-btn>
                </v-flex>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-layout row wrap justify-center>
                <v-data-table
                    :headers="tableHeaders"
                    :items="sortedDates"
                    disable-initial-sort
                    hide-actions
                    class="elevation-1">

                      <template v-slot:headers="props">
                        <tr>
                        <th v-for="header in props.headers" :key="header.text">
                            {{ header.text }}
                        </th>
                        </tr>
                    </template>

                <template v-slot:items="props">
                    <td>{{moment(props.item).format('dddd, MMMM Do YYYY')}}</td>
                    <td v-for="picker in pickers" :key="picker.label">
                         <v-checkbox
                            :input-value="props.selected"
                            primary
                            hide-details></v-checkbox>
                    </td>
                </template>
                </v-data-table>
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
const defaultPickers = [{
          label: 'Morning',
          start: {
              time: '09:00',
              menu: false,
          },
          end: {
              time: '12:00',
              menu: false,
          }
        }, {
          label: 'Noon',
          start: {
              time: '12:00',
              menu: false,
          },
          end: {
              time: '15:00',
              menu: false,
          }
        }, {
          label: 'Afternoon',
          start: {
              time: '15:00',
              menu: false,
           },
          end: {
              time: '18:00',
              menu: false,
          }
        }, {
          label: 'Evening',
          start: {
              time: '18:00',
              menu: false,
           },
          end: {
              time: '21:00',
              menu: false,
          }
        }, {
          label: 'Night',
          start: {
              time: '21:00',
              menu: false,
           },
          end: {
              time: '24:00',
              menu: false,
          }
      }]
export default {
  props: ['show'],
  data() {
    return {
      dates: [],
      switches: [],
      times: [],
      pickers: defaultPickers,
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
              return this.pickers.length > 0;
              case 4:
              this.times.length > 0;
              default:
              return true;
          }
      },
      sortedDates() {
          return this.dates.sort();
      },
      tableHeaders() {
          const headers = this.pickers.map(picker => {
              return {
                  text:picker.label,
                  value:picker.label.toLowerCase(),
                  sortable: false,
              }
          });
          headers.unshift({text:'Date', value:'date', sortable: false});
          return headers;
      }
  },
  methods: {
    saveTime(picker, index) {
       this.$refs[`menu${index}`][0].save(picker);
    },
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
    allowedMinutes: v => v % 5 == 0
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
