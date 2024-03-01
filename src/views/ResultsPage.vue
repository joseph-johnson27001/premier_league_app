<template>
  <div class="results-page">
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
          <div class="team-name">{{ getTeamName(result.homeTeam.name) }}</div>
        </div>
        <div class="score-container">
          <span class="score" v-if="result.status === 'FINISHED'">
            {{ result.score.fullTime.home }} - {{ result.score.fullTime.away }}
          </span>
        </div>
        <div class="team-container team-right">
          <div class="team-name">{{ getTeamName(result.awayTeam.name) }}</div>
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
      selectedTeams: [],
      results: [],
      teamCrests: {},
      selectedMatchData: {},
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
      } catch (error) {
        console.error("Error fetching teams and results:", error);
      }
    },
    getTeamName(teamName) {
      return teamName.replace(/FC$/, "").trim();
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
.fixtures-list {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  font-weight: bold;
}

.fixture-item {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: 10px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.1s, box-shadow 0.1s;
}

.fixture-item:hover {
  border-color: #999;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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
</style>
