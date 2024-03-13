<template>
  <div class="landing-page">
    <p>Please select your favorite team:</p>
    <div class="team-grid">
      <div
        v-for="team in teams"
        :key="team.id"
        class="team-square"
        @click="selectTeam(team)"
      >
        <img :src="team.crest" :alt="team.name" class="team-badge" />
        <div class="team-name">{{ team.name }}</div>
      </div>
    </div>
    <button @click="next" class="next-button">Next</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LandingPage",
  data() {
    return {
      selectedTeam: null,
      teams: [],
    };
  },
  created() {
    this.fetchTeams();
  },
  methods: {
    async fetchTeams() {
      try {
        const response = await axios.get("/api/competitions/PL/teams");
        this.teams = response.data.teams.map((team) => ({
          id: team.id,
          name: team.name,
          crest: team.crest,
        }));
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    },
    selectTeam(team) {
      this.selectedTeam = team.id;
      console.log("Selected Team:", team);
    },
    next() {
      console.log("Selected Team:", this.selectedTeam);
    },
  },
};
</script>

<style scoped>
.landing-page {
  text-align: center;
  margin-top: 50px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
}

.team-square {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.team-square:hover {
  background-color: #f5f5f5;
}

.team-badge {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.team-name {
  font-size: 16px;
}
</style>
