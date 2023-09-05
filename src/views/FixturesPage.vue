<template>
  <div class="fixtures-page">
    <div class="fixtures-header">
      <h1 class="fixtures-name">Premier League Fixtures</h1>
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
        v-for="fixture in filteredFixtures"
        :key="fixture.id"
        class="fixture-item"
      >
        <div class="team-container">
          <img
            :src="getTeamCrest(fixture.homeTeam.name)"
            :alt="fixture.homeTeam.name"
            class="team-crest"
          />
          <div class="team-name team-left">{{ fixture.homeTeam.name }}</div>
        </div>
        <div class="vs-container">
          <span class="vs">vs</span>
        </div>
        <div class="team-container">
          <div class="team-name team-right">{{ fixture.awayTeam.name }}</div>
          <img
            :src="getTeamCrest(fixture.awayTeam.name)"
            :alt="fixture.awayTeam.name"
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
  name: "FixturesPage",
  data() {
    return {
      selectedTeam: "",
      teams: [],
      fixtures: [],
      // Store team crests URLs in a map
      teamCrests: {},
    };
  },
  created() {
    this.fetchTeamsAndFixtures();
  },
  computed: {
    filteredFixtures() {
      if (this.selectedTeam === "") {
        return this.fixtures;
      } else {
        return this.fixtures.filter(
          (fixture) =>
            fixture.homeTeam.name === this.selectedTeam ||
            fixture.awayTeam.name === this.selectedTeam
        );
      }
    },
  },
  methods: {
    async fetchTeamsAndFixtures() {
      try {
        const teamsResponse = await axios.get("/api/competitions/PL/teams");
        this.teams = teamsResponse.data.teams.map((team) => team.name);
        this.teamCrests = teamsResponse.data.teams.reduce((crestMap, team) => {
          crestMap[team.name] = team.crest;
          return crestMap;
        }, {});

        const fixturesResponse = await axios.get(
          "/api/competitions/PL/matches"
        );
        const currentDate = new Date();
        this.fixtures = fixturesResponse.data.matches.filter(
          (fixture) => new Date(fixture.utcDate) > currentDate
        );
      } catch (error) {
        console.error("Error fetching teams and fixtures:", error);
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

.team-info {
  flex: 1;
}
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.team-left {
  flex: 1;
  text-align: left;
}
.team-right {
  flex: 1;
  text-align: right;
}

.vs-container {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  width: 40px;
}

.middle-container {
  flex-grow: 1;
  text-align: center;
}

.team-container {
  display: flex;
  align-items: center;
}

.team-name {
  font-weight: bold;
}

.vs {
  font-size: 18px;
  margin: 0 10px;
}

.date {
  color: #888;
}

.team-crest {
  max-width: 30px;
  margin: 10px;
}

option[selected] {
  font-weight: bold;
}
</style>
