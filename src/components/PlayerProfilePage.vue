<template>
  <div class="player-profile" v-if="player">
    <h1>{{ player.name }}</h1>
    <div class="player-details">
      <p><strong>Position:</strong> {{ player.position }}</p>
      <p><strong>Date of Birth:</strong> {{ player.dateOfBirth }}</p>
      <p><strong>Nationality:</strong> {{ player.nationality }}</p>
    </div>
    <div v-if="player.currentTeam">
      <h2>Current Team</h2>
      <div class="team-details">
        <img
          :src="player.currentTeam.crest"
          :alt="player.currentTeam.name"
          class="team-crest"
        />
        <p><strong>Team Name:</strong> {{ player.currentTeam.name }}</p>
        <p><strong>Address:</strong> {{ player.currentTeam.address }}</p>
        <p>
          <strong>Website:</strong>
          <a :href="player.currentTeam.website" target="_blank">{{
            player.currentTeam.website
          }}</a>
        </p>
        <p><strong>Founded:</strong> {{ player.currentTeam.founded }}</p>
        <p><strong>Club Colors:</strong> {{ player.currentTeam.clubColors }}</p>
        <p><strong>Venue:</strong> {{ player.currentTeam.venue }}</p>
        <p>
          <strong>Contract Start:</strong>
          {{ player.currentTeam.contract.start }}
        </p>
        <p>
          <strong>Contract End:</strong> {{ player.currentTeam.contract.until }}
        </p>
        <p><strong>Player Number:</strong> {{ player.shirtNumber }}</p>
        <p><strong>Position:</strong> {{ player.position }}</p>
      </div>
      <h2>Running Competitions</h2>
      <ul>
        <li
          v-for="competition in player.currentTeam.runningCompetitions"
          :key="competition.id"
        >
          <img
            :src="competition.emblem"
            :alt="competition.name"
            class="competition-emblem"
          />
          {{ competition.name }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p>Loading player data...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerProfilePage",
  data() {
    return {
      player: {}, // Player data
    };
  },
  created() {
    this.fetchPlayerProfile();
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
  },
};
</script>

<style scoped>
/* Add your styles here */
.player-profile {
  padding: 20px;
}

.player-image {
  max-width: 150px;
  margin-right: 20px;
}

.player-info {
  line-height: 1.5;
}

.competition-emblem {
  max-width: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
