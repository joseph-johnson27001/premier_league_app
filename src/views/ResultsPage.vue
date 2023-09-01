<template>
  <div class="results-page">
    <div class="results-header">
      <h1 class="results-name">Premier League Results</h1>
    </div>
    <div class="team-dropdown">
      <label for="team">Select Team:</label>
      <select id="team" v-model="selectedTeam" @change="updateSelectedTeam">
        <option value="">All Teams</option>
        <option v-for="team in teams" :key="team">{{ team }}</option>
      </select>
    </div>
    <div class="results-list">
      <div
        v-for="result in filteredResults"
        :key="result.id"
        class="result-item"
      >
        <span class="team-name">{{ result.homeTeam.name }}</span>
        <span class="score" v-if="result.status === 'FINISHED'">
          {{ result.score.fullTime.home }} -
          {{ result.score.fullTime.away }}
        </span>
        <span class="vs" v-else-if="result.status === 'SCHEDULED'">vs</span>
        <span class="team-name">{{ result.awayTeam.name }}</span>
        <!-- <span class="date">{{
          new Date(result.utcDate).toLocaleString()
        }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResultsPage",
  data() {
    return {
      selectedTeam: "",
      teams: [],
      results: [],
    };
  },
  created() {
    this.fetchTeamsAndResults();
  },
  computed: {
    filteredResults() {
      if (this.selectedTeam === "") {
        return this.results;
      } else {
        return this.results.filter(
          (result) =>
            result.homeTeam.name === this.selectedTeam ||
            result.awayTeam.name === this.selectedTeam
        );
      }
    },
  },
  methods: {
    async fetchTeamsAndResults() {
      try {
        const teamsResponse = await axios.get("/api/competitions/PL/teams");
        this.teams = teamsResponse.data.teams.map((team) => team.name);
        console.log(teamsResponse);

        const resultsResponse = await axios.get(
          "/api/competitions/PL/matches?status=FINISHED"
        );
        console.log(resultsResponse);

        const currentDate = new Date();
        this.results = resultsResponse.data.matches.filter(
          (result) => new Date(result.utcDate) <= currentDate
        );
      } catch (error) {
        console.error("Error fetching teams and results:", error);
      }
    },
    updateSelectedTeam(event) {
      this.selectedTeam = event.target.value;
    },
  },
};
</script>

<style scoped>
.results-header {
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: -20px -20px 20px -20px;
}
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.team-dropdown {
  margin-bottom: 20px;
}

.results-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-item {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}

.team-name {
  font-weight: bold;
}

.score {
  font-size: 18px;
}

/* Style for selected team in dropdown */
option[selected] {
  font-weight: bold;
}
</style>
