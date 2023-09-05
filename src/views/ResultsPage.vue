<template>
  <div class="results-page">
    <div class="fixtures-header">
      <h1 class="fixtures-name">Premier League Results</h1>
    </div>
    <div class="team-dropdown">
      <label for="team">Select Team:</label>
      <select id="team" v-model="selectedTeam" @change="updateSelectedTeam">
        <option value="">All Teams</option>
        <option v-for="team in teams" :key="team">{{ team }}</option>
      </select>
    </div>
    <div class="fixtures-list">
      <div
        v-for="result in filteredResults"
        :key="result.id"
        class="fixture-item"
      >
        <div class="team-container team-left">
          <img
            :src="getTeamCrest(result.homeTeam.name)"
            :alt="result.homeTeam.name"
            class="team-crest"
          />
          <div class="team-name">{{ result.homeTeam.name }}</div>
        </div>
        <div class="score-container">
          <span class="score" v-if="result.status === 'FINISHED'">
            {{ result.score.fullTime.home }} - {{ result.score.fullTime.away }}
          </span>
        </div>
        <div class="team-container team-right">
          <div class="team-name">{{ result.awayTeam.name }}</div>
          <img
            :src="getTeamCrest(result.awayTeam.name)"
            :alt="result.awayTeam.name"
            class="team-crest"
          />
        </div>
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
        this.teamCrests = teamsResponse.data.teams.reduce((crestMap, team) => {
          crestMap[team.name] = team.crest;
          return crestMap;
        }, {});

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
    getTeamCrest(teamName) {
      return this.teamCrests[teamName] || "";
    },
  },
};
</script>

<style scoped>
.fixtures-header {
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: -20px -20px 20px -20px;
}

.team-dropdown {
  margin-bottom: 20px;
}

.fixtures-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fixture-item {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  align-items: center;
}

.team-container {
  display: flex;
  align-items: center;
}

.team-left {
  text-align: left;
}

.team-right {
  display: flex;
  text-align: right;
  justify-content: flex-end;
}

.team-name {
  font-weight: bold;
}

.score {
  font-size: 18px;
  text-align: center;
}

.score-container {
  text-align: center;
}

.team-crest {
  max-width: 30px;
  margin: 10px;
}

option[selected] {
  font-weight: bold;
}
</style>
