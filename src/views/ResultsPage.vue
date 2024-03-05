<template>
  <div>
    <span class="heading-span">
      <h2>Results</h2>
      <div
        v-if="!isLoading && this.filteredResults.length > 0"
        class="matchday-dropdown"
      >
        <label for="matchday-select">Select Match Week: </label>
        <select id="matchday-select" v-model="selectedMatchday">
          <option
            v-for="matchday in matchdays"
            :key="matchday"
            :value="matchday"
          >
            {{ matchday }}
          </option>
        </select>
      </div>
    </span>
    <div v-show="!isLoading && this.filteredResults.length == 0">
      The free API has hit its limit for 10 calls every minute. Please wait and
      try again.
    </div>
    <div v-if="isLoading" class="animation-container">
      <loadingAnimation />
    </div>
    <div v-else class="results-page">
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
              {{ result.score.fullTime.home }} -
              {{ result.score.fullTime.away }}
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
  </div>
</template>

<script>
import axios from "axios";
import loadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  name: "ResultsPage",
  components: {
    loadingAnimation,
  },
  data() {
    return {
      selectedTeams: [],
      results: [],
      teamCrests: {},
      selectedMatchData: {},
      isLoading: true,
      selectedMatchday: 1,
      matchdays: [],
    };
  },
  created() {
    this.fetchLatestMatchWeek();
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
  watch: {
    selectedMatchday(newMatchday) {
      this.fetchMatchesByMatchday(newMatchday);
    },
  },
  methods: {
    async fetchLatestMatchWeek() {
      this.isLoading = true;
      try {
        const [teamsResponse, resultsResponse] = await Promise.all([
          axios.get("/api/competitions/PL/teams"),
          axios.get("/api/competitions/PL/matches?status=FINISHED"),
        ]);
        this.teamCrests = teamsResponse.data.teams.reduce((crestMap, team) => {
          crestMap[team.name] = team.crest;
          return crestMap;
        }, {});
        const currentDate = new Date();
        this.results = resultsResponse.data.matches.filter(
          (result) => new Date(result.utcDate) <= currentDate
        );
        this.matchdays = [
          ...new Set(this.results.map((result) => result.matchday)),
        ];
        this.selectedMatchday = Math.max(...this.matchdays);
        this.fetchMatchesByMatchday(this.selectedMatchday);
      } catch (error) {
        console.error("Error fetching teams and results:", error);
      }
      this.isLoading = false;
    },
    async fetchMatchesByMatchday(matchday) {
      if (matchday === this.selectedMatchday) {
        return;
      }
      this.isLoading = true;
      try {
        const matchesResponse = await axios.get(
          `/api/competitions/PL/matches?status=FINISHED&matchday=${matchday}`
        );
        const currentDate = new Date();
        this.results = matchesResponse.data.matches.filter(
          (result) => new Date(result.utcDate) <= currentDate
        );
        console.log("Matches fetched for matchday:", matchday);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching matches for matchday:", matchday, error);
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
.heading-span {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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
  border: 1px solid #999;
  margin: 10px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.1s, box-shadow 0.1s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fixture-item:hover {
  border-color: #1f8dd6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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

.matchday-dropdown {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.matchday-dropdown label {
  margin-right: 10px;
}

.matchday-dropdown select {
  padding: 8px 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>
