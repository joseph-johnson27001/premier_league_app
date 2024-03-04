<template>
  <div>
    <span class="heading-span">
      <h2>Fixtures</h2>
      <div class="matchday-dropdown">
        <label for="matchday-select">Select Match Week: </label>
        <select
          id="matchday-select"
          v-model="selectedMatchday"
          @change="fetchMatchesByMatchday"
        >
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
    <div v-if="isLoading" class="animation-container">
      <loadingAnimation />
    </div>
    <div v-else class="fixtures-page">
      <div class="fixtures-list">
        <div
          v-for="fixture in filteredFixtures"
          :key="fixture.id"
          class="fixture-item"
          @click="toggleFixtureDetails(fixture.id)"
        >
          <div class="team-container team-left">
            <img
              :src="getTeamCrest(fixture.homeTeam.name)"
              :alt="fixture.homeTeam.name"
              class="team-crest"
            />
            <div class="team-name">
              {{ getTeamName(fixture.homeTeam.name) }}
            </div>
          </div>
          <div class="vs-sign">
            <p>vs</p>
            <div class="match-details">
              {{ formatDateTime(fixture.utcDate) }}
            </div>
          </div>
          <div class="team-container team-right">
            <div class="team-name">
              {{ getTeamName(fixture.awayTeam.name) }}
            </div>
            <img
              :src="getTeamCrest(fixture.awayTeam.name)"
              :alt="fixture.awayTeam.name"
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
  name: "FixturesPage",
  components: {
    loadingAnimation,
  },
  data() {
    return {
      selectedTeams: [],
      fixtures: [],
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
    filteredFixtures() {
      if (this.selectedTeams.length === 0) {
        return this.fixtures;
      } else {
        return this.fixtures.filter(
          (fixture) =>
            this.selectedTeams.includes(fixture.homeTeam.name) ||
            this.selectedTeams.includes(fixture.awayTeam.name)
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
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const options = {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      return date.toLocaleString("en-US", options);
    },

    async fetchLatestMatchWeek() {
      this.isLoading = true;
      try {
        const teamsResponse = await axios.get("/api/competitions/PL/teams");
        this.teamCrests = teamsResponse.data.teams.reduce((crestMap, team) => {
          crestMap[team.name] = team.crest;
          return crestMap;
        }, {});
        const fixturesResponse = await axios.get(
          "/api/competitions/PL/matches?status=SCHEDULED"
        );
        const currentDate = new Date();
        this.fixtures = fixturesResponse.data.matches.filter(
          (fixture) => new Date(fixture.utcDate) > currentDate
        );
        this.matchdays = [
          ...new Set(this.fixtures.map((fixture) => fixture.matchday)),
        ];
        this.selectedMatchday = this.matchdays[0];
        this.fetchMatchesByMatchday(this.selectedMatchday);
      } catch (error) {
        console.error("Error fetching teams and fixtures:", error);
      }
      this.isLoading = false;
    },
    async fetchMatchesByMatchday(matchday) {
      this.isLoading = true;
      try {
        const matchesResponse = await axios.get(
          `/api/competitions/PL/matches?status=SCHEDULED&matchday=${matchday}`
        );
        const currentDate = new Date();
        this.fixtures = matchesResponse.data.matches.filter(
          (fixture) => new Date(fixture.utcDate) > currentDate
        );
        console.log("Fixtures fetched for matchday:", matchday);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching fixtures for matchday:", matchday, error);
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
  flex-direction: column;
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
.vs-sign {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.vs-sign p {
  margin: 0px;
}

.match-details {
  display: flex;
  justify-content: center;
  font-weight: 100;
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
