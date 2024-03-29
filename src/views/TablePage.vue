<template>
  <div>
    <!-- <p>Standings:</p> -->
    <div v-if="isLoading" class="animation-container">
      <loadingAnimation />
    </div>
    <div v-if="!isLoading && this.premierLeagueStandings.length == 0">
      The free API has hit its limit for 10 calls every minute. Please wait and
      try again.
    </div>
    <table
      v-if="!isLoading && this.premierLeagueStandings.length > 0"
      class="team-table"
    >
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
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(team, index) in premierLeagueStandings"
          :key="team.team.id"
          class="team-row"
        >
          <td>{{ index + 1 }}</td>
          <td style="display: flex; align-items: center">
            <img
              :src="team.team.crest"
              :alt="team.team.name"
              class="team-crest"
            />
            <span class="team-name">{{ getTeamName(team.team.name) }}</span>
          </td>
          <td>{{ team.playedGames }}</td>
          <td>{{ team.won }}</td>
          <td>{{ team.draw }}</td>
          <td>{{ team.lost }}</td>
          <td>{{ team.goalsFor }}</td>
          <td>{{ team.goalsAgainst }}</td>
          <td>{{ team.goalDifference }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import loadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  components: {
    loadingAnimation,
  },
  data() {
    return {
      premierLeagueStandings: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchPremierLeagueStandings();
  },
  methods: {
    getTeamCrestHTML(crestUrl, teamName) {
      return `<img src="${crestUrl}" alt="${teamName}" class="team-crest">${teamName}`;
    },
    getTeamName(teamName) {
      return teamName.replace(/FC$/, "").trim();
    },
    async fetchPremierLeagueStandings() {
      this.isLoading = true;
      try {
        const response = await axios.get("/api/competitions/PL/standings");
        this.premierLeagueStandings = response.data.standings[0].table;
        console.log(response);
      } catch (error) {
        console.error("Error fetching Premier League standings:", error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}

.table-header {
  text-align: center;
  margin-bottom: 20px;
}
.table-name {
  font-size: 24px;
}
.team-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}
.team-table th,
.team-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.team-table th {
  background-color: #f2f2f2;
  color: #333;
}
.team-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
.team-row:hover {
  background-color: #f5f5f5;
}
.team-crest {
  height: 24px;
}
.team-name {
  margin-left: 8px;
}
/* Responsive Styles */
@media (max-width: 768px) {
  .table-name {
    font-size: 20px;
  }
  .team-table th,
  .team-table td {
    padding: 6px;
  }
}
@media (max-width: 576px) {
  .team-crest {
    width: 20px;
  }
  .table-name {
    font-size: 18px;
  }
}
</style>
