<template>
  <div class="results-page">
    <div class="fixtures-header">
      <h1 class="fixtures-name">Premier League Results</h1>
    </div>
    <div class="team-selection">
      <div class="team-radio" v-for="team in teams" :key="team">
        <input
          type="checkbox"
          :id="team"
          :value="team"
          v-model="selectedTeams"
        />
        <label :for="team">{{ team }}</label>
      </div>
    </div>
    <div class="fixtures-list">
      <div
        v-for="result in filteredResults"
        :key="result.id"
        class="fixture-item"
        @click="toggleFixtureDetails(result.id)"
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
        <div class="fixture-details" v-if="isSelected(result.id)">
          <h2 class="match-details-title">Match Details</h2>
          <div
            v-if="selectedMatchData[result.id]"
            class="match-details-content"
          >
            <div class="score-details">
              <div class="score-item">
                Half Time Score:
                {{ selectedMatchData[result.id].score.halfTime.home }} -
                {{ selectedMatchData[result.id].score.halfTime.away }}
              </div>
              <div class="score-item">
                Full Time Score:
                {{ selectedMatchData[result.id].score.fullTime.home }} -
                {{ selectedMatchData[result.id].score.fullTime.away }}
              </div>
            </div>
            <div class="info-details">
              <div class="info-item">
                Referee: {{ selectedMatchData[result.id].referees[0].name }}
              </div>
              <div class="info-item">
                Venue: {{ selectedMatchData[result.id].venue }}
              </div>
              <div class="info-item">
                Matchday: {{ selectedMatchData[result.id].matchday }}
              </div>
            </div>
            <div class="competition-details">
              <div class="competition-emblem">
                <img
                  :src="selectedMatchData[result.id].competition.emblem"
                  alt="Competition Emblem"
                />
              </div>
            </div>
          </div>
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
      selectedTeams: [],
      teams: [],
      results: [],
      teamCrests: {},
      selectedMatchData: {}, // Store fixture data in an object with fixture IDs as keys
    };
  },
  created() {
    this.fetchTeamsAndResults();
  },
  computed: {
    filteredResults() {
      if (this.selectedTeams.length === 0) {
        return this.results;
      } else {
        return this.results.filter(
          (result) =>
            this.selectedTeams.includes(result.homeTeam.name) ||
            this.selectedTeams.includes(result.awayTeam.name)
        );
      }
    },
  },
  methods: {
    async fetchTeamsAndResults() {
      try {
        const teamsResponse = await axios.get("/api/competitions/PL/teams");
        this.teams = teamsResponse.data.teams.map((team) => team.name).sort();
        this.teamCrests = teamsResponse.data.teams.reduce((crestMap, team) => {
          crestMap[team.name] = team.crest;
          return crestMap;
        }, {});

        const resultsResponse = await axios.get(
          "/api/competitions/PL/matches?status=FINISHED"
        );
        const currentDate = new Date();
        this.results = resultsResponse.data.matches.filter(
          (result) => new Date(result.utcDate) <= currentDate
        );
        console.log(this.results);
      } catch (error) {
        console.error("Error fetching teams and results:", error);
      }
    },
    getTeamCrest(teamName) {
      return this.teamCrests[teamName] || "";
    },
    toggleFixtureDetails(matchId) {
      if (this.isSelected(matchId)) {
        this.$delete(this.selectedMatchData, matchId);
      } else {
        axios
          .get(`/api/matches/${matchId}`)
          .then((response) => {
            this.$set(this.selectedMatchData, matchId, response.data);
            console.log(this.selectedMatchData);
          })
          .catch((error) => {
            console.error("Error fetching match details:", error);
          });
      }
    },
    isSelected(matchId) {
      return !!this.selectedMatchData[matchId];
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

.team-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.team-radio input[type="checkbox"] {
  display: none;
}

.team-radio label {
  display: inline-block;
  background-color: #f8f8f8;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.team-radio label:hover {
  background-color: #ddd;
}

.team-radio input[type="checkbox"]:checked + label {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
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
  cursor: pointer;
}

.fixture-details {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
  grid-column: span 3;
  background-color: white !important;
  position: relative;
  cursor: default;
}

.competition-emblem {
  position: absolute;
  top: 0px;
  right: 5px;
  z-index: 1;
}

.match-details-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.match-details-content {
  display: flex;
  flex-wrap: wrap;
}

.score-details,
.info-details,
.competition-details {
  flex: 1;
  padding: 10px;
}

.score-item,
.info-item {
  margin-bottom: 10px;
}

.competition-emblem img {
  max-width: 100px;
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

.team-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.team-radio input[type="checkbox"] {
  display: none;
}

.team-radio label {
  display: inline-block;
  background-color: #f8f8f8;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.team-radio label:hover {
  background-color: #ddd;
}

.team-radio input[type="checkbox"]:checked + label {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
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
  cursor: pointer;
}

.fixture-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
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
