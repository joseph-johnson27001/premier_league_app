<template>
  <div class="player-profile">
    <h1>{{ player.name }}</h1>
    <div class="player-details">
      <div class="player-image">
        <img :src="player.image" :alt="player.name" />
      </div>
      <div class="player-info">
        <p><strong>Position:</strong> {{ player.position }}</p>
        <p><strong>Date of Birth:</strong> {{ player.dateOfBirth }}</p>
        <!-- Display more player information here -->
      </div>
    </div>
    <!-- Display player statistics, performance history, etc. -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      player: {},
    };
  },
  created() {
    const playerId = this.$route.params.id;
    this.fetchPlayerData(playerId);
  },
  methods: {
    async fetchPlayerData() {
      const playerId = this.$route.params.id; // Get player ID from route params
      try {
        const response = await axios.get(`/api/persons/${playerId}`);
        this.player = response.data;
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
