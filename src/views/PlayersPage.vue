<template>
  <div class="players-page">
    <h1>Players</h1>
    <div class="team-dropdown">
      <label for="team">Select Team:</label>
      <select id="team" v-model="selectedTeamId" @change="fetchTeamPlayers">
        <option value="">Select a team</option>
        <option v-for="team in teams" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>
    <ul v-if="players.length">
      <li v-for="player in players" :key="player.id">
        <router-link :to="{ name: 'PlayerProfile', params: { id: player.id } }">
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
      selectedTeamId: "",
      teams: [],
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
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
