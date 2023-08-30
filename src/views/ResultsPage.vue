<template>
  <div class="results-page">
    <h1 class="page-title">Results</h1>
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
        <span class="team-name">{{ result.homeTeam }}</span>
        <span class="score"
          >{{ result.homeScore }} - {{ result.awayScore }}</span
        >
        <span class="team-name">{{ result.awayTeam }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultsPage",
  data() {
    return {
      selectedTeam: "",
      teams: ["Team A", "Team B", "Team C", "Team D"],
      results: [
        {
          id: 1,
          homeTeam: "Team A",
          homeScore: 2,
          awayScore: 1,
          awayTeam: "Team B",
        },
        {
          id: 2,
          homeTeam: "Team C",
          homeScore: 0,
          awayScore: 0,
          awayTeam: "Team D",
        },
        {
          id: 3,
          homeTeam: "Team B",
          homeScore: 3,
          awayScore: 2,
          awayTeam: "Team D",
        },
        {
          id: 4,
          homeTeam: "Team A",
          homeScore: 1,
          awayScore: 1,
          awayTeam: "Team C",
        },
        {
          id: 5,
          homeTeam: "Team D",
          homeScore: 2,
          awayScore: 0,
          awayTeam: "Team B",
        },
        // Add more results...
      ],
    };
  },
  computed: {
    filteredResults() {
      if (this.selectedTeam === "") {
        return this.results;
      } else {
        return this.results.filter(
          (result) =>
            result.homeTeam === this.selectedTeam ||
            result.awayTeam === this.selectedTeam
        );
      }
    },
  },
  methods: {
    updateSelectedTeam(event) {
      this.selectedTeam = event.target.value;
    },
  },
};
</script>

<style scoped>
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
