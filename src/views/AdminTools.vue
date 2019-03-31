<template>
  <v-container grid-list-md>
    <v-data-iterator
        :items="items"
        :rows-per-page-items="[4]"
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
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>{{props.item.text}}</v-list-tile-content>
                </v-list-tile>
                <v-divider light></v-divider>
                <v-card-actions>
                  <v-layout justify-center>
                    <v-btn @click="forms[props.item.form] = true">Matrix</v-btn>
                  </v-layout>
                </v-card-actions>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    <draft-form :show="forms.draft" @close="forms.draft = false"></draft-form>
  </v-container>
</template>

<script>
import DraftForm from '@/components/DraftForm'
export default {
  props: ['isAdmin', 'league'],
  components: {
    DraftForm
  },
    data() {
        return {
            pagination: {
                rowsPerPage: 4,
            },
            items: [
                {title: 'Draft', text: 'Draft has not yet been set up.  Pick a draft date, or request feedback from owners.', form:'draft'},
                {title: 'Rookie Draft', text: 'Rookie Draft has not yet been set up', form:'rookie'},
                {title: 'Keepers', text: 'Keepers has not yet been set up', form:'keeper'},
                {title: 'Restricted Free Agency', text: 'Restricted Free Agency has not yet been set up', form:'RFA'}
            ],
            forms: {
              draft: false,
              rookie: false,
              keeper: false,
              RFA: false
            }
        }
    },
    mounted() {
      if (!this.isAdmin) {
        this.$router.push({name: 'Overview'})
      }
    }
}
</script>
