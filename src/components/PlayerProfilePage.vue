<template>
  <div>
    <div v-if="loading" class="loading-indicator">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="team-page">
        <div class="team-header">
          <img
            :src="player.currentTeam.crest"
            :alt="player.currentTeam.name + ' Crest'"
          />
          <div class="team-info">
            <h1 class="team-name">
              {{ player.name }} [{{ player.shirtNumber }}]
            </h1>
            <p class="team-manager">
              Position: {{ player.position }} ({{ player.nationality }})
            </p>
            <p class="team-founded">Date of Birth: {{ player.dateOfBirth }}</p>
          </div>
        </div>
        <div class="player-info">
          <h2 class="info-title">Player Information</h2>
          <div class="player-contract">
            <p class="contract-dates">
              Contract: {{ player.currentTeam.contract.start }} -
              {{ player.currentTeam.contract.until }}
            </p>
          </div>
          <div class="recent-matches">
            <h2>Recent Matches</h2>
            <div v-for="match in matches" :key="match.id" class="match">
              <div class="match-header">
                <img
                  :src="match.competition.emblem"
                  :alt="match.competition.name + ' Emblem'"
                />
                <p class="match-competition">{{ match.competition.name }}</p>
                <p class="match-date">{{ formatDate(match.utcDate) }}</p>
                <p class="match-status">{{ match.status }}</p>
              </div>
              <div class="match-details" v-if="match.status === 'FINISHED'">
                <p class="match-result">
                  Result: {{ match.score.fullTime.home }} -
                  {{ match.score.fullTime.away }}
                  {{
                    match.score.winner === "HOME_TEAM"
                      ? "(Home Team)"
                      : match.score.winner === "AWAY_TEAM"
                      ? "(Away Team)"
                      : "(Draw)"
                  }}
                </p>
                <p class="match-venue">Venue: {{ match.venue }}</p>
                <p class="match-attendance">
                  Attendance: {{ match.attendance }}
                </p>
                <p class="match-referees">
                  Referee: {{ match.referees[0].name }} ({{
                    match.referees[0].nationality
                  }})
                </p>
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
  name: "PlayerProfilePage",
  data() {
    return {
      player: {},
      loading: true,
      matches: [],
    };
  },
  async created() {
    await this.fetchPlayerProfile();
    await this.fetchPlayerMatches();
    this.loading = false;
  },
  methods: {
    async fetchPlayerProfile() {
      const playerId = this.$route.params.id;
      try {
        const response = await axios.get(`/api/persons/${playerId}`);
        this.player = response.data;
        console.log(this.player);
      } catch (error) {
        console.error("Error fetching player profile:", error);
      }
    },
    async fetchPlayerMatches() {
      const playerId = this.$route.params.id;
      try {
        const response = await axios.get(`/api/persons/${playerId}/matches`);
        this.matches = response.data.matches;
        console.log(this.matches);
      } catch (error) {
        console.error("Error fetching player matches:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.team-page {
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.team-header {
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: -20px -20px 0px -20px;
}

.team-info {
  flex: 1;
}

.team-name {
  font-family: "Montserrat", sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

.team-manager,
.team-founded {
  font-size: 16px;
  margin: 5px 0;
  color: #aaa;
}

.category-title,
.team-manager,
.team-founded {
  color: #333;
}

/* Additional Media Queries for Ultra-small Devices */

@media (max-width: 360px) {
  .team-name {
    font-size: 28px;
  }
}
</style>
