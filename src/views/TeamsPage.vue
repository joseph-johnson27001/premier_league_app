<template>
  <div>
    <h1 class="page-title">TEAMS</h1>
    <div class="team-cards">
      <router-link
        v-for="team in teams"
        :key="team.id"
        :to="{ name: 'Team', params: { teamId: team.id } }"
      >
        <div class="team-card">
          <img
            :src="team.crest"
            :alt="team.name + ' Crest'"
            class="team-crest"
          />
          <p class="team-name">{{ team.name }}</p>
        </div>
      </router-link>
    </div>
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
        this.teams = response.data.teams.sort((a, b) => {
          return a.name.localeCompare(b.name); // Sort alphabetically
        });
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
  },
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}
.team-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
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

@media (max-width: 768px) {
  .team-cards {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
