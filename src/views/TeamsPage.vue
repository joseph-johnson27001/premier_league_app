<template>
  <div>
    <h1>Teams</h1>
    <div class="team-dropdown" v-if="!selectedTeamId">
      <label for="team">Select Team:</label>
      <select id="team" v-model="selectedTeamId" @change="fetchTeamPlayers">
        <option value="">All Teams</option>
        <option v-for="team in teams" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>
    <ul v-else>
      <li v-for="player in players" :key="player.id">
        <router-link
          :to="{ name: 'player-profile', params: { id: player.id } }"
        >
          {{ player.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      teams: [],
      selectedTeamId: this.$route.params.teamId,
      players: [],
    };
  },
  methods: {
    async fetchTeams() {
      try {
        const response = await axios.get("/api/competitions/PL/teams");
        this.teams = response.data.teams;
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    },
    async fetchTeamPlayers() {
      try {
        const response = await axios.get(`/api/teams/${this.selectedTeamId}`);
        this.players = response.data.squad;
      } catch (error) {
        console.error("Error fetching team players:", error);
      }
    },
  },
  created() {
    this.fetchTeams();
    if (this.selectedTeamId) {
      this.fetchTeamPlayers();
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
