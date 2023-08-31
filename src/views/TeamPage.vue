<template>
  <div>
    <h1 class="page-title">{{ selectedTeam.name }}</h1>
    <div class="team-details">
      <div class="team-logo">
        <img :src="selectedTeam.crest" :alt="selectedTeam.name + ' Crest'" />
      </div>
      <div class="team-info">
        <p><strong>Full Name:</strong> {{ selectedTeam.name }}</p>
        <p><strong>Short Name:</strong> {{ selectedTeam.shortName }}</p>
        <p><strong>Founded:</strong> {{ selectedTeam.founded }}</p>
        <p><strong>Club Colors:</strong> {{ selectedTeam.clubColors }}</p>
        <p>
          <strong>Website: </strong>
          <a :href="selectedTeam.website" target="_blank">{{
            selectedTeam.website
          }}</a>
        </p>
      </div>
    </div>

    <h2 class="section-title">Players</h2>
    <ul class="player-list">
      <li v-for="player in selectedTeam.squad" :key="player.id">
        {{ player.name }} ({{ player.position }}) - {{ player.nationality }}
      </li>
    </ul>

    <h2 class="section-title">Manager</h2>
    <p>{{ selectedTeam.coach.name }} ({{ selectedTeam.coach.nationality }})</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedTeamId: this.$route.params.teamId,
      selectedTeam: {}, // Store the selected team's data
    };
  },
  methods: {
    async fetchTeamDetails() {
      try {
        const response = await axios.get(`/api/teams/${this.selectedTeamId}`);
        this.selectedTeam = response.data;
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    },
  },
  created() {
    this.fetchTeamDetails();
  },
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.team-details {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.team-logo img {
  width: 150px;
  height: 150px;
}

.team-info {
  margin-left: 20px;
}

.team-info p {
  margin: 5px 0;
}

.section-title {
  font-size: 18px;
  margin-top: 20px;
  color: #333;
}

.player-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.player-list li {
  margin-bottom: 5px;
}
</style>
