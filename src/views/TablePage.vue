<template>
  <div>
    <div class="table-header">
      <h1 class="table-name">Premier League Standings</h1>
    </div>
    <table class="team-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Pl</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>Pts</th>
          <th>Last 6</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          v-for="(team, index) in premierLeagueStandings"
          :key="team.team.id"
          :to="{ name: 'Team', params: { teamId: team.team.id } }"
          tag="tr"
          class="clickable-row"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ team.team.name }}</td>
          <td>{{ team.playedGames }}</td>
          <td>{{ team.won }}</td>
          <td>{{ team.draw }}</td>
          <td>{{ team.lost }}</td>
          <td>{{ team.goalsFor }}</td>
          <td>{{ team.goalsAgainst }}</td>
          <td>{{ team.goalDifference }}</td>
          <td>{{ team.points }}</td>
          <td>{{ team.form }}</td>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"; // Import axios

export default {
  data() {
    return {
      premierLeagueStandings: [],
    };
  },
  created() {
    this.fetchPremierLeagueStandings();
  },
  methods: {
    async fetchPremierLeagueStandings() {
      try {
        const response = await axios.get("/api/competitions/PL/standings");
        this.premierLeagueStandings = response.data.standings[0].table;
        console.log(response);
      } catch (error) {
        console.error("Error fetching Premier League standings:", error);
      }
    },
  },
};
</script>

<style scoped>
.table-header {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: -20px -20px 20px -20px;
}
.clickable-row {
  cursor: pointer;
}
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.team-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-table th,
.team-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.team-table th {
  background-color: #f8f8f8;
  color: #333;
  font-weight: bold;
}

.team-table tr:hover {
  background-color: #f2f2f2;
}

/* Additional styles for table cells */
.team-name {
  font-weight: bold;
}

.negative {
  color: #d9534f;
}

.positive {
  color: #5cb85c;
}
</style>
