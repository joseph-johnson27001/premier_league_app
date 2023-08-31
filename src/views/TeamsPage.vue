<template>
  <div>
    <h1>Teams</h1>
    <div class="team-cards">
      <div
        v-for="team in teams"
        :key="team.id"
        class="team-card"
        @click="fetchTeamPlayers(team.id)"
      >
        <img :src="team.crest" :alt="team.name" class="team-crest" />
        <p class="team-name">{{ team.name }}</p>
      </div>
    </div>
    <ul v-if="players.length">
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
        this.teams = response.data.teams.map((team) => ({
          ...team,
          crest: team.crest, // Use the 'crest' property directly
        }));
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    },
    async fetchTeamPlayers(teamId) {
      try {
        const response = await axios.get(`/api/teams/${teamId}`);
        this.players = response.data.squad;
      } catch (error) {
        console.error("Error fetching team players:", error);
      }
    },
  },
  created() {
    this.fetchTeams();
    if (this.selectedTeamId) {
      this.fetchTeamPlayers(this.selectedTeamId);
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
.team-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.team-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s;
}

.team-card:hover {
  background-color: #f2f2f2;
}

.team-crest {
  width: 100px;
  height: 100px;
}

.team-name {
  margin-top: 10px;
  text-align: center;
}
</style>
