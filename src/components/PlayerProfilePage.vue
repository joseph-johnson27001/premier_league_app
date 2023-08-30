<template>
  <div class="player-profile-page">
    <h1>Player Profile</h1>
    <div v-if="player">
      <h2>{{ player.name }}</h2>
      <img :src="player.image" alt="Player" />
      <p>{{ player.summary }}</p>
      <!-- Display other player information here -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerProfilePage",
  data() {
    return {
      player: null,
    };
  },
  created() {
    this.fetchPlayer();
  },
  methods: {
    async fetchPlayer() {
      const playerId = this.$route.params.id; // Get player ID from route parameter
      try {
        const response = await axios.get(`/api/persons/${playerId}`);
        this.player = response.data;
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
