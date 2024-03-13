<template>
  <div class="landing-page">
    <p>Please select your favorite team:</p>
    <select v-model="selectedTeam" class="team-select">
      <option value="">Select a team...</option>
      <option v-for="team in teams" :key="team.id" :value="team.id">
        <img :src="team.crest" :alt="team.name" class="team-badge" />
        {{ team.name }}
      </option>
    </select>
    <button @click="next" class="next-button">Next</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LandingPage",
  data() {
    return {
      selectedTeam: "",
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
          crest: team.crestUrl,
        }));
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
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

.team-select {
  margin-bottom: 20px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.team-badge {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.next-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.next-button:hover {
  background-color: #0056b3;
}
</style>
