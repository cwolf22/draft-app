<template>
<v-container fluid>
  <v-layout text-xs-center wrap>
    <v-flex sm4 class="text-sm-left text-xs-center pb-2">
      <v-btn @click="$refs.calendar.prev()">
        <v-icon dark left>keyboard_arrow_left</v-icon>
        <span class="hidden-xs-only">Prev</span>
      </v-btn>
    </v-flex>
    <v-flex
      sm4 class="text-xs-center"><h2 class="pt-2">{{ selectedDate.month }} {{ selectedDate.year }}</h2>
    </v-flex>
    <v-flex sm4 class="text-sm-right text-xs-center">
      <v-btn @click="$refs.calendar.next()">
        <span class="hidden-xs-only">Next</span>
        <v-icon dark left>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
      <v-flex xs12>
        <v-sheet height="500">
          <v-calendar
            v-model="date"
            color="primary"
            type="month"
            ref="calendar"
          >
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu
                  :key="event.title"
                  v-model="event.open"
                  full-width
                  offset-x
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.title"
                    ></div>
                  </template>
                  <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                  >
                    <v-toolbar
                      color="primary"
                      dark
                    >
                      <v-btn icon>
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="event.title"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.details"></span>
                    </v-card-title>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
     </v-flex>

  </v-layout>
</v-container>
</template>

<script>
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default {
  data: () => ({
    date: new Date().toISOString(),
    type: 'month',
    events: [
      {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2018-12-30',
        open: false,
      },
      {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2018-12-31',
        open: false,
      },
      {
        title: 'Vacation',
        details: 'Going to the beach!',
        date: '2019-01-01',
        open: false,
      },
      {
        title: 'Meeting',
        details: 'Spending time on how we do not have enough time',
        date: '2019-01-07',
        open: false,
      },
      {
        title: '30th Birthday',
        details: 'Celebrate responsibly',
        date: '2019-01-03',
        open: false,
      },
      {
        title: 'New Year',
        details: 'Eat chocolate until you pass out',
        date: '2019-01-01',
        open: false,
      },
      {
        title: 'Conference',
        details: 'Mute myself the whole time and wonder why I am on this call',
        date: '2019-01-21',
        open: false,
      },
      {
        title: 'Hackathon',
        details: 'Code like there is no tommorrow',
        date: '2019-02-05',
        open: false,
      },
    ],
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    },
    selectedDate() {
      const datar = this.date.split('-');
      return {
        month: monthNames[parseInt(datar[1]) - 1],
        year: datar[0],
      };
    },
  },
  methods: {
    open(event) {
      alert(event.title);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>
