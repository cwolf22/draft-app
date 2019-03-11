<template>
    <v-container>
        <v-layout column>
            <h2>{{ league.name }} <sub style="font-weight:normal;"><i>({{league.type}}-{{league.id}})</i></sub></h2>
            <v-layout row>
                <div>League Creators:</div>
                <div v-for="(owner, index) in leagueCreators" :key="owner.id">
                    {{owner.firstName}} {{owner.lastName}} ({{owner.displayName}})<template v-if="index + 1 < leagueCreators.length">,</template>
                </div>
            </v-layout>
            <v-layout row>
                <div>League Managers:</div>
                <div v-for="(owner, index) in leagueManagers" :key="owner.id">
                    {{owner.firstName}} {{owner.lastName}} ({{owner.displayName}})<template v-if="index + 1 < leagueManagers.length">,</template>
                </div>
            </v-layout>
             <v-layout row>
                <div>Last Import:</div>
                <div>
                    {{new Date(league.ts._seconds * 1000)}} by {{league.importBy}}
                </div>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['league'],
    computed: {
        leagueCreators() {
            const creators = [];
            if (this.league) {
                this.league.teams.forEach(team => {
                    team.owners.forEach(owner => {
                        if (owner.isLeagueCreator) creators.push(owner)
                    })
                });
                return creators;
            }
        },
        leagueManagers() {
            const managers = [];
            if (this.league) {
                this.league.teams.forEach(team => {
                    team.owners.forEach(owner => {
                        if (owner.isLeagueManager) managers.push(owner)
                    })
                });
            }
            return managers
        }
    }
}
</script>