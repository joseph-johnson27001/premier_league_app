<template>
  <div class="fixtures-page">
    <div class="fixtures-header">
      <h1 class="fixtures-name">Premier League Fixtures</h1>
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
        v-for="fixture in filteredFixtures"
        :key="fixture.id"
        class="fixture-item"
      >
        <div class="team-container team-left">
          <img
            :src="getTeamCrest(fixture.homeTeam.name)"
            :alt="fixture.homeTeam.name"
            class="team-crest"
          />
          <div class="team-name">{{ fixture.homeTeam.name }}</div>
        </div>
        <div class="vs-container">
          <span class="vs">vs</span>
        </div>
        <div class="team-container team-right">
          <div class="team-name">{{ fixture.awayTeam.name }}</div>
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
      selectedTeams: [],
      teams: [],
      fixtures: [],
      teamCrests: {},
    };
  },
  created() {
    this.fetchTeamsAndFixtures();
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
  methods: {
    async fetchTeamsAndFixtures() {
      try {
        const teamsResponse = await axios.get("/api/competitions/PL/teams");
        this.teams = teamsResponse.data.teams.map((team) => team.name).sort();
        console.log(teamsResponse);
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
    getTeamCrest(teamName) {
      return this.teamCrests[teamName] || "";
    },
  },
};
</script>

<style scoped>
.fixtures-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.fixtures-header {
  text-align: center;
}

.fixtures-name {
  font-size: 24px;
  margin: 0;
}

.team-selection {
  margin-top: 20px;
}

.team-radio {
  margin-bottom: 8px;
}

/* Updated Styles for Checkboxes */
.team-checkbox {
  display: inline-block;
  position: relative;
  padding-left: 28px;
  margin-right: 10px;
  cursor: pointer;
}

.team-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border: 1px solid #ccc;
}

.team-checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}

.team-checkbox input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.team-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.team-checkbox .checkmark:after {
  left: 7px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* End of Updated Styles for Checkboxes */

.fixtures-list {
  margin-top: 20px;
}

.fixture-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}

.team-container {
  display: flex;
  align-items: center;
}

.team-left {
  justify-content: flex-start;
}

.team-right {
  justify-content: flex-end;
}

.team-crest {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-left: 8px;
}

.team-name {
  font-size: 16px;
}

.vs-container {
  font-size: 20px;
  font-weight: bold;
}

@media (max-width: 576px) {
  .team-crest {
    width: 24px;
    height: 24px;
  }

  .team-name {
    font-size: 14px;
  }
}
</style>
