<template>
  <v-container grid-list-md>
    <v-data-iterator
        :items="items"
        :rows-per-page-items="[2]"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
        justify-center
        hide-actions
      >
      <template v-slot:header>
        <!-- <span style="text-transform: capitalize;"> Rosters</span> -->
      </template>
        <template v-slot:item="props">
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <v-card class="p4">
              <v-card-title><h4>{{ props.item.title }}</h4>
                <v-spacer></v-spacer>
                <div style="text-transform: capitalize;">{{ props.item.title }}</div>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>{{props.item.text}}</v-list-tile-content>
                </v-list-tile>
                <v-divider light></v-divider>
                <v-card-actions>
                  <v-layout justify-center>
                    <v-btn>Configure</v-btn>
                  </v-layout>
                </v-card-actions>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            pagination: {
                rowsPerPage: 2,
            },
            items: [
                {title: 'Draft', text: 'Draft has not yet been set up'},
                {title: 'Free Agency', text: 'Free Agency has not yet been set up'}
            ]
        }
    }
}
</script>
