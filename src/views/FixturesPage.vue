<template>
  <div class="fixtures-page">
    <h1 class="page-title">FIXTURES</h1>
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
        <span class="team-name">{{ fixture.homeTeam }}</span>
        <span class="vs">vs</span>
        <span class="team-name">{{ fixture.awayTeam }}</span>
        <!-- <span class="date">{{ fixture.date }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FixturesPage",
  data() {
    return {
      selectedTeam: "",
      teams: ["Team A", "Team B", "Team C", "Team D"],
      fixtures: [
        { id: 1, homeTeam: "Team A", awayTeam: "Team B", date: "2023-09-01" },
        { id: 2, homeTeam: "Team C", awayTeam: "Team D", date: "2023-09-02" },
        { id: 3, homeTeam: "Team B", awayTeam: "Team D", date: "2023-09-03" },
        { id: 4, homeTeam: "Team A", awayTeam: "Team C", date: "2023-09-04" },
        { id: 5, homeTeam: "Team D", awayTeam: "Team B", date: "2023-09-05" },
        // Add more fixtures...
      ],
    };
  },
  computed: {
    filteredFixtures() {
      if (this.selectedTeam === "") {
        return this.fixtures;
      } else {
        return this.fixtures.filter(
          (fixture) =>
            fixture.homeTeam === this.selectedTeam ||
            fixture.awayTeam === this.selectedTeam
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
  justify-content: space-between;
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

/* Style for selected team in dropdown */
option[selected] {
  font-weight: bold;
}
</style>
